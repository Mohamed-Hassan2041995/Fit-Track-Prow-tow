import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { useTheme as useAppTheme } from "../../contexts/ThemeContext";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      // sx={{
      //   backgroundColor: alpha(theme.palette.background.paper, 0.8),
      //   color: theme.palette.text.primary,
      //   py: 3,
      //   mt: 4,
      // }}
      sx={{ backgroundColor: "#1e293b", color: "#ffffff", py: 3, mt: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* القسم الأول: معلومات حول الموقع */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">
              حول الموقع
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              هذا التطبيق يساعدك على تتبع تمارينك وتطوير أدائك الرياضي بشكل
              أفضل.
            </Typography>
          </Grid>

          {/* القسم الثاني: روابط سريعة */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">
              روابط سريعة
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <Link href="/dashboard" color="inherit" underline="hover">
                لوحة التحكم
              </Link>
              <Link href="/workouts" color="inherit" underline="hover">
                التمارين
              </Link>
              <Link href="/profile" color="inherit" underline="hover">
                الصفحة الشخصية
              </Link>
            </Box>
          </Grid>

          {/* القسم الثالث: تواصل معنا */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">
              تواصل معنا
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              البريد الإلكتروني: contact@example.com
            </Typography>
            <Typography variant="body2">الهاتف: +123 456 789</Typography>
          </Grid>
        </Grid>

        {/* حقوق النشر */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
