// src/pages/UploadPage.tsx

import React from 'react';
import { FileLoader } from '../components/FileLoader';

export interface UploadPageProps {
  /** Callback para receber o texto bruto do .txt */
  onLoad: (rawText: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onLoad }) => {
  return <FileLoader onLoad={onLoad} />;
};
