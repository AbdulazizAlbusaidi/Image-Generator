
import React from 'react';
import { Sparkles } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
                Imagen <span className="text-indigo-400">AI</span> Studio
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
