// هذا الكمبوننت يمثل صفحة الإعدادات.
// يتيح للمستخدم تعديل إعدادات الإشعارات وإعدادات الحساب.
// يقوم بعرض خيارات مختلفة بناءً على دور المستخدم (مثل متدرب أو مسؤول).

import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types/user";

const Settings: React.FC = () => {
  const { user } = useAuth(); // استخدام هوك للحصول على معلومات المستخدم الحالي

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />} // زر لتفعيل/إلغاء تفعيل إشعارات البريد الإلكتروني
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch defaultChecked />} // زر لتفعيل/إلغاء تفعيل إشعارات الدفع
              label="Push Notifications"
            />
            {user?.role === UserRole.TRAINEE && ( // إذا كان المستخدم متدربًا، عرض تذكيرات التمارين
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Workout Reminders"
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
              Change Password
            </Button>
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
              Update Profile
            </Button>
            <Divider sx={{ my: 2 }} /> {/* خط فاصل بين الأزرار */}
            <Button variant="outlined" color="error" fullWidth>
              Delete Account  
            </Button>
          </Paper>
        </Grid>

        {user?.role === UserRole.ADMIN && ( // إذا كان المستخدم مسؤولاً، عرض إعدادات النظام
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                System Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />} // زر لتفعيل/إلغاء تفعيل تسجيل المستخدمين
                label="Allow User Registration"
              />
              <FormControlLabel
                control={<Switch defaultChecked />} // زر لتفعيل/إلغاء تفعيل وضع الصيانة
                label="Enable Maintenance Mode"
              />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Settings;
