// هذا الكمبوننت يمثل إدارة خطط التمارين.
// يتيح للمستخدمين إنشاء خطط جديدة وعرض قائمة بخطط التمارين الحالية.
// يتم عرض زر لإنشاء خطة جديدة فقط للمستخدمين الذين ليسوا متدربين.

import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import WorkoutPlansList from "../components/features/workout/WorkoutPlansList"; // استيراد مكون قائمة خطط التمارين
import WorkoutPlanForm from "../components/features/workout/WorkoutPlanForm"; // استيراد مكون نموذج خطة التمرين
import { useAuth } from "../contexts/AuthContext"; // استيراد سياق المصادقة للحصول على معلومات المستخدم
import { UserRole } from "../types/user"; // استيراد أنواع المستخدمين

const WorkoutPlans: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false); // حالة للتحكم في فتح وإغلاق حوار النموذج
  const { user } = useAuth(); // الحصول على بيانات المستخدم من سياق المصادقة

  // دالة لإضافة خطة تمرين جديدة
  const handleAddPlan = () => {
    setOpenDialog(true); // فتح حوار النموذج عند الضغط على زر إنشاء خطة
  };

  // دالة لإغلاق الحوار
  const handleCloseDialog = () => {
    setOpenDialog(false); // إغلاق الحوار
  };

  // دالة لحفظ بيانات خطة التمرين
  const handleSavePlan = async (planData: any) => {
    try {
      // TODO: تنفيذ استدعاء API لحفظ خطة التمرين
      console.log("Saving plan:", planData); // طباعة بيانات الخطة المحفوظة
      handleCloseDialog(); // إغلاق الحوار بعد الحفظ
    } catch (error) {
      console.error("Error saving plan:", error); // طباعة خطأ إذا حدث
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Workout Plans</Typography>
        {user?.role !== UserRole.TRAINEE && ( // عرض زر إنشاء خطة فقط إذا لم يكن المستخدم متدربًا
          <Button
            variant="contained"
            startIcon={<AddIcon />} // إضافة أيقونة "+" في الزر
            onClick={handleAddPlan} // استدعاء دالة إضافة الخطة عند الضغط
          >
            Create Plan
          </Button>
        )}
      </Box>

      <Paper sx={{ p: 3 }}>
        <WorkoutPlansList /> {/* عرض قائمة خطط التمارين الحالية */}
      </Paper>

      <Dialog
        open={openDialog} // فتح الحوار بناءً على الحالة
        onClose={handleCloseDialog} // إغلاق الحوار عند الضغط خارجًا
        maxWidth="md" // عرض الحوار بحجم متوسط
        fullWidth
      >
        <WorkoutPlanForm
          onSubmit={handleSavePlan} // استدعاء دالة حفظ الخطة عند الإرسال
          onCancel={handleCloseDialog} // استدعاء دالة إغلاق الحوار عند الإلغاء
          traineeId={""} // تمرير معرف المتدرب (يمكن تعديله حسب الحاجة)
        />
      </Dialog>
    </Container>
  );
};

export default WorkoutPlans;
