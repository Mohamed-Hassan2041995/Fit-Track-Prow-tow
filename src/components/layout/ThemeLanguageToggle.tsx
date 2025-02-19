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


// import React from "react";
// import { Box, IconButton, Tooltip } from "@mui/material";
// import { Brightness4, Brightness7, Translate } from "@mui/icons-material";
// import { useTheme } from "../../contexts/ThemeContext";
// import { useLanguage } from "../../contexts/LanguageContext";

// /**
//  * مكون ThemeLanguageToggle
//  * يوفر واجهة لتبديل بين الوضع الليلي والوضع النهاري،
//  * بالإضافة إلى تبديل اللغة بين الإنجليزية والعربية.
//  */
// const ThemeLanguageToggle: React.FC = () => {
//   const { mode, toggleMode } = useTheme(); // الحصول على وضع السمة (نهاري/ليلي) ودالة التبديل
//   const { language, toggleLanguage } = useLanguage(); // الحصول على اللغة الحالية ودالة التبديل

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       {" "}
//       {/* حاوية لعرض الأزرار بشكل أفقي */}
//       <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
//         {" "}
//         {/* نص توضيحي عند تمرير الفأرة */}
//         <IconButton onClick={toggleMode} color="inherit">
//           {" "}
//           {/* زر لتبديل الوضع */}
//           {mode === "dark" ? <Brightness7 /> : <Brightness4 />}{" "}
//           {/* أيقونة الوضع الحالي */}
//         </IconButton>
//       </Tooltip>
//       <Tooltip title={language === "en" ? "العربية" : "English"}>
//         {" "}
//         {/* نص توضيحي عند تمرير الفأرة */}
//         <IconButton onClick={toggleLanguage} color="inherit">
//           {" "}
//           {/* زر لتبديل اللغة */}
//           <Translate /> {/* أيقونة اللغة */}
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );
// };

// export default ThemeLanguageToggle;
