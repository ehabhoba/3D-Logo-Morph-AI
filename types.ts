export interface StyleOption {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  icon: string; // Emoji or generic icon name
  previewColor: string;
}

export interface GeneratedResult {
  imageUrl: string;
  styleId: string;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING', // Processing base64
  READY = 'READY', // Image loaded
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}