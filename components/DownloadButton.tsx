'use client';

import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { usePackStore } from '@/store/usePackStore';
import { exportPackingList } from '@/lib/packingEngine';

const DownloadButton = () => {
  const { 
    packingList, 
    destination, 
    startDate, 
    endDate, 
    isLightPack 
  } = usePackStore();

  const handleDownload = () => {
    const content = exportPackingList(
      packingList,
      destination,
      startDate,
      endDate,
      isLightPack
    );

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `PackIt-${destination.replace(/[^a-zA-Z0-9]/g, '_')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (!packingList.length) {
    return null;
  }

  return (
    <motion.button
      onClick={handleDownload}
      className="flex items-center space-x-2 button-primary"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ArrowDownTrayIcon className="w-5 h-5" />
      <span>Download List</span>
    </motion.button>
  );
};

export default DownloadButton; 