

// // src/components/StorageStats.tsx
// import React from 'react';
// import { IStorageStats } from '../types/file';
// import { CircleStackIcon } from '@heroicons/react/24/outline';

// interface StorageStatsProps {
//   stats?: IStorageStats;
//   isLoading: boolean;
// }

// export const StorageStats: React.FC<StorageStatsProps> = ({ stats, isLoading }) => {
//   if (isLoading || !stats) {
//     return <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse h-32"></div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <div className="flex items-center mb-4">
//         <CircleStackIcon className="h-6 w-6 text-primary-600 mr-3" />
//         <h3 className="text-xl font-semibold text-gray-800">Storage Efficiency</h3>
//       </div>
//       <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-200">
//         <div>
//           <p className="text-sm text-gray-500">Potential</p>
//           <p className="text-2xl font-bold text-gray-800">{stats.human_readable.potential_size}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Actual Used</p>
//           <p className="text-2xl font-bold text-gray-800">{stats.human_readable.actual_used}</p>
//         </div>
//         <div>
//           <p className="text-sm text-success-600">Saved</p>
//           <p className="text-2xl font-bold text-success-600">{stats.human_readable.saved}</p>
//         </div>
//       </div>
//     </div>
//   );
// };




// src/components/StorageStats.tsx
import React from 'react';
import { IStorageStats } from '../types/file';
import { CircleStackIcon } from '@heroicons/react/24/outline';

interface StorageStatsProps {
  stats?: IStorageStats;
  isLoading: boolean;
}

export const StorageStats: React.FC<StorageStatsProps> = ({ stats, isLoading }) => {
  if (isLoading || !stats) {
    return (
      <div
        className="p-6 rounded-lg shadow-lg animate-pulse"
        style={{
          backgroundColor: '#111827',
          border: '1px solid #334155',
          height: '8rem',
        }}
      ></div>
    );
  }

  return (
    <div
      className="p-6 rounded-lg shadow-lg border"
      style={{
        backgroundColor: '#111827',
        borderColor: '#334155',
      }}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <CircleStackIcon className="h-6 w-6 mr-3" style={{ color: '#6366F1' }} />
        <h3 className="text-xl font-semibold" style={{ color: '#E5E7EB' }}>
          Storage Efficiency
        </h3>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-3 gap-4 text-center divide-x"
        style={{ borderColor: '#334155' }}
      >
        {/* Potential */}
        <div>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Potential
          </p>
          <p className="text-2xl font-bold" style={{ color: '#E5E7EB' }}>
            {stats.human_readable.potential_size}
          </p>
        </div>

        {/* Actual Used */}
        <div>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Actual Used
          </p>
          <p className="text-2xl font-bold" style={{ color: '#E5E7EB' }}>
            {stats.human_readable.actual_used}
          </p>
        </div>

        {/* Saved */}
        <div>
          <p className="text-sm" style={{ color: '#22C55E' }}>
            Saved
          </p>
          <p className="text-2xl font-bold" style={{ color: '#22C55E' }}>
            {stats.human_readable.saved}
          </p>
        </div>
      </div>
    </div>
  );
};
