'use client';

import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PackingItem as PackingItemType } from '@/store/usePackStore';

interface PackingItemProps {
  item: PackingItemType;
  isLightPack: boolean;
  onTogglePacked: (itemId: string) => void;
  onRemoveCustomItem?: (itemId: string) => void;
}

const PackingItem = ({ 
  item, 
  isLightPack, 
  onTogglePacked, 
  onRemoveCustomItem 
}: PackingItemProps) => {
  const quantity = isLightPack ? item.quantity.light : item.quantity.full;
  const displayQuantity = quantity > 1 ? `(${quantity})` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`packing-item ${item.isPacked ? 'packed' : ''}`}
    >
      <div className="flex items-center flex-1">
        <motion.button
          type="button"
          onClick={() => onTogglePacked(item.id)}
          className="mr-3 p-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            item.isPacked 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
          }`}>
            {item.isPacked && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>
        </motion.button>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`font-medium ${item.isPacked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item.name} {displayQuantity}
            </span>
            <div className="flex items-center space-x-2">
              {item.isAISuggestion && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">🤖</span>
                  AI
                </span>
              )}
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {item.category}
              </span>
              {item.isCustom && onRemoveCustomItem && (
                <motion.button
                  type="button"
                  onClick={() => onRemoveCustomItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Remove custom item"
                >
                  <XMarkIcon className="w-4 h-4" />
                </motion.button>
              )}
              {item.isAISuggestion && (
                <motion.button
                  type="button"
                  onClick={() => onRemoveCustomItem && onRemoveCustomItem(item.id)}
                  className="text-blue-500 hover:text-blue-700 p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Remove AI suggestion"
                >
                  <XMarkIcon className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackingItem; 