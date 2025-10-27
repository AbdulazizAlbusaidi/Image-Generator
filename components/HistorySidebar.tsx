
import React from 'react';
import { type HistoryItem } from '../types';
import { RotateCcw, Trash2, X } from './IconComponents';

interface HistorySidebarProps {
  history: HistoryItem[];
  isVisible: boolean;
  onClose: () => void;
  onReuse: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, isVisible, onClose, onReuse, onClear }) => {

  const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };
    
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-800 border-l border-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Generation History</h2>
          <div className='flex items-center gap-2'>
            {history.length > 0 && (
                <button
                onClick={onClear}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Clear history"
                >
                <Trash2 className="h-5 w-5" />
                </button>
            )}
            <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Close history"
            >
                <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            <p>No history yet.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {history.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-lg p-3 group relative overflow-hidden">
                <div className="flex gap-4">
                  <img src={item.imageUrl} alt={item.prompt} className="w-20 h-20 object-cover rounded-md flex-shrink-0"/>
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm font-medium text-white truncate" title={item.prompt}>{item.prompt}</p>
                    <p className="text-xs text-gray-400">{item.style} | {item.aspectRatio}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTimestamp(item.timestamp)}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={() => onReuse(item)}
                        className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reuse
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
};

export default HistorySidebar;
