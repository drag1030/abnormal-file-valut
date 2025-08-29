

// // src/App.tsx
// import React, { useState } from 'react';
// import {
//   useQuery,
//   QueryClient,
//   QueryClientProvider,
//   keepPreviousData,
// } from '@tanstack/react-query';
// import { Toaster } from 'react-hot-toast';
// import { fileService } from './services/fileService';
// import { FileUpload } from './components/FileUpload';
// import { FileList } from './components/FileList';
// import { FilterPanel } from './components/FilterPanel';
// import { StorageStats } from './components/StorageStats';
// import { IPaginatedResponse, IFile } from './types/file';
// import abnormalLogo from './assets/abnormal-logo.jpeg'; // <-- add your logo file here

// const queryClient = new QueryClient();

// function AppContainer() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <Toaster position="top-right" />
//     </QueryClientProvider>
//   );
// }

// function App() {
//   const [filters, setFilters] = useState<Record<string, string>>({});
//   const [page, setPage] = useState(1);

//   // Core files query
//   const {
//     data: paginatedFiles,
//     isLoading: isFilesLoading,
//     error: filesError,
//   } = useQuery<IPaginatedResponse<IFile>, Error>({
//     queryKey: ['files', filters, page],
//     queryFn: () => fileService.getFiles({ ...filters, page: String(page) }),
//     placeholderData: keepPreviousData,
//   });

//   // Storage stats query
//   const {
//     data: stats,
//     isLoading: isStatsLoading,
//   } = useQuery({
//     queryKey: ['storageStats'],
//     queryFn: fileService.getStorageStats,
//   });

//   const handleFilterChange = (newFilters: Record<string, string>) => {
//     setPage(1);
//     setFilters(newFilters);
//   };

//   return (
//     <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
//       {/* Header */}
//       <header
//         className="shadow-lg"
//         style={{
//           backgroundColor: '#0F172A',
//           borderBottom: '1px solid #334155',
//         }}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6 lg:px-8">
//           {/* Left side: Logo + Title */}
//           <div className="flex items-center space-x-4">
//             <img
//               src={abnormalLogo}
//               alt="Abnormal Logo"
//               className="h-10 w-auto"
//             />
//             <div>
//               <h1
//                 className="text-3xl font-bold"
//                 style={{ color: '#E5E7EB' }}
//               >
//                 Abnormal File Vault
//               </h1>
//               <p className="text-sm" style={{ color: '#9CA3AF' }}>
//                 Intelligent storage with enterprise-grade search & filtering
//               </p>
//             </div>
//           </div>

//           {/* Right side: optional profile/navigation */}
//           <div className="flex items-center space-x-4">
//             {/* Example profile avatar */}
//             <button
//               aria-label="User profile"
//               className="rounded-full p-1"
//               style={{
//                 backgroundColor: '#1F2937',
//                 border: '1px solid #334155',
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8"
//                 style={{ color: '#9CA3AF' }}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M5.121 17.804A8.966 8.966 0 0112 15c1.656 
//                      0 3.182.486 4.414 1.31M15 11a3 3 
//                      0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <aside className="lg:col-span-1 space-y-8">
//             <FileUpload />
//             <StorageStats stats={stats} isLoading={isStatsLoading} />
//           </aside>
//           <section className="lg:col-span-2 space-y-8">
//             <FilterPanel onFilterChange={handleFilterChange} />
//             <FileList
//               data={paginatedFiles}
//               isLoading={isFilesLoading}
//               error={filesError as Error | null}
//               page={page}
//               setPage={setPage}
//               filters={filters}
//             />
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AppContainer;




// src/App.tsx
import React, { useState } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { fileService } from './services/fileService';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { FilterPanel } from './components/FilterPanel';
import { StorageStats } from './components/StorageStats';
import { IPaginatedResponse, IFile } from './types/file';
import abnormalLogo from './assets/abnormal-logo.jpeg'; // <-- your logo file path

const queryClient = new QueryClient();

function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

function App() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  // Core files query
  const {
    data: paginatedFiles,
    isLoading: isFilesLoading,
    error: filesError,
  } = useQuery<IPaginatedResponse<IFile>, Error>({
    queryKey: ['files', filters, page],
    queryFn: () => fileService.getFiles({ ...filters, page: String(page) }),
    placeholderData: keepPreviousData,
  });

  // Storage stats query
  const {
    data: stats,
    isLoading: isStatsLoading,
  } = useQuery({
    queryKey: ['storageStats'],
    queryFn: fileService.getStorageStats,
  });

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setPage(1);
    setFilters(newFilters);
  };

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      {/* Header */}
      <header
        className="shadow-lg"
        style={{
          backgroundColor: '#0F172A',
          borderBottom: '1px solid #334155',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6 lg:px-8">
          {/* Left side: Logo + Title */}
          <div className="flex items-center space-x-4">
            <img
              src={abnormalLogo}
              alt="Abnormal Logo"
              className="h-10 w-auto"
            />
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: '#E5E7EB' }}
              >
                Abnormal File Vault
              </h1>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>
                Intelligent storage with enterprise-grade search & filtering
              </p>
            </div>
          </div>

          {/* Right side: brand tagline */}
          <div>
            <div
              className="text-gray-400 italic text-sm select-none"
              style={{ color: '#9CA3AF' }}
            >
              Smart & Secure File Storage
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1 space-y-8">
            <FileUpload />
            <StorageStats stats={stats} isLoading={isStatsLoading} />
          </aside>
          <section className="lg:col-span-2 space-y-8">
            <FilterPanel onFilterChange={handleFilterChange} />
            <FileList
              data={paginatedFiles}
              isLoading={isFilesLoading}
              error={filesError as Error | null}
              page={page}
              setPage={setPage}
              filters={filters}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default AppContainer;
