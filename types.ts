
export interface HistoryItem {
  id: number;
  prompt: string;
  fullPrompt: string;
  aspectRatio: string;
  style: string;
  imageUrl: string;
  timestamp: string;
  isUpscaled?: boolean;
}

export interface StylePreset {
  id: string;
  name: string;
  prefix: string;
}
