// Update Navbar to include theme and language toggles
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  useTheme,
  alpha,
  Divider,
  ListSubheader,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Settings,
  ExitToApp,
  Brightness4,
  Brightness7,
  Translate,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme as useAppTheme } from "../../contexts/ThemeContext";
import NotificationBell from "../notifications/NotificationBell";
import { useLanguage } from "../../contexts/LanguageContext"; // إضافة

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, toggleMode } = useAppTheme();
  const { language, toggleLanguage } = useLanguage(); // استخدام الـ Language Context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    handleClose();
    navigate("/settings");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  if (!user) return null; // إخفاء النافبار إذا لم يكن هناك مستخدم مسجل

  return (
    <AppBar
      position="fixed"
      sx={{
        // zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        backdropFilter: "blur(8px)",
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            background: "linear-gradient(45deg, #1976d2, #9c27b0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FitTrack Pro
        </Typography>

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip
              title={`Toggle ${mode === "dark" ? "light" : "dark"} mode`}
            >
              <IconButton color="inherit" onClick={toggleMode}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            {/* إضافة زر تغيير اللغة */}
            <Tooltip title={language === "en" ? "العربية" : "English"}>
              <IconButton onClick={toggleLanguage} color="inherit">
                <Translate />
              </IconButton>
            </Tooltip>

            <NotificationBell />

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: theme.palette.primary.main,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {user.firstName[0]}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 180,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <ListSubheader>
                {user.firstName} {user.lastName}
              </ListSubheader>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleProfile}>
                <AccountCircle sx={{ mr: 2 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <Settings sx={{ mr: 2 }} /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 2 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
