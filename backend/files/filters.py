import django_filters
from .models import File

class FileFilter(django_filters.FilterSet):
    # Date range: ?uploaded_at_after=YYYY-MM-DD&uploaded_at_before=YYYY-MM-DD
    uploaded_at = django_filters.DateFromToRangeFilter(
        field_name='uploaded_at',
        label='Date Range'
    )

    # Specific date: ?date=YYYY-MM-DD
    date = django_filters.DateFilter(
        field_name='uploaded_at__date',
        lookup_expr='exact',
        label='Exact Upload Date'
    )

    # Size range: ?size_min=&size_max=
    size = django_filters.RangeFilter(
        field_name='size',
        label='Size Range'
    )

    class Meta:
        model = File
        fields = {
            'file_type': ['exact'],
            'size': ['gte', 'lte'],
            'uploaded_at': ['gte', 'lte'],
            'original_filename': ['icontains'],
        }
