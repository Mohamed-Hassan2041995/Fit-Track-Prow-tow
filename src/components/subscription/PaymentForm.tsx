// مكون PaymentForm مسؤول عن تنفيذ عملية الدفع باستخدام بطاقة الائتمان.
// يقوم بجمع بيانات الدفع مثل رقم البطاقة، تاريخ الانتهاء، ورمز CVV مع التحقق من صحة البيانات المدخلة باستخدام Yup.
// عند إرسال النموذج، يتم استدعاء خدمة الدفع لمعالجة الطلب، وإذا نجحت العملية، يتم عرض إشعار بنجاح الدفع.
// في حالة فشل العملية، يتم عرض إشعار بالخطأ.
// يستخدم Formik لإدارة حالة النموذج والتحقق من صحة الإدخالات، وMUI لتنسيق واجهة المستخدم.

import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { paymentService } from "../../services/payment/PaymentService";
import { useNotification } from "../../contexts/NotificationContext";

// تحديد مخطط التحقق من صحة بيانات الدفع باستخدام مكتبة Yup
const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .required("رقم البطاقة مطلوب")
    .matches(/^\d{16}$/, "رقم البطاقة غير صحيح"), // يجب أن يحتوي على 16 رقمًا فقط
  expiryDate: Yup.string()
    .required("تاريخ الانتهاء مطلوب")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "صيغة تاريخ الانتهاء غير صحيحة"), // يجب أن يكون بالشكل MM/YY
  cvv: Yup.string()
    .required("رمز CVV مطلوب")
    .matches(/^\d{3,4}$/, "رمز CVV غير صحيح"), // يجب أن يكون 3 أو 4 أرقام
});

// تعريف الخصائص (Props) التي يستقبلها المكون
interface PaymentFormProps {
  subscriptionId: string; // معرف الاشتراك الخاص بالمستخدم
  amount: number; // المبلغ المطلوب دفعه
  onSuccess: () => void; // دالة يتم استدعاؤها عند نجاح عملية الدفع
}

// مكون نموذج الدفع
const PaymentForm: React.FC<PaymentFormProps> = ({
  subscriptionId,
  amount,
  onSuccess,
}) => {
  const [processing, setProcessing] = useState(false); // حالة لمعرفة ما إذا كان الدفع قيد المعالجة
  const { showNotification } = useNotification(); // استخدام سياق الإشعارات لعرض الرسائل

  // استخدام Formik لإدارة حالة النموذج والتحقق من صحة المدخلات
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema, // تطبيق التحقق من صحة البيانات
    onSubmit: async (values) => {
      try {
        setProcessing(true); // تعيين حالة المعالجة إلى true
        // استدعاء خدمة الدفع لمعالجة العملية
        await paymentService.processPayment(
          subscriptionId,
          amount,
          "credit_card"
        );
        showNotification("تم الدفع بنجاح", "success"); // عرض إشعار بنجاح العملية
        onSuccess(); // استدعاء الدالة المرسلة عند نجاح الدفع
      } catch (error) {
        showNotification("فشل في عملية الدفع", "error"); // عرض إشعار بالفشل
      } finally {
        setProcessing(false); // إعادة تعيين حالة المعالجة إلى false بعد انتهاء العملية
      }
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* مكون ورقي من MUI لإحاطة النموذج */}
      <Typography variant="h6" gutterBottom>
        إتمام الدفع
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        المبلغ المطلوب: ${amount}
      </Typography>
      {/* نموذج الدفع */}
      <form onSubmit={formik.handleSubmit}>
        {/* حقل إدخال رقم البطاقة */}
        <TextField
          fullWidth
          name="cardNumber"
          label="رقم البطاقة"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          sx={{ mb: 2 }}
        />

        {/* حقل إدخال تاريخ الانتهاء و CVV في صف واحد */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            name="expiryDate"
            label="تاريخ الانتهاء (MM/YY)"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            error={
              formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
            }
            helperText={formik.touched.expiryDate && formik.errors.expiryDate}
          />

          <TextField
            fullWidth
            name="cvv"
            label="CVV"
            type="password"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
          />
        </Box>

        {/* زر إرسال النموذج */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={processing}
        >
          {processing ? "جاري المعالجة..." : "إتمام الدفع"}
        </Button>
      </form>
    </Paper>
  );
};

export default PaymentForm;
