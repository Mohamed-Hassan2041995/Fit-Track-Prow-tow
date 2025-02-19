// هذا الكمبوننت يقوم بإنشاء ثيم (theme) لتطبيق MUI باستخدام ألوان وخطوط محددة.
// يقوم بتخصيص مظهر العناصر المختلفة مثل الأزرار، والبطاقات، ونوافذ المعلومات، وغيرها.
// يمكن استخدام هذا الثيم لتوحيد المظهر العام لتطبيقات React باستخدام مكتبة MUI.

import { createTheme, alpha } from "@mui/material/styles";

// إنشاء الثيم باستخدام createTheme
export const theme = createTheme({
  palette: {
    // إعداد ألوان الثيم
    primary: {
      main: "#1976d2", // اللون الرئيسي
      light: "#42a5f5", // لون فاتح
      dark: "#1565c0", // لون غامق
      contrastText: "#ffffff", // لون النص المتباين
    },
    secondary: {
      main: "#9c27b0", // اللون الثانوي الرئيسي
      light: "#ba68c8", // لون ثانوي فاتح
      dark: "#7b1fa2", // لون ثانوي غامق
      contrastText: "#ffffff", // لون النص المتباين
    },
    background: {
      default: "#f8f9fa", // لون الخلفية الافتراضي
      paper: "#ffffff", // لون ورق الخلفية
    },
    action: {
      hover: alpha("#1976d2", 0.04), // تأثير التحويم
      selected: alpha("#1976d2", 0.08), // تأثير التحديد
      disabled: alpha("#000000", 0.26), // تأثير العناصر المعطلة
      disabledBackground: alpha("#000000", 0.12), // خلفية العناصر المعطلة
    },
  },
  typography: {
    // إعدادات الخطوط
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // العائلة الخطية
    h1: {
      fontSize: "2.5rem", // حجم الخط للعناوين الرئيسية
      fontWeight: 600, // وزن الخط
      lineHeight: 1.2, // ارتفاع السطر
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
      textTransform: "none", // عدم تغيير حالة النص
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // شكل الزر
          padding: "8px 16px", // حشوة الزر
          transition: "all 0.2s ease-in-out", // تأثير الانتقال
          "&:hover": {
            transform: "translateY(-1px)", // تأثير التحويم
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // ظل الزر
          },
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // ظل الزر عند التواجد
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // شكل البطاقة
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // ظل البطاقة
          transition: "all 0.3s ease-in-out", // تأثير الانتقال
          "&:hover": {
            transform: "translateY(-2px)", // تأثير التحويم
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)", // ظل البطاقة عند التحويم
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // شكل الورقة
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // ظل الورقة
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // ظل الورقة عند مستوى الارتفاع 1
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // ظل الورقة عند مستوى الارتفاع 2
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8, // شكل حقل الإدخال
            transition: "all 0.2s ease-in-out", // تأثير الانتقال
            "&:hover": {
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // ظل عند التحويم
            },
            "&.Mui-focused": {
              boxShadow: "0 2px 8px rgba(25,118,210,0.15)", // ظل عند التركيز
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // ظل شريط التطبيق
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none", // عدم ظهور حد على الجانب الأيمن
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)", // ظل السحب
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8, // شكل العنصر في القائمة
          margin: "4px 0", // هامش العنصر
          transition: "all 0.2s ease-in-out", // تأثير الانتقال
          "&:hover": {
            backgroundColor: alpha("#1976d2", 0.04), // لون الخلفية عند التحويم
          },
          "&.Mui-selected": {
            backgroundColor: alpha("#1976d2", 0.08), // لون الخلفية عند التحديد
            "&:hover": {
              backgroundColor: alpha("#1976d2", 0.12), // لون الخلفية عند التحويم مع التحديد
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16, // شكل الشريحة
          transition: "all 0.2s ease-in-out", // تأثير الانتقال
          "&:hover": {
            transform: "translateY(-1px)", // تأثير التحويم
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // ظل عند التحويم
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4, // شكل شريط التقدم
          height: 8, // ارتفاع شريط التقدم
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8, // شكل تنبيه
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // ظل التنبيه
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4, // شكل الأداة المساعدة
          padding: "8px 12px", // حشوة الأداة المساعدة
          fontSize: "0.75rem", // حجم الخط في الأداة المساعدة
        },
      },
    },
  },
  shape: {
    borderRadius: 8, // شكل العناصر
  },
  shadows: [
    "none",
    "0 2px 4px rgba(0,0,0,0.05)", // ظل المستوى 1
    "0 4px 8px rgba(0,0,0,0.08)", // ظل المستوى 2
    "0 6px 12px rgba(0,0,0,0.1)", // ظل المستوى 3
    "0 8px 16px rgba(0,0,0,0.12)", // ظل المستوى 4
    "0 10px 20px rgba(0,0,0,0.14)", // ظل المستوى 5
    "0 12px 24px rgba(0,0,0,0.16)", // ظل المستوى 6
    "0 14px 28px rgba(0,0,0,0.18)", // ظل المستوى 7
    "0 16px 32px rgba(0,0,0,0.2)", // ظل المستوى 8
    "0 18px 36px rgba(0,0,0,0.22)", // ظل المستوى 9
    "0 20px 40px rgba(0,0,0,0.24)", // ظل المستوى 10
    "0 22px 44px rgba(0,0,0,0.26)", // ظل المستوى 11
    "0 24px 48px rgba(0,0,0,0.28)", // ظل المستوى 12
    "0 26px 52px rgba(0,0,0,0.3)", // ظل المستوى 13
    "0 28px 56px rgba(0,0,0,0.32)", // ظل المستوى 14
    "0 30px 60px rgba(0,0,0,0.34)", // ظل المستوى 15
    "0 32px 64px rgba(0,0,0,0.36)", // ظل المستوى 16
    "0 34px 68px rgba(0,0,0,0.38)", // ظل المستوى 17
    "0 36px 72px rgba(0,0,0,0.4)", // ظل المستوى 18
    "0 38px 76px rgba(0,0,0,0.42)", // ظل المستوى 19
    "0 40px 80px rgba(0,0,0,0.44)", // ظل المستوى 20
    "0 42px 84px rgba(0,0,0,0.46)", // ظل المستوى 21
    "0 44px 88px rgba(0,0,0,0.48)", // ظل المستوى 22
    "0 46px 92px rgba(0,0,0,0.5)", // ظل المستوى 23
    "0 48px 96px rgba(0,0,0,0.52)", // ظل المستوى 24
  ],
});
