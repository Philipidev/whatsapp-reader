// src/App.tsx

import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UploadPage } from './pages/UploadPage';
import { StatsPage } from './pages/StatsPage';
import theme from './theme/muiTheme.ts';
import './styles/global.css';

const App: React.FC = () => {
  const [rawText, setRawText] = useState<string>('');

  const handleLoad = (text: string) => {
    setRawText(text);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {rawText
        ? <StatsPage rawText={rawText} />
        : <UploadPage onLoad={handleLoad} />
      }
    </ThemeProvider>
  );
};

export default App;
