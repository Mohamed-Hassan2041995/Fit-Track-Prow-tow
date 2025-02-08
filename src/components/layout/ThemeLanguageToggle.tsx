import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Translate,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ThemeLanguageToggle: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
      
      <Tooltip title={language === 'en' ? 'العربية' : 'English'}>
        <IconButton onClick={toggleLanguage} color="inherit">
          <Translate />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ThemeLanguageToggle;