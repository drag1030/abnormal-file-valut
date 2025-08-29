// // src/components/FilterPanel.tsx
// import React, { useState } from 'react';

// interface FilterPanelProps {
//   onFilterChange: (filters: Record<string, string>) => void;
// }

// const fileTypeOptions = [
//   { value: '', label: 'All File Types' },
//   { value: 'application/pdf', label: 'PDF Document' },
//   { value: 'application/msword', label: 'Word Document (.doc)' },
//   { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word Document (.docx)' },
//   { value: 'text/plain', label: 'Text File (.txt)' },
//   { value: 'application/vnd.ms-excel', label: 'Excel Spreadsheet (.xls)' },
//   { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel Spreadsheet (.xlsx)' },
//   { value: 'application/vnd.ms-powerpoint', label: 'PowerPoint (.ppt)' },
//   { value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', label: 'PowerPoint (.pptx)' },
//   { value: 'image/jpeg', label: 'JPEG Image' },
//   { value: 'image/png', label: 'PNG Image' },
//   { value: 'image/gif', label: 'GIF Image' },
//   { value: 'image/svg+xml', label: 'SVG Image' },
//   { value: 'application/zip', label: 'ZIP Archive' },
//   { value: 'application/x-rar-compressed', label: 'RAR Archive' },
//   { value: 'audio/mpeg', label: 'MP3 Audio' },
//   { value: 'video/mp4', label: 'MP4 Video' },
// ];

// export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
//   const [search, setSearch] = useState('');
//   const [fileType, setFileType] = useState('');
//   const [minSize, setMinSize] = useState('');
//   const [maxSize, setMaxSize] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [exactDate, setExactDate] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const isValidDateString = (dateStr: string) => {
//     if (!dateStr) return true;
//     const d = new Date(dateStr);
//     return !isNaN(d.getTime()) && dateStr === d.toISOString().slice(0, 10);
//   };

//   const handleApplyFilters = () => {
//     setError(null);

//     // Validate Dates
//     if (startDate && !isValidDateString(startDate)) {
//       setError('Invalid start date.');
//       return;
//     }
//     if (endDate && !isValidDateString(endDate)) {
//       setError('Invalid end date.');
//       return;
//     }
//     if (exactDate && !isValidDateString(exactDate)) {
//       setError('Invalid specific date.');
//       return;
//     }
//     if (startDate && endDate && startDate > endDate) {
//       setError('Start date cannot be later than end date.');
//       return;
//     }

//     // Validate Sizes
//     if (minSize && maxSize && parseInt(minSize) > parseInt(maxSize)) {
//       setError('Min size cannot be greater than max size.');
//       return;
//     }

//     const filters: Record<string, string> = {};
//     if (search) filters.original_filename__icontains = search;
//     if (fileType) filters.file_type = fileType;
//     if (minSize) filters.size__gte = minSize;
//     if (maxSize) filters.size__lte = maxSize;

//     if (!exactDate) {
//       if (startDate) filters.uploaded_at__gte = startDate;
//       if (endDate) filters.uploaded_at__lte = endDate;
//     }
//     if (!startDate && !endDate && exactDate) {
//       filters.date = exactDate;
//     }

//     onFilterChange(filters);
//   };

//   const handleReset = () => {
//     setSearch('');
//     setFileType('');
//     setMinSize('');
//     setMaxSize('');
//     setStartDate('');
//     setEndDate('');
//     setExactDate('');
//     setError(null);
//     onFilterChange({});
//   };


  

//   return (
//     <div className="p-6 rounded-lg shadow-md border" style={{ backgroundColor: '#111827', borderColor: '#334155' }}>
    
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
//         {/* Search */}
//         <div className="col-span-full">
//           <label className="block text-sm font-medium text-gray-700">Search by filename</label>
//           <input
//             type="text"
//             placeholder="e.g., report.pdf"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="mt-1 block w-full form-input"
//           />
//         </div>

//         {/* File type */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">File Type</label>
//           <select
//             value={fileType}
//             onChange={(e) => setFileType(e.target.value)}
//             className="mt-1 block w-full form-select"
//           >
//             {fileTypeOptions.map(opt => (
//               <option key={opt.value} value={opt.value}>{opt.label}</option>
//             ))}
//           </select>
//         </div>

//         {/* Size range */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Min Size (bytes)</label>
//           <input type="number" value={minSize} onChange={(e) => setMinSize(e.target.value)} className="mt-1 block w-full form-input" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Max Size (bytes)</label>
//           <input type="number" value={maxSize} onChange={(e) => setMaxSize(e.target.value)} className="mt-1 block w-full form-input" />
//         </div>

//         {/* Date range */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Start Date</label>
//           <input type="date" value={startDate} disabled={!!exactDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full form-input disabled:bg-gray-100" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">End Date</label>
//           <input type="date" value={endDate} disabled={!!exactDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 block w-full form-input disabled:bg-gray-100" />
//         </div>

//         {/* Exact Date */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Specific Upload Date</label>
//           <input type="date" value={exactDate} disabled={!!startDate || !!endDate} onChange={(e) => setExactDate(e.target.value)} className="mt-1 block w-full form-input disabled:bg-gray-100" />
//         </div>

//         {/* Buttons */}
//         <div className="col-span-full flex justify-end space-x-3 pt-2">
//           <button onClick={handleReset} className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border rounded-md py-2 px-4">
//             Reset
//           </button>
//           <button onClick={handleApplyFilters} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md py-2 px-4">
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



// src/components/FilterPanel.tsx
import React, { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const fileTypeOptions = [
  { value: '', label: 'All File Types' },
  { value: 'application/pdf', label: 'PDF Document' },
  { value: 'application/msword', label: 'Word Document (.doc)' },
  { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word Document (.docx)' },
  { value: 'text/plain', label: 'Text File (.txt)' },
  { value: 'application/vnd.ms-excel', label: 'Excel Spreadsheet (.xls)' },
  { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel Spreadsheet (.xlsx)' },
  { value: 'application/vnd.ms-powerpoint', label: 'PowerPoint (.ppt)' },
  { value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', label: 'PowerPoint (.pptx)' },
  { value: 'image/jpeg', label: 'JPEG Image' },
  { value: 'image/png', label: 'PNG Image' },
  { value: 'image/gif', label: 'GIF Image' },
  { value: 'image/svg+xml', label: 'SVG Image' },
  { value: 'application/zip', label: 'ZIP Archive' },
  { value: 'application/x-rar-compressed', label: 'RAR Archive' },
  { value: 'audio/mpeg', label: 'MP3 Audio' },
  { value: 'video/mp4', label: 'MP4 Video' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [fileType, setFileType] = useState('');
  const [minSize, setMinSize] = useState('');
  const [maxSize, setMaxSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exactDate, setExactDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValidDateString = (dateStr: string) => {
    if (!dateStr) return true;
    const d = new Date(dateStr);
    return !isNaN(d.getTime()) && dateStr === d.toISOString().slice(0, 10);
  };

  const handleApplyFilters = () => {
    setError(null);

    // Validate Dates
    if (startDate && !isValidDateString(startDate)) {
      setError('Invalid start date.');
      return;
    }
    if (endDate && !isValidDateString(endDate)) {
      setError('Invalid end date.');
      return;
    }
    if (exactDate && !isValidDateString(exactDate)) {
      setError('Invalid specific date.');
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      setError('Start date cannot be later than end date.');
      return;
    }

    // Validate Sizes
    if (minSize && maxSize && parseInt(minSize) > parseInt(maxSize)) {
      setError('Min size cannot be greater than max size.');
      return;
    }

    const filters: Record<string, string> = {};
    if (search) filters.original_filename__icontains = search;
    if (fileType) filters.file_type = fileType;
    if (minSize) filters.size__gte = minSize;
    if (maxSize) filters.size__lte = maxSize;

    // Mutually exclusive logic
    if (!exactDate) {
      if (startDate) filters.uploaded_at__gte = startDate;
      if (endDate) filters.uploaded_at__lte = endDate;
    }
    if (!startDate && !endDate && exactDate) {
      filters.date = exactDate;
    }

    onFilterChange(filters);
  };

  const handleReset = () => {
    setSearch('');
    setFileType('');
    setMinSize('');
    setMaxSize('');
    setStartDate('');
    setEndDate('');
    setExactDate('');
    setError(null);
    onFilterChange({});
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md border"
      style={{ backgroundColor: '#111827', borderColor: '#334155' }}
    >
      {error && (
        <div
          className="mb-4 p-2 rounded"
          style={{ backgroundColor: '#EF4444', color: '#FEE2E2' }}
        >
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="col-span-full">
          <label
            className="block text-sm font-medium"
            style={{ color: '#E5E7EB' }}
          >
            Search by filename
          </label>
          <input
            type="text"
            placeholder="e.g., report.pdf"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm placeholder-gray-500"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          />
        </div>

        {/* File type */}
        <div>
          <label
            className="block text-sm font-medium"
            style={{ color: '#9CA3AF' }}
          >
            File Type
          </label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          >
            {fileTypeOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ color: '#E5E7EB', backgroundColor: '#111827' }}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Size range */}
        <div>
          <label className="block text-sm font-medium" style={{ color: '#9CA3AF' }}>
            Min Size (bytes)
          </label>
          <input
            type="number"
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm placeholder-gray-500"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#9CA3AF' }}>
            Max Size (bytes)
          </label>
          <input
            type="number"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm placeholder-gray-500"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          />
        </div>

        {/* Date range */}
        <div>
          <label className="block text-sm font-medium" style={{ color: '#9CA3AF' }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            disabled={!!exactDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm disabled:bg-gray-100"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#9CA3AF' }}>
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            disabled={!!exactDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm disabled:bg-gray-100"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          />
        </div>

        {/* Exact Date */}
        <div>
          <label className="block text-sm font-medium" style={{ color: '#9CA3AF' }}>
            Specific Upload Date
          </label>
          <input
            type="date"
            value={exactDate}
            disabled={!!startDate || !!endDate}
            onChange={(e) => setExactDate(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm disabled:bg-gray-100"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              color: '#E5E7EB',
              padding: '0.5rem 0.75rem',
            }}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-full flex justify-end space-x-3 pt-2">
          <button
            onClick={handleReset}
            className="text-sm font-medium rounded-md py-2 px-4"
            style={{
              backgroundColor: '#111827',
              border: '1px solid #334155',
              color: '#E5E7EB',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1F2937')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="text-sm font-medium rounded-md py-2 px-4"
            style={{
              backgroundColor: '#6366F1',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4F46E5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6366F1')}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
