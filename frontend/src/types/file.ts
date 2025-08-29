// export interface File {
//   id: string;
//   original_filename: string;
//   file_type: string;
//   size: number;
//   uploaded_at: string;
//   file: string;
// } 



// src/types/file.ts
// export interface IFile {
//   id: string;
//   file: string;
//   original_filename: string;
//   file_type: string;
//   size: number;
//   human_readable_size: string; // From our improved serializer!
//   uploaded_at: string;
//   hash: string;
// }

// export interface IFileUploadResponse {
//   detail: string;
//   deduplicated: boolean;
//   file: IFile;
// }

// export interface IStorageStats {
//   total_potential_size_bytes: number;
//   actual_storage_used_bytes: number;
//   storage_saved_bytes: number;
//   human_readable: {
//     potential_size: string;
//     actual_used: string;
//     saved: string;
//   };
// }



// src/types/file.ts

export interface IFile {
  id: string;
  file: string;
  original_filename: string;
  file_type: string;
  size: number;
  human_readable_size: string;
  uploaded_at: string;
  hash: string;
}

export interface IFileUploadResponse {
  detail: string;
  deduplicated: boolean;
  file: IFile;
}

export interface IStorageStats {
  total_potential_size_bytes: number;
  actual_storage_used_bytes: number;
  storage_saved_bytes: number;
  human_readable: {
    potential_size: string;
    actual_used: string;
    saved: string;
  };
}

// NEW: Type for the paginated response from the backend
export interface IPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
