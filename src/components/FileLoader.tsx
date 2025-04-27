// src/components/FileLoader.tsx

import React, { ChangeEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';

export interface FileLoaderProps {
  /**
   * Callback quando o arquivo for lido em texto.
   * Recebe todo o conteúdo do .txt.
   */
  onLoad: (rawText: string) => void;
}

export const FileLoader: React.FC<FileLoaderProps> = ({ onLoad }) => {
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      onLoad(text);
    };
    reader.readAsText(file, 'UTF-8');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={2}
      textAlign="center"
    >
      <Typography variant="h5" gutterBottom>
        Selecione o arquivo de exportação do WhatsApp (.txt)
      </Typography>
      <Button variant="contained" component="label">
        Carregar chat
        <input
          type="file"
          accept=".txt"
          hidden
          onChange={handleFileInput}
        />
      </Button>
    </Box>
  );
};
