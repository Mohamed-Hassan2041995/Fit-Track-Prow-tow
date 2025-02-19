import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { UserRole } from "../../../types/user";

/**
 * مكون قائمة خطط التغذية:
 * يعرض قائمة بخطط التغذية المتاحة. لكل خطة، يتم عرض اسم الخطة، اسم المتدرب،
 * تاريخ البدء وتاريخ الانتهاء. كما يظهر حالة الخطة (نشطة أو قادمة).
 * إذا كان المستخدم ليس متدربًا، يتم عرض أزرار لتعديل وحذف الخطط.
 */
const NutritionPlansList: React.FC = () => {
  const { user } = useAuth(); // الحصول على معلومات المستخدم من سياق المصادقة

  // TODO: استبدل هذا بالمكالمة الفعلية للـ API للحصول على الخطط
  const plans = [
    {
      id: "1", // معرف الخطة
      name: "Weight Loss Diet", // اسم الخطة
      trainee: "John Doe", // اسم المتدرب
      startDate: "2023-08-01", // تاريخ البدء
      endDate: "2023-09-01", // تاريخ الانتهاء
      status: "active", // حالة الخطة
    },
    {
      id: "2", // معرف الخطة
      name: "Muscle Gain Diet", // اسم الخطة
      trainee: "Jane Smith", // اسم المتدرب
      startDate: "2023-08-15", // تاريخ البدء
      endDate: "2023-09-15", // تاريخ الانتهاء
      status: "upcoming", // حالة الخطة
    },
  ];

  return (
    <List>
      {plans.map((plan) => (
        <ListItem
          key={plan.id} // استخدام المعرف كـ مفتاح
          sx={{
            border: "1px solid #e0e0e0", // إضافة حدود للعناصر
            borderRadius: 1, // إضافة زوايا مستديرة
            mb: 1, // المسافة السفلية بين العناصر
            "&:last-child": { mb: 0 }, // إزالة المسافة السفلية من آخر عنصر
          }}
        >
          <ListItemText
            primary={plan.name} // اسم الخطة كالنص الرئيسي
            secondary={`${plan.trainee} • ${plan.startDate} to ${plan.endDate}`} // معلومات إضافية عن الخطة
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={plan.status} // عرض حالة الخطة
              color={plan.status === "active" ? "success" : "default"} // تغيير اللون حسب الحالة
              size="small" // حجم الشريحة
            />
            {user?.role !== UserRole.TRAINEE && ( // التحقق من دور المستخدم قبل عرض أزرار التعديل والحذف
              <>
                <IconButton size="small">
                  {" "}
                  // زر التعديل
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error">
                  {" "}
                  // زر الحذف
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default NutritionPlansList; // تصدير المكون
