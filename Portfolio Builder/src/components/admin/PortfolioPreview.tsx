import React from 'react';
import { X } from 'lucide-react';
import { Portfolio } from '../../contexts/PortfolioContext';
import PortfolioView from '../PortfolioView';

interface PortfolioPreviewProps {
  portfolio: Portfolio;
  onClose: () => void;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ portfolio, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview: {portfolio.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Preview Content */}
        <div className="h-full overflow-auto">
          <div className="transform scale-90 origin-top">
            <PortfolioView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;