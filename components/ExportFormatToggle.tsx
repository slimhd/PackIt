'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentArrowDownIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ExportFormatToggleProps {
  onFormatChange: (format: 'pdf' | 'image') => void;
  selectedFormat: 'pdf' | 'image';
}

const ExportFormatToggle = ({ onFormatChange, selectedFormat }: ExportFormatToggleProps) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
      <motion.button
        onClick={() => onFormatChange('pdf')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          selectedFormat === 'pdf'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <DocumentArrowDownIcon className="w-4 h-4" />
        <span>PDF</span>
      </motion.button>
      
      <motion.button
        onClick={() => onFormatChange('image')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          selectedFormat === 'image'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <PhotoIcon className="w-4 h-4" />
        <span>Image</span>
      </motion.button>
    </div>
  );
};

export default ExportFormatToggle; 