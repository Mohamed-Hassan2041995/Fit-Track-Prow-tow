import React from "react";
import { IconButton, Box } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { WorkoutPlan } from "../../../types/workout";

interface WorkoutPlanActionsProps {
  plan: WorkoutPlan; // كائن خطة التمرين
  onEdit?: (plan: WorkoutPlan) => void; // دالة للتعديل (اختياري)
  onDelete?: (planId: string) => void; // دالة للحذف (اختياري)
}

// مكون أزرار خطة التمرين
const WorkoutPlanActions: React.FC<WorkoutPlanActionsProps> = ({
  plan,
  onEdit,
  onDelete,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {" "}
      {/* حاوية لتنسيق الأزرار */}
      <IconButton
        size="small" // حجم الزر
        onClick={() => onEdit?.(plan)} // استدعاء دالة التعديل عند الضغط
        aria-label="edit plan" // وصف للزر
      >
        <EditIcon fontSize="small" /> {/* أيقونة التعديل */}
      </IconButton>
      <IconButton
        size="small" // حجم الزر
        color="error" // لون الزر (لون خطأ)
        onClick={() => onDelete?.(plan.id)} // استدعاء دالة الحذف عند الضغط
        aria-label="delete plan" // وصف للزر
      >
        <DeleteIcon fontSize="small" /> {/* أيقونة الحذف */}
      </IconButton>
    </Box>
  );
};

export default WorkoutPlanActions; // تصدير المكون
