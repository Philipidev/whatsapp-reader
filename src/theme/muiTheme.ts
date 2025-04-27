// src/theme/muiTheme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul padrão MUI (ajuste se quiser)
    },
    secondary: {
      main: '#dc004e', // Rosa escuro (ajuste se quiser)
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  breakpoints: {
    // Mobile-first: xs até sm, depois md, lg, xl
    values: {
      xs: 0,    // smartphones portrait
      sm: 600,  // tablets
      md: 900,  // small laptops
      lg: 1200, // desktops
      xl: 1536, // large screens
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
  },
});

export default theme;
