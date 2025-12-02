import { type StylePreset } from './types';

export const ASPECT_RATIOS = [
  { id: '1:1', name: 'Square (1:1)' },
  { id: '16:9', name: 'Landscape (16:9)' },
  { id: '9:16', name: 'Portrait (9:16)' },
  { id: '4:3', name: 'Standard (4:3)' },
  { id: '3:4', name: 'Standard Portrait (3:4)' },
];

export const STYLE_PRESETS: StylePreset[] = [
  { id: 'photorealistic', name: 'Photorealistic', prefix: 'award-winning photograph, photorealistic, 8k, sharp focus, hyper-detailed,' },
  { id: 'illustration', name: 'Illustration', prefix: 'digital illustration, vibrant colors, detailed, concept art, by artgerm,' },
  { id: '3d-render', name: '3D Render', prefix: '3d render, octane render, trending on artstation, cinematic, hyper-realistic,' },
  { id: 'watercolor', name: 'Watercolor', prefix: 'watercolor painting, soft wash, delicate, artistic, light colors,' },
  { id: 'cinematic', name: 'Cinematic', prefix: 'cinematic still, dramatic lighting, epic composition, anamorphic lens flare, movie grade,' },
  { id: 'anime', name: 'Anime', prefix: 'anime style, makoto shinkai style, beautiful lighting, detailed background, studio ghibli,' },
  { id: 'minimalist', name: 'Minimalist', prefix: 'minimalist, clean lines, simple, elegant, single object,' },
];

export const PROMPT_SUGGESTIONS = [
    'A majestic lion wearing a crown',
    'Futuristic cityscape at night',
    'Enchanted forest with glowing mushrooms',
    'Steampunk airship soaring through clouds',
    'A cat wizard casting a spell',
    'Underwater coral reef teeming with life',
    'A cozy cabin in a snowy landscape',
    'Robot exploring an alien planet',
    'A delicious-looking plate of pasta',
    'Surreal dreamscape with floating islands',
];
