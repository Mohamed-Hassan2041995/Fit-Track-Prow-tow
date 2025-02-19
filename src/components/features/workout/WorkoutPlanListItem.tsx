import React from "react";
import { ListItem, ListItemText, Box, Chip } from "@mui/material";
import WorkoutPlanActions from "./WorkoutPlanActions";
import { WorkoutPlan } from "../../../types/workout";
import { UserRole } from "../../../types/user";

/**
 * مكون WorkoutPlanListItem
 * يقوم هذا المكون بعرض تفاصيل خطة التدريب في قائمة.
 * يتضمن اسم الخطة، تاريخ البدء والانتهاء، وحالة الخطة.
 * كما يوفر خيارات لتعديل أو حذف الخطة بناءً على صلاحيات المستخدم.
 */
interface WorkoutPlanListItemProps {
  plan: WorkoutPlan; // تفاصيل خطة التدريب
  userRole?: UserRole; // دور المستخدم (يمكن أن يكون مدرب أو متدرب)
  onEdit?: (plan: WorkoutPlan) => void; // دالة للتعامل مع تعديل الخطة
  onDelete?: (planId: string) => void; // دالة للتعامل مع حذف الخطة
}

const WorkoutPlanListItem: React.FC<WorkoutPlanListItemProps> = ({
  plan,
  userRole,
  onEdit,
  onDelete,
}) => {
  return (
    <ListItem
      sx={{
        border: "1px solid #e0e0e0", // إطار خفيف حول العنصر
        borderRadius: 1, // زوايا مدورة
        mb: 1, // مسافة من الأسفل
        "&:last-child": { mb: 0 }, // عدم وجود مسافة إضافية للعناصر الأخيرة
      }}
    >
      <ListItemText
        primary={plan.name} // عرض اسم الخطة
        secondary={`${new Date(
          plan.startDate
        ).toLocaleDateString()} to ${new Date(
          plan.endDate
        ).toLocaleDateString()}`} // عرض تاريخ البدء والانتهاء
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {" "}
        // حاوية لعرض حالة الخطة وأزرار التعديل والحذف
        <Chip
          label={plan.status} // عرض حالة الخطة (نشطة أو غير نشطة)
          color={plan.status === "active" ? "success" : "default"} // تغيير لون الشريحة حسب الحالة
          size="small" // حجم الشريحة
        />
        {userRole !== UserRole.TRAINEE && ( // إذا لم يكن المستخدم متدرباً، عرض أزرار التعديل والحذف
          <WorkoutPlanActions
            plan={plan} // تمرير تفاصيل الخطة
            onEdit={onEdit} // تمرير دالة التعديل
            onDelete={onDelete} // تمرير دالة الحذف
          />
        )}
      </Box>
    </ListItem>
  );
};

export default WorkoutPlanListItem;
