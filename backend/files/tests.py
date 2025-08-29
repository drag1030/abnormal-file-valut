# backend/files/tests.py

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import File

class FileViewSetTests(APITestCase):
    """
    Test suite for the FileViewSet.
    """

    def test_upload_unique_file(self):
        """
        Ensure we can upload a new, unique file.
        """
        url = reverse('file-list') # Assumes your router is registered with basename 'file'
        
        # Create a dummy file in memory
        test_file = SimpleUploadedFile("test_file_1.txt", b"this is some content", content_type="text/plain")
        
        response = self.client.post(url, {'file': test_file}, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(File.objects.count(), 1)
        self.assertEqual(response.data['deduplicated'], False)
        self.assertEqual(File.objects.first().original_filename, 'test_file_1.txt')

    def test_upload_duplicate_file(self):
        """
        Ensure uploading a duplicate file creates a new record but re-uses the file on disk.
        """
        url = reverse('file-list')
        
        # Upload the first file
        file_content = b"this content is for a duplicate test"
        test_file_1 = SimpleUploadedFile("original.txt", file_content, content_type="text/plain")
        self.client.post(url, {'file': test_file_1}, format='multipart')
        
        # Get the path of the first saved file
        first_file_path = File.objects.first().file.name

        # Upload the second file with the same content but different name
        test_file_2 = SimpleUploadedFile("duplicate.txt", file_content, content_type="text/plain")
        response = self.client.post(url, {'file': test_file_2}, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(File.objects.count(), 2) # A new record should be created
        self.assertEqual(response.data['deduplicated'], True)
        
        # Crucially, check that the second record points to the first file's path
        last_file = File.objects.latest('uploaded_at')
        self.assertEqual(last_file.file.name, first_file_path)

    def test_storage_savings_endpoint(self):
        """
        Ensure the storage_savings endpoint calculates savings correctly.
        """
        url = reverse('file-list')
        
        # Upload a 20-byte file twice
        self.client.post(url, {'file': SimpleUploadedFile("file_a.txt", b"content of 20 bytes!")}, format='multipart')
        self.client.post(url, {'file': SimpleUploadedFile("file_b.txt", b"content of 20 bytes!")}, format='multipart')
        
        # Upload a 10-byte file once
        self.client.post(url, {'file': SimpleUploadedFile("file_c.txt", b"10 bytes!!")}, format='multipart')
        
        # Check savings
        savings_url = reverse('file-storage-savings')
        response = self.client.get(savings_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Expected calculation:
        # Potential size = 20 + 20 + 10 = 50 bytes
        # Actual used = 20 (one copy) + 10 (one copy) = 30 bytes
        # Saved = 50 - 30 = 20 bytes
        self.assertEqual(response.data['total_potential_size_bytes'], 50)
        self.assertEqual(response.data['actual_storage_used_bytes'], 30)
        self.assertEqual(response.data['storage_saved_bytes'], 20)

