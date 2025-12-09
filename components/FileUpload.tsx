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
    <div className="flex flex-col items-center justify-center h-[85vh]">
      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
        {/* Animated Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative px-20 py-24 bg-gray-900/90 backdrop-blur-sm ring-1 ring-gray-800 rounded-2xl flex flex-col items-center justify-center space-y-10 shadow-2xl transform transition-all duration-300 group-hover:-translate-y-1">
          
          {/* Logo Image Section - Significantly Larger */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="/logo.png" 
              onError={(e) => {
                e.currentTarget.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=MESE";
                e.currentTarget.onerror = null;
              }}
              alt="Upload Logo" 
              // Changed from w-24 to w-56 (More than double size)
              className="relative w-56 h-56 rounded-full border-4 border-gray-800 bg-gray-900 object-contain p-6 shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col items-center space-y-3 text-center">
            {/* Beautified Main Title (Chinese) */}
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-400 drop-shadow-sm tracking-tight">
              上传 振动数据
            </span>
            
            {/* Beautified Subtitle (English) */}
            <span className="text-sm font-bold text-teal-500 tracking-[0.2em] font-mono uppercase opacity-90">
              Upload Vibration Data
            </span>

            {/* Helper Text */}
            <span className="text-xs text-gray-500 font-mono mt-4 pt-4 border-t border-gray-800/50 w-full max-w-[200px]">
              Supports .csv (ax, ay, az)
            </span>
          </div>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        accept=".csv"
        className="hidden"
      />
      
      <div className="mt-12 max-w-md text-center text-gray-500 text-sm font-mono opacity-60">
        <p>Drag & Drop or Click center to Upload.</p>
        <p className="mt-2 text-xs">The system will automatically calculate Velocity (Vz) and Displacement (Sz).</p>
      </div>
    </div>
  );
};

export default FileUpload;
