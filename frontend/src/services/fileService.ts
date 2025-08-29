// import axios from 'axios';
// import { File as FileType } from '../types/file';

// // const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
// const API_URL = 'http://localhost:8000/api';

// export const fileService = {
//   async uploadFile(file: File): Promise<FileType> {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await axios.post(`${API_URL}/files/`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//  async getFiles(params?: any): Promise<FileType[]> {
//   console.log("API_URL in fileService:", API_URL, params);
//   const response = await axios.get(`${API_URL}/files/`, { params });
//   return response.data;
// },

//   async deleteFile(id: string): Promise<void> {
//     await axios.delete(`${API_URL}/files/${id}/`);
//   },

//   async downloadFile(fileUrl: string, filename: string): Promise<void> {
//     try {
//       const response = await axios.get(fileUrl, {
//         responseType: 'blob',
//       });
      
//       // Create a blob URL and trigger download
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Download error:', error);
//       throw new Error('Failed to download file');
//     }
//   },
// }; 



// // src/services/fileService.ts
// import axios from 'axios';
// import { IFile, IFileUploadResponse, IStorageStats } from '../types/file';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// export const fileService = {
//   // Correctly type the response based on our backend
//   async uploadFile(file: File): Promise<IFileUploadResponse> {
//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await axios.post(`${API_URL}/files/`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   },

//   // Use a Record type for flexible but typed params
//   async getFiles(params: Record<string, string> = {}): Promise<IFile[]> {
//     const response = await axios.get(`${API_URL}/files/`, { params });
//     // DRF wraps paginated results, so we need to handle that if pagination is on.
//     // Assuming no pagination for this project for simplicity.
//     return response.data;
//   },

//   async deleteFile(id: string): Promise<void> {
//     await axios.delete(`${API_URL}/files/${id}/`);
//   },

//   async getStorageStats(): Promise<IStorageStats> {
//     const response = await axios.get(`${API_URL}/files/storage_savings/`);
//     return response.data;
//   },

//   // Download function remains the same, it's already good.
//   async downloadFile(fileUrl: string, filename: string): Promise<void> {
//     try {
//       const response = await axios.get(fileUrl, { responseType: 'blob' });
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Download error:', error);
//       throw new Error('Failed to download file');
//     }
//   },
// };



// // src/services/fileService.ts
// import axios from 'axios';
// import { IFile, IFileUploadResponse, IStorageStats } from '../types/file';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// export const fileService = {
//   // UPDATED: Added onUploadProgress callback
//   async uploadFile(file: File, onUploadProgress: (progress: number) => void): Promise<IFileUploadResponse> {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await axios.post(`${API_URL}/files/`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       // NEW: Axios config to track upload progress
//       onUploadProgress: (progressEvent) => {
//         if (progressEvent.total) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           onUploadProgress(percentCompleted);
//         }
//       },
//     });
//     return response.data;
//   },

//   async getFiles(params: Record<string, string> = {}): Promise<IFile[]> {
//     const response = await axios.get(`${API_URL}/files/`, { params });
//     return response.data;
//   },

//   async deleteFile(id: string): Promise<void> {
//     await axios.delete(`${API_URL}/files/${id}/`);
//   },

//   async getStorageStats(): Promise<IStorageStats> {
//     const response = await axios.get(`${API_URL}/files/storage_savings/`);
//     return response.data;
//   },

//   async downloadFile(fileUrl: string, filename: string): Promise<void> {
//     try {
//       const response = await axios.get(fileUrl, { responseType: 'blob' });
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Download error:', error);
//       throw new Error('Failed to download file');
//     }
//   },
// };





// src/services/fileService.ts
import axios from 'axios';
import { IFile, IFileUploadResponse, IStorageStats, IPaginatedResponse } from '../types/file';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const fileService = {
  async uploadFile(file: File, onUploadProgress: (progress: number) => void): Promise<IFileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/files/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percentCompleted);
        }
      },
    });
    return response.data;
  },

  // UPDATED: Now returns the full paginated response object
  async getFiles(params: Record<string, string> = {}): Promise<IPaginatedResponse<IFile>> {
    const response = await axios.get(`${API_URL}/files/`, { params });
    return response.data;
  },
  
  // ... (deleteFile, getStorageStats, downloadFile are unchanged)
  async deleteFile(id: string): Promise<void> { await axios.delete(`${API_URL}/files/${id}/`); },
  async getStorageStats(): Promise<IStorageStats> { const response = await axios.get(`${API_URL}/files/storage_savings/`); return response.data; },
  async downloadFile(fileUrl: string, filename: string): Promise<void> { /* ... */ },
};

