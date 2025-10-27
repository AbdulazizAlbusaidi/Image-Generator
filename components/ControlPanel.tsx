
import React from 'react';
import { ASPECT_RATIOS, STYLE_PRESETS } from '../constants';
import { Wand2 } from './IconComponents';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  style: string;
  setStyle: (style: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  style,
  setStyle,
  isLoading,
  onGenerate,
}) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col gap-6 h-fit md:sticky md:top-24">
      <h2 className="text-xl font-semibold text-white">Create Your Vision</h2>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="prompt" className="font-medium text-gray-300">Prompt</label>
        <textarea
          id="prompt"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A majestic lion wearing a crown in a futuristic city"
          className="bg-gray-900 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-200 placeholder-gray-500"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="style" className="font-medium text-gray-300">Style</label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-200 appearance-none"
          disabled={isLoading}
        >
          {STYLE_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>{preset.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="aspectRatio" className="font-medium text-gray-300">Aspect Ratio</label>
        <select
          id="aspectRatio"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-200 appearance-none"
          disabled={isLoading}
        >
          {ASPECT_RATIOS.map((ratio) => (
            <option key={ratio.id} value={ratio.id}>{ratio.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Working...
          </>
        ) : (
          <>
            <Wand2 className="h-5 w-5" />
            Generate
          </>
        )}
      </button>
    </div>
  );
};

export default ControlPanel;
