/**
 * Component: PaymentHistory
 *
 * وظيفة الكمبوننت:
 * - يعرض سجل المدفوعات للمستخدم في شكل جدول.
 * - يقوم بجلب بيانات المدفوعات من props وعرضها.
 * - يقوم بتنسيق التاريخ والمبلغ باستخدام دوال خارجية.
 * - يغير لون حالة الدفع بناءً على حالتها (ناجحة، قيد الانتظار، فشلت).
 */

import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { Payment } from "../../types/subscription"; // استيراد نوع بيانات المدفوعات
import { formatDate, formatCurrency } from "../../utils/formatters"; // استيراد دوال تنسيق التاريخ والمبلغ

// تعريف نوع الـ props التي يستقبلها الكمبوننت
interface PaymentHistoryProps {
  payments: Payment[]; // مصفوفة تحتوي على بيانات المدفوعات
}

// تعريف الكمبوننت واستقبال بيانات المدفوعات عبر الـ props
const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  // دالة تحدد لون الحالة بناءً على قيمتها
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": // في حالة الدفع الناجح
        return "success";
      case "pending": // في حالة الدفع قيد المعالجة
        return "warning";
      case "failed": // في حالة فشل الدفع
        return "error";
      default: // في أي حالة أخرى غير متوقعة
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom>
        سجل المدفوعات
      </Typography>

      <TableContainer>
        <Table>
          {/* رأس الجدول */}
          <TableHead>
            <TableRow>
              <TableCell>التاريخ</TableCell>
              <TableCell>المبلغ</TableCell>
              <TableCell>طريقة الدفع</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>رقم العملية</TableCell>
            </TableRow>
          </TableHead>

          {/* جسم الجدول */}
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                {/* عرض تاريخ الدفع بعد تنسيقه */}
                <TableCell>{formatDate(payment.created_at)}</TableCell>

                {/* عرض مبلغ الدفع بعد تنسيقه */}
                <TableCell>{formatCurrency(payment.amount)}</TableCell>

                {/* عرض وسيلة الدفع */}
                <TableCell>{payment.payment_method}</TableCell>

                {/* عرض حالة الدفع مع تغيير لون الشريحة بناءً على الحالة */}
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={getStatusColor(payment.status)}
                    size="small"
                  />
                </TableCell>

                {/* عرض رقم العملية المالية */}
                <TableCell>{payment.transaction_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaymentHistory;
