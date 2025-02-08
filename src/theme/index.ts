import { createTheme, alpha } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    action: {
      hover: alpha("#1976d2", 0.04),
      selected: alpha("#1976d2", 0.08),
      disabled: alpha("#000000", 0.26),
      disabledBackground: alpha("#000000", 0.12),
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontSize: "0.875rem",
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            },
            "&.Mui-focused": {
              boxShadow: "0 2px 8px rgba(25,118,210,0.15)",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 0",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: alpha("#1976d2", 0.04),
          },
          "&.Mui-selected": {
            backgroundColor: alpha("#1976d2", 0.08),
            "&:hover": {
              backgroundColor: alpha("#1976d2", 0.12),
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
          padding: "8px 12px",
          fontSize: "0.75rem",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 2px 4px rgba(0,0,0,0.05)",
    "0 4px 8px rgba(0,0,0,0.08)",
    "0 6px 12px rgba(0,0,0,0.1)",
    "0 8px 16px rgba(0,0,0,0.12)",
    "0 10px 20px rgba(0,0,0,0.14)",
    "0 12px 24px rgba(0,0,0,0.16)",
    "0 14px 28px rgba(0,0,0,0.18)",
    "0 16px 32px rgba(0,0,0,0.2)",
    "0 18px 36px rgba(0,0,0,0.22)",
    "0 20px 40px rgba(0,0,0,0.24)",
    "0 22px 44px rgba(0,0,0,0.26)",
    "0 24px 48px rgba(0,0,0,0.28)",
    "0 26px 52px rgba(0,0,0,0.3)",
    "0 28px 56px rgba(0,0,0,0.32)",
    "0 30px 60px rgba(0,0,0,0.34)",
    "0 32px 64px rgba(0,0,0,0.36)",
    "0 34px 68px rgba(0,0,0,0.38)",
    "0 36px 72px rgba(0,0,0,0.4)",
    "0 38px 76px rgba(0,0,0,0.42)",
    "0 40px 80px rgba(0,0,0,0.44)",
    "0 42px 84px rgba(0,0,0,0.46)",
    "0 44px 88px rgba(0,0,0,0.48)",
    "0 46px 92px rgba(0,0,0,0.5)",
    "0 48px 96px rgba(0,0,0,0.52)",
  ],
});
