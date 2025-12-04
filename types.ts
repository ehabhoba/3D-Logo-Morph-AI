export interface StyleOption {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  category: string;
  previewImage: string; // URL for the thumbnail
}

export interface GeneratedResult {
  imageUrl: string;
  styleId: string;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  READY = 'READY',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}