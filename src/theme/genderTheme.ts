import { createTheme, Theme } from "@mui/material/styles";

/**
 * تقوم هذه الوحدة بإنشاء موضوعات الألوان بناءً على جنس المستخدم
 * وتقدم موضوعات مخصصة للألوان بما في ذلك الألوان الأساسية والثانوية
 * بالإضافة إلى خصائص تخطيط مخصصة لأزرار وبطاقات الواجهة.
 */

// تعريف الألوان المخصصة للمستخدمين الإناث
const femaleColors = {
  primary: {
    main: "#E91E63", // اللون الرئيسي للإناث
    light: "#F48FB1", // لون رئيسي فاتح للإناث
    dark: "#C2185B", // لون رئيسي داكن للإناث
  },
  secondary: {
    main: "#9C27B0", // اللون الثانوي للإناث
    light: "#CE93D8", // لون ثانوي فاتح للإناث
    dark: "#7B1FA2", // لون ثانوي داكن للإناث
  },
};

// تعريف الألوان المخصصة للمستخدمين الذكور
const maleColors = {
  primary: {
    main: "#1976D2", // اللون الرئيسي للذكور
    light: "#42A5F5", // لون رئيسي فاتح للذكور
    dark: "#1565C0", // لون رئيسي داكن للذكور
  },
  secondary: {
    main: "#2E7D32", // اللون الثانوي للذكور
    light: "#4CAF50", // لون ثانوي فاتح للذكور
    dark: "#1B5E20", // لون ثانوي داكن للذكور
  },
};

/**
 * دالة لإنشاء موضوع الألوان بناءً على جنس المستخدم ووضعية الإضاءة
 * @param gender - جنس المستخدم (ذكر أو أنثى)
 * @param mode - وضعية الإضاءة (فاتحة أو داكنة)
 * @returns موضوع الألوان المعدل
 */
export const createGenderTheme = (
  gender: "male" | "female",
  mode: "light" | "dark"
): Theme => {
  // تحديد الألوان المستخدمة بناءً على الجنس
  const colors = gender === "female" ? femaleColors : maleColors;

  // إنشاء الموضوع باستخدام الألوان المحددة
  return createTheme({
    palette: {
      mode, // وضعية الإضاءة
      primary: colors.primary, // الألوان الأساسية
      secondary: colors.secondary, // الألوان الثانوية
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212", // خلفية افتراضية
        paper: mode === "light" ? "#ffffff" : "#1e1e1e", // خلفية الورق
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: gender === "female" ? 25 : 8, // شكل الزر بناءً على الجنس
            textTransform: "none", // عدم تغيير النص
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: gender === "female" ? 20 : 12, // شكل البطاقة بناءً على الجنس
          },
        },
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // عائلة الخط
      h4: {
        fontWeight: 600, // سمك الخط للعناوين من المستوى الرابع
      },
      h6: {
        fontWeight: 600, // سمك الخط للعناوين من المستوى السادس
      },
    },
  });
};
