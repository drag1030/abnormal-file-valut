

// // src/components/FileUpload.tsx
// import React, { useState, useCallback, useRef } from 'react';
// import { fileService } from '../services/fileService';
// import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';

// export const FileUpload: React.FC = () => {
//   // --- STATE AND REFS ---
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const queryClient = useQueryClient();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // --- MUTATION ---
//   const uploadMutation = useMutation({
//     mutationFn: (file: File) => fileService.uploadFile(file, setUploadProgress),
//     onSuccess: (data) => {
//       toast.success(data.detail);
//       queryClient.invalidateQueries({ queryKey: ['files'] });
//       queryClient.invalidateQueries({ queryKey: ['storageStats'] });
//       setSelectedFile(null);
//       setTimeout(() => setUploadProgress(0), 500);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     },
//     onError: () => toast.error('Failed to upload. Please try again.'),
//   });

//   // --- EVENT HANDLERS ---
//   const handleFileSelect = (file: File | null) => {
//     if (!file) return;
//     if (file.size > 10 * 1024 * 1024) { // 10MB limit
//       toast.error('File size exceeds 10MB limit.');
//       return;
//     }
//     setSelectedFile(file);
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     handleFileSelect(event.target.files ? event.target.files[0] : null);
//   };

//   const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//   }, []);

//   const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//     if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//       handleFileSelect(event.dataTransfer.files[0]);
//     }
//   }, []);

//   const handleUpload = () => {
//     if (!selectedFile) {
//       toast.error('Please select a file before uploading.');
//       return;
//     }
//     uploadMutation.mutate(selectedFile);
//   };

//   // --- RENDER ---
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <div className="flex items-center mb-4">
//         <CloudArrowUpIcon className="h-6 w-6 text-primary-600 mr-3" />
//         <h2 className="text-xl font-semibold text-gray-800">Upload New File</h2>
//       </div>
//       <div className="mt-4 space-y-4">
//         <div
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${
//             isDragging ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
//           }`}
//         >
//           <div className="space-y-1 text-center">
//             <div className="flex text-sm text-gray-600">
//               <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
//                 <span>Upload a file</span>
//                 <input
//                   id="file-upload"
//                   name="file-upload"
//                   type="file"
//                   className="sr-only"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   disabled={uploadMutation.isPending}
//                 />
//               </label>
//               <p className="pl-1">or drag and drop</p>
//             </div>
//             <p className="text-xs text-gray-500">Any file up to 10MB</p>
//           </div>
//         </div>

//         {selectedFile && <div className="text-sm text-gray-600 truncate">Selected: {selectedFile.name}</div>}

//         {uploadMutation.isPending && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
//             <div
//               className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={!selectedFile || uploadMutation.isPending}
//           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
//             !selectedFile || uploadMutation.isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
//           }`}
//         >
//           {uploadMutation.isPending ? `Uploading... ${uploadProgress}%` : 'Upload'}
//         </button>
//       </div>
//     </div>
//   );
// };



// src/components/FileUpload.tsx
import React, { useState, useCallback, useRef } from 'react';
import { fileService } from '../services/fileService';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const FileUpload: React.FC = () => {
  // --- STATE AND REFS ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- MUTATION ---
  const uploadMutation = useMutation({
    mutationFn: (file: File) => fileService.uploadFile(file, setUploadProgress),
    onSuccess: (data) => {
      toast.success(data.detail || 'Upload successful');
      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['storageStats'] });
      setSelectedFile(null);
      setTimeout(() => setUploadProgress(0), 500);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: () => toast.error('Failed to upload. Please try again.'),
  });

  // --- EVENT HANDLERS ---
  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size exceeds 10MB limit.');
      return;
    }
    setSelectedFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files ? event.target.files[0] : null);
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileSelect(event.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file before uploading.');
      return;
    }
    uploadMutation.mutate(selectedFile);
  };

  // --- RENDER ---
  return (
    <div
      className="p-6 rounded-xl shadow-lg border"
      style={{
        backgroundColor: '#1F2937', // cards
        borderColor: '#334155',
      }}
    >
      <div className="flex items-center mb-5">
        <CloudArrowUpIcon className="h-6 w-6 mr-2" style={{ color: '#6366F1' }} />
        <h2 className="text-lg font-semibold" style={{ color: '#E5E7EB' }}>
          Upload New File
        </h2>
      </div>
      <div className="mt-4 space-y-5">
        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer"
          style={{
            borderColor: isDragging ? '#6366F1' : '#334155',
            backgroundColor: isDragging ? '#0F172A' : '#111827',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center w-full">
            <span
              className="inline-block px-3 py-1 rounded-md font-medium"
              style={{
                background: 'linear-gradient(90deg, #22D3EE 0%, #A78BFA 100%)',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)'
              }}
            >
              Click to select or drag &amp; drop
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={uploadMutation.isPending}
            />
            <div className="mt-2 text-xs" style={{ color: '#6B7280' }}>
              Any file up to 10MB
            </div>
          </div>
        </div>

        {/* File name */}
        {selectedFile && (
          <div
            className="text-sm truncate"
            style={{ color: '#9CA3AF' }}
            title={selectedFile.name}
          >
            Selected: <span style={{ color: '#E5E7EB' }}>{selectedFile.name}</span>
          </div>
        )}

        {/* Progress bar */}
        {uploadMutation.isPending && (
          <div className="w-full h-2.5 my-2 rounded-full" style={{ backgroundColor: '#334155' }}>
            <div
              className="h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${uploadProgress}%`,
                background: 'linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)',
              }}
            ></div>
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
          className="w-full py-2 px-4 rounded-lg shadow font-medium transition-colors duration-200"
          style={{
            backgroundColor: !selectedFile || uploadMutation.isPending
              ? '#334155'
              : '#6366F1',
            color: '#FFFFFF',
            cursor: !selectedFile || uploadMutation.isPending ? 'not-allowed' : 'pointer',
            opacity: !selectedFile || uploadMutation.isPending ? 0.6 : 1,
            border: 'none'
          }}
        >
          {uploadMutation.isPending
            ? `Uploading... ${uploadProgress}%`
            : 'Upload'}
        </button>
      </div>
    </div>
  );
};
