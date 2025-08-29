from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    human_readable_size = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = [
            'id', 
            'file', 
            'original_filename', 
            'file_type', 
            'size',
            'human_readable_size',
            'uploaded_at', 
            'hash',
        ]
        read_only_fields = [
            'id', 
            'uploaded_at', 
            'human_readable_size',
        ]

    def create(self, validated_data):
        """
        Override the default create method to implement deduplication logic.
        This is the single source of truth for creating File instances.
        """
        file_hash = validated_data.get('hash')
        existing_file = File.objects.filter(hash=file_hash).first()

        if existing_file:
            # This is a duplicate. We must avoid passing the uploaded file object
            # and its size to the create method to prevent conflicts.
            validated_data.pop('file', None)
            validated_data.pop('size', None) # <-- THE FINAL FIX IS HERE

            # Now, we can safely construct the new record.
            return File.objects.create(
                file=existing_file.file.name, # Explicitly use the existing file's path
                size=existing_file.size,       # Explicitly use the existing file's size
                **validated_data               # Pass the rest of the metadata (filename, hash, etc.)
            )
        else:
            # This is a unique file. Let the default ModelSerializer `create`
            # method handle the standard file creation process.
            return super().create(validated_data)

    def get_human_readable_size(self, obj):
        size = obj.size
        if size is None:
            return "0 B"
        if size < 1024:
            return f"{size} B"
        elif size < 1024**2:
            return f"{size/1024:.2f} KB"
        elif size < 1024**3:
            return f"{size/1024**2:.2f} MB"
        else:
            return f"{size/1024**3:.2f} GB"

