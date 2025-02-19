// هذا الكود يعرّف أنواع التقارير وواجهات البيانات المرتبطة بها والتي تُستخدم في النظام
// لإنشاء تقارير مختلفة مثل الحضور، التقدم، والتقارير المالية
// يتم تخزين بيانات التقارير وعرضها للمستخدمين بناءً على نوع التقرير ومحتوياته

// تعريف نوع بيانات ReportType الذي يحدد أنواع التقارير الممكنة
export type ReportType = "attendance" | "progress" | "financial";

// تعريف الواجهة ReportSection لتمثيل كل قسم داخل التقرير
export interface ReportSection {
  title: string; // عنوان القسم داخل التقرير
  content: string | React.ReactNode; // محتوى القسم ويمكن أن يكون نصًا أو عنصر React
}

// تعريف الواجهة Report التي تمثل التقرير بالكامل
export interface Report {
  id: string; // معرف فريد للتقرير
  type: ReportType; // نوع التقرير (حضور، تقدم، مالي)
  title: string; // عنوان التقرير
  sections: ReportSection[]; // قائمة بالأقسام التي يحتويها التقرير
  createdAt: Date; // تاريخ إنشاء التقرير
  createdBy: string; // معرف المستخدم الذي قام بإنشاء التقرير
  metadata?: Record<string, any>; // بيانات إضافية يمكن أن تكون مخصصة لكل تقرير
}
