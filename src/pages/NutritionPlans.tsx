// هذا الكمبوننت يمثل صفحة خطط التغذية.
// يعرض قائمة بخطط التغذية المتاحة ويوفر إمكانية إضافة خطة جديدة.
// يعتمد على بعض المكونات من مكتبة Material-UI ويستخدم السياق للحصول على معلومات المستخدم.

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
import NutritionPlansList from "../components/features/nutrition/NutritionPlansList";
import NutritionPlanForm from "../components/features/nutrition/NutritionPlanForm";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types/user";

const NutritionPlans: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false); // حالة لتحديد ما إذا كانت نافذة الحوار مفتوحة أم لا
  const { user } = useAuth(); // الحصول على معلومات المستخدم من السياق

  // دالة لفتح نافذة الحوار لإضافة خطة جديدة
  const handleAddPlan = () => {
    setOpenDialog(true);
  };

  // دالة لإغلاق نافذة الحوار
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // دالة لحفظ خطة التغذية الجديدة
  const handleSavePlan = async (planData: any) => {
    try {
      // TODO: تنفيذ استدعاء API لحفظ الخطة
      console.log("Saving plan:", planData); // طباعة بيانات الخطة في وحدة التحكم
      handleCloseDialog(); // إغلاق النافذة بعد الحفظ
    } catch (error) {
      console.error("Error saving plan:", error); // التعامل مع الأخطاء
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Nutrition Plans</Typography>
        {user?.role !== UserRole.TRAINEE && ( // تحقق من دور المستخدم
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddPlan} // عند النقر، يتم فتح نافذة الحوار
          >
            Create Plan
          </Button>
        )}
      </Box>

      <Paper sx={{ p: 3 }}>
        <NutritionPlansList /> {/* عرض قائمة بخطط التغذية المتاحة */}
      </Paper>

      <Dialog
        open={openDialog} // حالة فتح النافذة
        onClose={handleCloseDialog} // دالة لإغلاق النافذة
        maxWidth="md"
        fullWidth
      >
        <NutritionPlanForm
          onSubmit={handleSavePlan} // دالة تنفيذ عند إرسال النموذج
          onClose={handleCloseDialog} // دالة تنفيذ عند إلغاء العملية
        />
      </Dialog>
    </Container>
  );
};

export default NutritionPlans;
