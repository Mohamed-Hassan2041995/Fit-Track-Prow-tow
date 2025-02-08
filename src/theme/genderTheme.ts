import { createTheme, Theme } from '@mui/material/styles';

const femaleColors = {
  primary: {
    main: '#E91E63',
    light: '#F48FB1',
    dark: '#C2185B',
  },
  secondary: {
    main: '#9C27B0',
    light: '#CE93D8',
    dark: '#7B1FA2',
  },
};

const maleColors = {
  primary: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
  },
  secondary: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
  },
};

export const createGenderTheme = (gender: 'male' | 'female', mode: 'light' | 'dark'): Theme => {
  const colors = gender === 'female' ? femaleColors : maleColors;

  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: gender === 'female' ? 25 : 8,
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: gender === 'female' ? 20 : 12,
          },
        },
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
  });
};