import React from "react";
import { List, ListItem, ListItemText, Box, Chip } from "@mui/material";
import WorkoutPlanActions from "./WorkoutPlanActions";
import { useAuth } from "../../../contexts/AuthContext";
import { UserRole } from "../../../types/user";
import { WorkoutPlan } from "../../../types/workout";

/**
 * مكون WorkoutPlansList
 * يعرض قائمة بخطط التدريب المتاحة.
 * يستخرج بيانات المستخدم الحالي من سياق المصادقة ويقوم بعرض الخطط بناءً على دور المستخدم.
 */
const WorkoutPlansList: React.FC = () => {
  const { user } = useAuth(); // الحصول على بيانات المستخدم من سياق المصادقة

  // TODO: استبدال البيانات الوهمية بالاستدعاء الفعلي لواجهة برمجة التطبيقات
  const plans: WorkoutPlan[] = [
    {
      id: "1",
      traineeId: "3",
      trainerId: "2",
      name: "Strength Training", // اسم الخطة
      description: "Basic strength training program", // وصف الخطة
      exercises: [], // قائمة التمارين (فارغة حالياً)
      startDate: new Date("2023-08-01"), // تاريخ بدء الخطة
      endDate: new Date("2023-09-01"), // تاريخ انتهاء الخطة
      frequency: ["Monday", "Wednesday", "Friday"], // أيام التدريب
      status: "active", // حالة الخطة (نشطة)
      createdAt: new Date(), // تاريخ إنشاء الخطة
      updatedAt: new Date(), // تاريخ آخر تحديث للخطة
    },
    {
      id: "2",
      traineeId: "3",
      trainerId: "2",
      name: "Weight Loss Program", // اسم الخطة
      description: "Program focused on weight loss", // وصف الخطة
      exercises: [], // قائمة التمارين (فارغة حالياً)
      startDate: new Date("2023-08-15"), // تاريخ بدء الخطة
      endDate: new Date("2023-09-15"), // تاريخ انتهاء الخطة
      frequency: ["Tuesday", "Thursday", "Saturday"], // أيام التدريب
      status: "upcoming", // حالة الخطة (قيد الانتظار)
      createdAt: new Date(), // تاريخ إنشاء الخطة
      updatedAt: new Date(), // تاريخ آخر تحديث للخطة
    },
  ];

  return (
    <List>
      {plans.map(
        (
          plan // تكرار على كل خطة في القائمة
        ) => (
          <ListItem
            key={plan.id}
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
              // حاوية لعرض حالة الخطة وأزرار الإجراءات
              <Chip
                label={plan.status} // عرض حالة الخطة
                color={plan.status === "active" ? "success" : "default"} // تغيير لون الشريحة حسب الحالة
                size="small" // حجم الشريحة
              />
              {user?.role !== UserRole.TRAINEE && ( // إذا لم يكن المستخدم متدرباً، عرض أزرار الإجراءات
                <WorkoutPlanActions plan={plan} /> // تمرير تفاصيل الخطة إلى مكون الإجراءات
              )}
            </Box>
          </ListItem>
        )
      )}
    </List>
  );
};

export default WorkoutPlansList;
