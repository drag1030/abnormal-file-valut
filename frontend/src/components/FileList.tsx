


// import React from 'react';
// import { IFile, IPaginatedResponse } from '../types/file';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { fileService } from '../services/fileService';
// import toast from 'react-hot-toast';
// import { DocumentIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// interface FileListProps {
//   data?: IPaginatedResponse<IFile>;
//   isLoading: boolean;
//   error: Error | null;
//   page: number;
//   setPage: (page: number) => void;
//   filters: Record<string, string>;
// }

// export const FileList: React.FC<FileListProps> = ({
//   data,
//   isLoading,
//   error,
//   page,
//   setPage,
//   filters,
// }) => {
//   const queryClient = useQueryClient();
//   const files = data?.results;

//   const deleteMutation = useMutation({
//     mutationFn: fileService.deleteFile,
//     onMutate: async (deletedId) => {
//       const queryKey = ['files', filters, page];
//       await queryClient.cancelQueries({ queryKey });
//       const previousData = queryClient.getQueryData<IPaginatedResponse<IFile>>(queryKey);
//       if (previousData) {
//         const newData = {
//           ...previousData,
//           results: previousData.results.filter((file) => file.id !== deletedId),
//         };
//         queryClient.setQueryData(queryKey, newData);
//       }
//       return { previousData };
//     },
//     onError: (err, vars, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData(['files', filters, page], context.previousData);
//       }
//       toast.error('Failed to delete file.');
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['files'] });
//       queryClient.invalidateQueries({ queryKey: ['storageStats'] });
//     },
//   });

//   const handleDelete = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this file?')) {
//       deleteMutation.mutate(id);
//     }
//   };

//   if (isLoading && !data) {
//     return (
//       <div className="text-center py-12" style={{ color: '#E5E7EB' }}>
//         Loading files...
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="text-center py-12" style={{ color: '#EF4444' }}>
//         Error: {error.message}
//       </div>
//     );
//   }

//   // Helper for row hover effect
//   const rowHover = { backgroundColor: 'rgba(99,102,241,0.06)' }; // indigo-500 wash

//   return (
//     <div
//       className="mt-6 flow-root p-0 rounded-xl shadow-lg border"
//       style={{
//         backgroundColor: '#111827', // surface
//         borderColor: '#334155',
//       }}
//     >
//       {files && files.length > 0 ? (
//         <>
//           <ul className="divide-y" style={{ borderColor: '#334155' }}>
//             {files.map((file) => (
//               <li
//                 key={file.id}
//                 className="flex items-center px-4 py-5 transition-colors"
//                 style={{
//                   backgroundColor: '#1F2937', // row background
//                   borderBottom: '1px solid #334155',
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = rowHover.backgroundColor)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1F2937')}
//               >
//                 {/* File Icon */}
//                 <div className="flex-shrink-0 mr-4">
//                   <DocumentIcon className="h-8 w-8" style={{ color: '#9CA3AF' }} />
//                 </div>

//                 {/* Filename and meta */}
//                 <div className="flex-1 min-w-0">
//                   <div
//                     className="text-base font-medium truncate"
//                     style={{ color: '#E5E7EB' }}
//                     title={file.original_filename}
//                   >
//                     {file.original_filename}
//                   </div>
//                   <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
//                     {file.file_type} &bull; {file.human_readable_size}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex space-x-2 ml-4">
//                   {/* Download */}
//                   <button
//                     onClick={() => fileService.downloadFile(file.file, file.original_filename)}
//                     className="p-2 rounded hover:bg-indigo-500 hover:bg-opacity-20 transition"
//                     title="Download"
//                   >
//                     <ArrowDownTrayIcon
//                       className="h-5 w-5 transition-colors"
//                       style={{ color: '#9CA3AF' }}
//                       onMouseOver={(e) => ((e.currentTarget.style.color = '#E5E7EB'))}
//                       onMouseOut={(e) => ((e.currentTarget.style.color = '#9CA3AF'))}
//                     />
//                   </button>
//                   {/* Delete */}
//                   <button
//                     onClick={() => handleDelete(file.id)}
//                     disabled={deleteMutation.isPending}
//                     className="p-2 rounded hover:bg-red-500 hover:bg-opacity-20 transition"
//                     title="Delete"
//                   >
//                     <TrashIcon
//                       className="h-5 w-5 transition-colors"
//                       style={{ color: '#9CA3AF' }}
//                       onMouseOver={(e) => ((e.currentTarget.style.color = '#EF4444'))}
//                       onMouseOut={(e) => ((e.currentTarget.style.color = '#9CA3AF'))}
//                     />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           {/* Pagination */}
//           <div className="flex items-center justify-between px-4 py-4">
//             <p className="text-sm" style={{ color: '#9CA3AF' }}>
//               Showing <span className="font-medium" style={{ color: '#E5E7EB' }}>{(page - 1) * 10 + 1}</span>
//               {' to '}
//               <span className="font-medium" style={{ color: '#E5E7EB' }}>{Math.min(page * 10, data?.count ?? 0)}</span>
//               {' of '}
//               <span className="font-medium" style={{ color: '#E5E7EB' }}>{data?.count ?? 0}</span> results
//             </p>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 disabled={!data?.previous}
//                 className="px-4 py-2 text-sm font-medium rounded-md border transition-colors"
//                 style={{
//                   backgroundColor: '#111827',
//                    borderColor: '#334155',
//                   color: data?.previous ? '#E5E7EB' : '#6B7280',
//                   cursor: data?.previous ? 'pointer' : 'not-allowed',
//                   opacity: data?.previous ? 1 : 0.5,
//                 }}
//                 onMouseEnter={e => { if (data?.previous) e.currentTarget.style.backgroundColor = '#1F2937'; }}
//                 onMouseLeave={e => { if (data?.previous) e.currentTarget.style.backgroundColor = '#111827'; }}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => setPage(page + 1)}
//                 disabled={!data?.next}
//                 className="px-4 py-2 text-sm font-medium rounded-md border transition-colors"
//                 style={{
//                   backgroundColor: '#6366F1',
//                   color: '#FFFFFF',
//                   borderColor: '#6366F1',
//                   cursor: data?.next ? 'pointer' : 'not-allowed',
//                   opacity: data?.next ? 1 : 0.5,
//                 }}
//                 onMouseEnter={e => { if (data?.next) e.currentTarget.style.backgroundColor = '#4F46E5'; }}
//                 onMouseLeave={e => { if (data?.next) e.currentTarget.style.backgroundColor = '#6366F1'; }}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-12" style={{ color: '#9CA3AF' }}>
//           <DocumentIcon className="mx-auto h-12 w-12" style={{ color: '#9CA3AF' }} />
//           <h3 className="mt-2 text-sm font-medium" style={{ color: '#E5E7EB' }}>
//             No files found
//           </h3>
//           <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
//             Try adjusting your filters or uploading a new file.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };



// src/components/FileList.tsx
import React from 'react';
import { IFile, IPaginatedResponse } from '../types/file';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/fileService';
import toast from 'react-hot-toast';
import { DocumentIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface FileListProps {
  data?: IPaginatedResponse<IFile>;
  isLoading: boolean;
  error: Error | null;
  page: number;
  setPage: (page: number) => void;
  filters: Record<string, string>;
}

export const FileList: React.FC<FileListProps> = ({
  data,
  isLoading,
  error,
  page,
  setPage,
  filters,
}) => {
  const queryClient = useQueryClient();
  const files = data?.results;

  const deleteMutation = useMutation({
    mutationFn: fileService.deleteFile,
    onMutate: async (deletedId) => {
      const queryKey = ['files', filters, page];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<IPaginatedResponse<IFile>>(queryKey);
      if (previousData) {
        const newData = {
          ...previousData,
          results: previousData.results.filter((file) => file.id !== deletedId),
        };
        queryClient.setQueryData(queryKey, newData);
      }
      return { previousData };
    },
    onError: (err, vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['files', filters, page], context.previousData);
      }
      toast.error('Failed to delete file.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['storageStats'] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="text-center py-12" style={{ color: '#E5E7EB' }}>
        Loading files...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12" style={{ color: '#EF4444' }}>
        Error: {error.message}
      </div>
    );
  }

  const rowHover = { backgroundColor: 'rgba(99,102,241,0.06)' };

  return (
    <div
      className="mt-6 flow-root p-0 rounded-xl shadow-lg border"
      style={{
        backgroundColor: '#111827', // surface
        borderColor: '#334155',
      }}
    >
      {files && files.length > 0 ? (
        <>
          <ul className="divide-y" style={{ borderColor: '#334155' }}>
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center px-4 py-5 transition-colors"
                style={{
                  backgroundColor: '#1F2937', // row background
                  borderBottom: '1px solid #334155',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = rowHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1F2937')}
              >
                {/* File Icon */}
                <div className="flex-shrink-0 mr-4">
                  <DocumentIcon className="h-8 w-8" style={{ color: '#9CA3AF' }} />
                </div>

                {/* Filename and meta */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-base font-medium truncate"
                    style={{ color: '#E5E7EB' }}
                    title={file.original_filename}
                  >
                    {file.original_filename}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                    {file.file_type} &bull; {file.human_readable_size}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 ml-4">
                  {/* Download */}
                  <button
                    onClick={() => fileService.downloadFile(file.file, file.original_filename)}
                    className="p-2 rounded hover:bg-indigo-500 hover:bg-opacity-20 transition"
                    title="Download"
                  >
                    <ArrowDownTrayIcon
                      className="h-5 w-5 transition-colors"
                      style={{ color: '#9CA3AF' }}
                      onMouseOver={(e) => ((e.currentTarget.style.color = '#E5E7EB'))}
                      onMouseOut={(e) => ((e.currentTarget.style.color = '#9CA3AF'))}
                    />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(file.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2 rounded hover:bg-red-500 hover:bg-opacity-20 transition"
                    title="Delete"
                  >
                    <TrashIcon
                      className="h-5 w-5 transition-colors"
                      style={{ color: '#9CA3AF' }}
                      onMouseOver={(e) => ((e.currentTarget.style.color = '#EF4444'))}
                      onMouseOut={(e) => ((e.currentTarget.style.color = '#9CA3AF'))}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-sm" style={{ color: '#9CA3AF' }}>
              Showing{' '}
              <span className="font-medium" style={{ color: '#E5E7EB' }}>
                {(page - 1) * 10 + 1}
              </span>
              {' to '}
              <span className="font-medium" style={{ color: '#E5E7EB' }}>
                {Math.min(page * 10, data?.count ?? 0)}
              </span>
              {' of '}
              <span className="font-medium" style={{ color: '#E5E7EB' }}>
                {data?.count ?? 0}
              </span>{' '}
              results
            </p>
            <div className="space-x-2">
              {/* Improved Previous */}
              <button
                onClick={() => setPage(page - 1)}
                disabled={!data?.previous}
                className="px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200"
                style={{
                  backgroundColor: data?.previous ? '#1F2937' : '#111827',
                  borderColor: data?.previous ? '#6366F1' : '#334155',
                  color: data?.previous ? '#E5E7EB' : '#6B7280',
                  cursor: data?.previous ? 'pointer' : 'not-allowed',
                  opacity: data?.previous ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (data?.previous) {
                    e.currentTarget.style.backgroundColor = '#272F3D';
                    e.currentTarget.style.borderColor = '#A5B4FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (data?.previous) {
                    e.currentTarget.style.backgroundColor = '#1F2937';
                    e.currentTarget.style.borderColor = '#6366F1';
                  }
                }}
              >
                Previous
              </button>
              {/* Next */}
              <button
                onClick={() => setPage(page + 1)}
                disabled={!data?.next}
                className="px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200"
                style={{
                  backgroundColor: '#6366F1',
                  color: '#FFFFFF',
                  borderColor: '#6366F1',
                  cursor: data?.next ? 'pointer' : 'not-allowed',
                  opacity: data?.next ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (data?.next) e.currentTarget.style.backgroundColor = '#4F46E5';
                }}
                onMouseLeave={(e) => {
                  if (data?.next) e.currentTarget.style.backgroundColor = '#6366F1';
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12" style={{ color: '#9CA3AF' }}>
          <DocumentIcon className="mx-auto h-12 w-12" style={{ color: '#9CA3AF' }} />
          <h3 className="mt-2 text-sm font-medium" style={{ color: '#E5E7EB' }}>
            No files found
          </h3>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
            Try adjusting your filters or uploading a new file.
          </p>
        </div>
      )}
    </div>
  );
};
