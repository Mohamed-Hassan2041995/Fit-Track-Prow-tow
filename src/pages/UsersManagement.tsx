// هذا الكمبوننت يمثل إدارة المستخدمين.
// يتيح للمستخدمين إضافة وتحرير بيانات المستخدمين من خلال نموذج مخصص.
// يتم عرض قائمة المستخدمين مع إمكانية التعديل، ويظهر حوار لإضافة أو تعديل مستخدم.

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
import UsersList from "../components/users/UsersList"; // استيراد مكون قائمة المستخدمين
import UserForm from "../components/users/UserForm"; // استيراد مكون نموذج المستخدم
import { User } from "../types/user"; // استيراد نوع بيانات المستخدم

const UsersManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false); // حالة لفتح وإغلاق حوار النموذج
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // حالة لتحديد المستخدم المختار

  // دالة لإضافة مستخدم جديد
  const handleAddUser = () => {
    setSelectedUser(null); // تعيين المستخدم المختار إلى null لإضافة مستخدم جديد
    setOpenDialog(true); // فتح حوار النموذج
  };

  // دالة لتحرير مستخدم موجود
  const handleEditUser = (user: User) => {
    setSelectedUser(user); // تعيين المستخدم المختار للمستخدم الذي سيتم تحريره
    setOpenDialog(true); // فتح حوار النموذج
  };

  // دالة لإغلاق الحوار
  const handleCloseDialog = () => {
    setOpenDialog(false); // إغلاق الحوار
    setSelectedUser(null); // إعادة تعيين المستخدم المختار
  };

  // دالة لحفظ بيانات المستخدم
  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      // TODO: تنفيذ استدعاء API لحفظ المستخدم
      console.log("Saving user:", userData); // طباعة بيانات المستخدم المحفوظة
      handleCloseDialog(); // إغلاق الحوار بعد الحفظ
    } catch (error) {
      console.error("Error saving user:", error); // طباعة خطأ إذا حدث
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Users Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />} // إضافة أيقونة "+" في الزر
          onClick={handleAddUser} // استدعاء دالة إضافة المستخدم عند الضغط
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <UsersList onEditUser={handleEditUser} />{" "}
        {/* عرض قائمة المستخدمين مع إمكانية التحرير */}
      </Paper>

      <Dialog
        open={openDialog} // فتح الحوار بناءً على الحالة
        onClose={handleCloseDialog} // إغلاق الحوار عند الضغط خارجاً
        maxWidth="md" // عرض الحوار بحجم متوسط
        fullWidth
      >
        <UserForm
          initialValues={selectedUser} // تمرير بيانات المستخدم المختار للنموذج
          onSubmit={handleSaveUser} // استدعاء دالة حفظ المستخدم عند الإرسال
          onCancel={handleCloseDialog} // استدعاء دالة إغلاق الحوار عند الإلغاء
        />
      </Dialog>
    </Container>
  );
};

export default UsersManagement;
