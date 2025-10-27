
import React, { useState, useEffect, useCallback } from 'react';
import { type HistoryItem } from './types';
import { generateImage, upscaleImage } from './services/geminiService';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageGallery from './components/ImageGallery';
import HistorySidebar from './components/HistorySidebar';
import { STYLE_PRESETS } from './constants';
import { Download, History, X } from './components/IconComponents';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [style, setStyle] = useState<string>('photorealistic');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('imagen-ai-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('imagen-ai-history');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('imagen-ai-history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);

    const stylePrefix = STYLE_PRESETS.find(p => p.id === style)?.prefix || '';
    const fullPrompt = `${stylePrefix} ${prompt}`.trim();

    try {
      const base64Image = await generateImage(fullPrompt, aspectRatio);
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        prompt,
        fullPrompt,
        aspectRatio,
        style,
        imageUrl: `data:image/png;base64,${base64Image}`,
        timestamp: new Date().toISOString(),
        isUpscaled: false,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, style]);

  const handleUpscale = useCallback(async (itemToUpscale: HistoryItem) => {
    setIsUpscaling(true);
    setError(null);
    try {
        const upscaledBase64Image = await upscaleImage(itemToUpscale.imageUrl);
        const upscaledImageUrl = `data:image/png;base64,${upscaledBase64Image}`;

        setHistory(prevHistory => 
            prevHistory.map(item => 
                item.id === itemToUpscale.id 
                ? { ...item, imageUrl: upscaledImageUrl, isUpscaled: true }
                : item
            )
        );
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred during upscaling.');
    } finally {
        setIsUpscaling(false);
    }
  }, []);

  const handleReusePrompt = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setAspectRatio(item.aspectRatio);
    setStyle(item.style);
    setIsHistoryVisible(false);
  };
  
  const handleClearHistory = () => {
      setHistory([]);
  };

  const handleDownloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `imagen-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const latestImage = history.length > 0 ? history[0] : null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 md:p-6 lg:p-8">
        <ControlPanel
          prompt={prompt}
          setPrompt={setPrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          style={style}
          setStyle={setStyle}
          isLoading={isLoading || isUpscaling}
          onGenerate={handleGenerate}
        />

        <ImageGallery
          latestImage={latestImage}
          isLoading={isLoading}
          isUpscaling={isUpscaling}
          error={error}
          onDownload={handleDownloadImage}
          onUpscale={handleUpscale}
        />
        
        <HistorySidebar
          history={history}
          isVisible={isHistoryVisible}
          onClose={() => setIsHistoryVisible(false)}
          onReuse={handleReusePrompt}
          onClear={handleClearHistory}
        />
      </main>
      
      <button 
        onClick={() => setIsHistoryVisible(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 z-50"
        aria-label="Show history"
        >
          <History className="h-6 w-6" />
      </button>

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-800 text-white py-2 px-4 rounded-lg shadow-xl flex items-center gap-4 z-50">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="p-1 rounded-full hover:bg-red-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
