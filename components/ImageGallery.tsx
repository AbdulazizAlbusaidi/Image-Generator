
import React from 'react';
import { type HistoryItem } from '../types';
import { Download, Image as ImageIcon, Scale } from './IconComponents';

interface ImageGalleryProps {
  latestImage: HistoryItem | null;
  isLoading: boolean;
  isUpscaling: boolean;
  error: string | null;
  onDownload: (imageUrl: string) => void;
  onUpscale: (item: HistoryItem) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ latestImage, isLoading, isUpscaling, error, onDownload, onUpscale }) => {
  const showLoading = isLoading || isUpscaling;
  
  return (
    <div className="w-full md:flex-grow bg-gray-800/30 border border-gray-700 rounded-lg p-6 flex items-center justify-center relative min-h-[400px] md:min-h-0">
      {showLoading && (
        <div className="text-center text-gray-400">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <ImageIcon className="h-16 w-16 text-gray-600" />
            <p className="font-semibold text-lg">{isUpscaling ? 'Upscaling your image...' : 'Generating your masterpiece...'}</p>
            <p className="text-sm">This may take a moment.</p>
          </div>
        </div>
      )}

      {!showLoading && error && (
         <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">
           <p className="font-semibold">Operation Failed</p>
           <p className="text-sm mt-1">{error}</p>
         </div>
      )}

      {!showLoading && !error && !latestImage && (
        <div className="text-center text-gray-500">
            <ImageIcon className="h-16 w-16 mx-auto" />
            <p className="mt-4 font-semibold text-lg">Your generated image will appear here</p>
            <p className="text-sm">Use the controls to get started.</p>
        </div>
      )}

      {!showLoading && !error && latestImage && (
        <div className="w-full h-full relative group">
          <img
            src={latestImage.imageUrl}
            alt={latestImage.prompt}
            className="w-full h-full object-contain rounded-md"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onDownload(latestImage.imageUrl)}
                className="flex items-center gap-2 bg-white/20 text-white backdrop-blur-sm py-2 px-4 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Download className="h-5 w-5" />
                Download
              </button>

              {!latestImage.isUpscaled && (
                <button
                  onClick={() => onUpscale(latestImage)}
                  disabled={isUpscaling}
                  className="flex items-center gap-2 bg-indigo-500/50 text-white backdrop-blur-sm py-2 px-4 rounded-lg hover:bg-indigo-500/70 transition-colors disabled:bg-gray-500/50 disabled:cursor-not-allowed"
                >
                  <Scale className="h-5 w-5" />
                  Upscale
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
