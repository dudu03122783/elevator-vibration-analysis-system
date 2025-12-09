import React, { useRef } from 'react';
import { parseCSV, processVibrationData } from '../utils/mathUtils';
import { ProcessedDataPoint } from '../types';

interface FileUploadProps {
  onDataLoaded: (data: ProcessedDataPoint[], fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();
    try {
      const raw = parseCSV(text, 1600);
      const processed = processVibrationData(raw, 1600);
      onDataLoaded(processed, file.name);
    } catch (e) {
      alert("Error parsing CSV. Ensure columns 'ax', 'ay', 'az' exist.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative px-12 py-16 bg-gray-900 ring-1 ring-gray-800 rounded-lg leading-none flex flex-col items-center justify-center space-y-6"
        >
          {/* Logo Image Section */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-30"></div>
            <img 
              src="/logo.png" 
              onError={(e) => {
                e.currentTarget.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=MESE";
                e.currentTarget.onerror = null;
              }}
              alt="Upload Logo" 
              className="relative w-24 h-24 rounded-full border-2 border-gray-700 bg-gray-800 object-contain p-2 shadow-2xl"
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <span className="text-xl text-gray-100 font-bold tracking-tight">Upload Vibration Data</span>
            <span className="text-sm text-gray-400 font-mono">Supports .csv (ax, ay, az)</span>
          </div>
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        accept=".csv"
        className="hidden"
      />
      
      <div className="mt-8 max-w-md text-center text-gray-500 text-sm font-mono">
        <p>Drag & Drop or Click to Upload.</p>
        <p className="mt-2 text-gray-600">The system will automatically calculate Velocity (Vz) and Displacement (Sz) via integration.</p>
      </div>
    </div>
  );
};

export default FileUpload;
