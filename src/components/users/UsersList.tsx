// هذه الكمبوننت تستخدم لعرض قائمة المستخدمين في جدول.
// تستخدم مكتبة MUI لعرض البيانات بشكل منظم، وتتيح تعديل بيانات المستخدمين عبر زر التحرير.
// تستقبل الكمبوننت دالة onEditUser كخاصية لتمرير المستخدم المحدد عند النقر على زر التحرير.

import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton, Chip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { User, UserRole } from "../../types/user";

interface UsersListProps {
  onEditUser: (user: User) => void; // دالة لتنفيذها عند تحرير المستخدم
}

// الكمبوننت الرئيسية
const UsersList: React.FC<UsersListProps> = ({ onEditUser }) => {
  // TODO: استبدل هذا بالاتصال الفعلي بواجهة برمجة التطبيقات (API)
  const users: User[] = [
    // قائمة المستخدمين (بيانات وهمية)
    {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
      gender: "male",
    },
    {
      id: "2",
      email: "trainer@example.com",
      firstName: "John",
      lastName: "Doe",
      role: UserRole.TRAINER,
      createdAt: new Date(),
      updatedAt: new Date(),
      gender: "male",
    },
  ];

  // تعريف أعمدة الجدول
  const columns: GridColDef[] = [
    { field: "firstName", headerName: "الاسم الأول", flex: 1 }, // عمود الاسم الأول
    { field: "lastName", headerName: "الاسم الأخير", flex: 1 }, // عمود الاسم الأخير
    { field: "email", headerName: "البريد الإلكتروني", flex: 1.5 }, // عمود البريد الإلكتروني
    {
      field: "role",
      headerName: "الدور",
      flex: 1,
      renderCell: (
        params: GridRenderCellParams // طريقة عرض الخلية للدور
      ) => (
        <Chip
          label={params.value} // عرض قيمة الدور
          color={
            params.value === UserRole.ADMIN
              ? "primary" // لون أساسي للمسؤولين
              : params.value === UserRole.TRAINER
              ? "secondary" // لون ثانوي للمدربين
              : "default" // اللون الافتراضي لبقية الأدوار
          }
          size="small" // حجم الشيب
        />
      ),
    },
    {
      field: "actions",
      headerName: "الإجراءات",
      width: 100,
      renderCell: (
        params: GridRenderCellParams // طريقة عرض الخلية للإجراءات
      ) => (
        <IconButton
          size="small"
          onClick={() => onEditUser(params.row as User)} // عند النقر، استدعاء دالة تحرير المستخدم مع البيانات
        >
          <EditIcon /> // أيقونة التحرير
        </IconButton>
      ),
    },
  ];

  return (
    <DataGrid
      rows={users} // تمرير بيانات المستخدمين
      columns={columns} // تمرير تعريف الأعمدة
      autoHeight // ارتفاع الجدول تلقائي
      disableRowSelectionOnClick // تعطيل تحديد الصف عند النقر
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 }, // إعدادات الترقيم
        },
      }}
    />
  );
};

export default UsersList; // تصدير الكمبوننت للاستخدام في أماكن أخرى
