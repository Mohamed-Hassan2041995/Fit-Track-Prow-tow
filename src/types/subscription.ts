// هذا الكود يعرّف أنواع الاشتراكات والواجهات المرتبطة بها، مما يسمح بإدارة خطط الاشتراك للمتدربين
// يشمل أنواع الاشتراكات، ميزات الخطط، بيانات الاشتراك لكل متدرب، ومعالجة المدفوعات
// يُستخدم هذا النظام لتقديم خدمات تدريبية مرنة سواء بجلسات فردية أو اشتراكات شهرية أو باقات تدريبية

// تعريف نوع بيانات SubscriptionType الذي يحدد أنواع الاشتراكات الممكنة
export type SubscriptionType = "per-session" | "monthly" | "package";
// 'per-session' → اشتراك لكل جلسة على حدة
// 'monthly' → اشتراك شهري ثابت
// 'package' → اشتراك عبر حزمة محددة المدة والجلسات

// تعريف نوع بيانات PlanFeature الذي يحدد الميزات المتاحة في خطة الاشتراك
export type PlanFeature = "workout" | "nutrition" | "both";
// 'workout' → يشمل التدريب الرياضي فقط
// 'nutrition' → يشمل خطط التغذية فقط
// 'both' → يشمل كلًا من التدريب الرياضي والتغذية

// تعريف الواجهة SubscriptionPlan لتمثيل تفاصيل كل خطة اشتراك
export interface SubscriptionPlan {
  id: string; // معرف فريد لخطة الاشتراك
  name: string; // اسم خطة الاشتراك
  type: SubscriptionType; // نوع الاشتراك (جلسة، شهري، حزمة)
  features: PlanFeature; // الميزات التي توفرها الخطة (تمارين، تغذية، أو كلاهما)
  price: number; // سعر الخطة بالعملة المحددة
  description: string; // وصف تفصيلي للخطة
  duration?: number; // مدة الاشتراك بالأيام (للخطط الشهرية أو الحزم)
  sessions?: number; // عدد الجلسات المتاحة (للاشتراكات لكل جلسة)
  trainerId: string; // معرف المدرب المسؤول عن الخطة
  createdAt: Date; // تاريخ إنشاء الخطة
  updatedAt: Date; // تاريخ آخر تحديث للخطة
}

// تعريف الواجهة TraineeSubscription لتمثيل اشتراك المتدرب في إحدى الخطط
export interface TraineeSubscription {
  id: string; // معرف فريد للاشتراك
  traineeId: string; // معرف المتدرب الذي اشترك في الخطة
  planId: string; // معرف الخطة التي تم الاشتراك بها
  startDate: Date; // تاريخ بدء الاشتراك
  endDate?: Date; // تاريخ انتهاء الاشتراك (للاشتراكات ذات المدة المحددة)
  status: "active" | "expired" | "cancelled"; // حالة الاشتراك (نشط، منتهي، ملغي)
  remainingSessions?: number; // عدد الجلسات المتبقية (للاشتراكات التي تعتمد على الجلسات)
  paymentStatus: "pending" | "completed" | "failed"; // حالة الدفع (معلق، مكتمل، فشل)
  createdAt: Date; // تاريخ إنشاء الاشتراك
  updatedAt: Date; // تاريخ آخر تحديث للاشتراك
}

// تعريف الواجهة Payment لتمثيل عمليات الدفع المرتبطة بالاشتراكات
export interface Payment {
  id: string; // معرف فريد لعملية الدفع
  subscriptionId: string; // معرف الاشتراك المرتبط بالدفع
  amount: number; // المبلغ المدفوع
  status: "pending" | "completed" | "failed"; // حالة الدفع (معلق، مكتمل، فشل)
  method: "credit_card" | "bank_transfer" | "cash"; // وسيلة الدفع (بطاقة ائتمان، تحويل بنكي، نقدًا)
  transactionId?: string; // معرف العملية في حالة الدفع الإلكتروني
  createdAt: Date; // تاريخ تنفيذ الدفع
}
