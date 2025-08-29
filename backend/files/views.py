from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Min

from .models import File
from .serializers import FileSerializer
from .filters import FileFilter

# Define a standard pagination class
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class FileViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing, uploading, and managing files with
    deduplication and advanced search capabilities.
    """
    queryset = File.objects.all().order_by('-uploaded_at') # Add ordering here
    serializer_class = FileSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = FileFilter
    search_fields = ['original_filename']
    ordering_fields = ['uploaded_at', 'size', 'original_filename']
    pagination_class = StandardResultsSetPagination # Apply pagination

    def create(self, request, *args, **kwargs):
        """
        Handles file uploads. The view calculates the hash and passes all data
        to the serializer, which contains the core creation logic.
        """
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        file_hash = File.calculate_hash(file_obj)
        is_duplicate = File.objects.filter(hash=file_hash).exists()
        
        data = {
            'file': file_obj,
            'original_filename': file_obj.name,
            'file_type': file_obj.content_type or 'application/octet-stream',
            'size': file_obj.size,
            'hash': file_hash,
        }
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        response_data = {
            "detail": "Duplicate file. Reference created." if is_duplicate else "File uploaded successfully.",
            "deduplicated": is_duplicate,
            "file": serializer.data
        }
        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['get'])
    def storage_savings(self, request):
        """
        Calculates and returns the storage savings from deduplication.
        """
        total_potential_size = File.objects.aggregate(total=Sum('size'))['total'] or 0

        unique_file_ids = File.objects.values('hash').annotate(
            first_id=Min('pk')
        ).values_list('first_id', flat=True)
        
        actual_storage_used = File.objects.filter(
            pk__in=unique_file_ids
        ).aggregate(total=Sum('size'))['total'] or 0

        saved_bytes = total_potential_size - actual_storage_used
        
        return Response({
            "total_potential_size_bytes": total_potential_size,
            "actual_storage_used_bytes": actual_storage_used,
            "storage_saved_bytes": saved_bytes,
            "human_readable": {
                "potential_size": f"{total_potential_size / (1024*1024):.2f} MB",
                "actual_used": f"{actual_storage_used / (1024*1024):.2f} MB",
                "saved": f"{saved_bytes / (1024*1024):.2f} MB",
            }
        })

