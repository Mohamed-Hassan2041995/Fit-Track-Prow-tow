/**
 * هوك استخدام التقارير (useReports)
 *
 * يوفر هذا الهوك وظائف لجلب التقارير من قاعدة بيانات Supabase
 * وإدارتها، بما في ذلك جلب التقارير وفقًا لمجموعة من الفلاتر
 * (نوع التقرير، تاريخ البدء، تاريخ الانتهاء) وإنشاء تقارير جديدة.
 * يتم تخزين التقارير في حالة (state) ويتيح للمستخدمين معرفة
 * حالة تحميل البيانات.
 */

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { Report, ReportType } from "../../../types/report";

// واجهة لتحديد الفلاتر المطلوبة لجلب التقارير
interface ReportFilters {
  type: ReportType; // نوع التقرير
  startDate: Date | null; // تاريخ البدء
  endDate: Date | null; // تاريخ الانتهاء
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]); // حالة لتخزين التقارير
  const [loading, setLoading] = useState(true); // حالة لتحديد ما إذا كانت البيانات لا تزال تُحمّل

  // دالة لجلب التقارير من قاعدة البيانات
  const fetchReports = async (filters: ReportFilters) => {
    try {
      setLoading(true); // تعيين حالة التحميل إلى true قبل البدء في الجلب
      const { data, error } = await supabase
        .from("reports") // تحديد الجدول الذي نريد الجلب منه
        .select("*") // جلب جميع الأعمدة
        .eq("type", filters.type) // تطبيق فلتر على نوع التقرير
        .gte("created_at", filters.startDate?.toISOString()) // تطبيق فلتر على تاريخ البدء
        .lte("created_at", filters.endDate?.toISOString()) // تطبيق فلتر على تاريخ الانتهاء
        .order("created_at", { ascending: false }); // ترتيب النتائج حسب تاريخ الإنشاء بشكل تنازلي

      if (error) throw error; // إذا كان هناك خطأ، نرميه
      setReports(data); // تعيين التقارير المسترجعة في حالة التقارير
    } catch (error) {
      console.error("Error fetching reports:", error); // طباعة الخطأ في حال حدوثه
    } finally {
      setLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء
    }
  };

  // دالة لإنشاء تقرير جديد
  const generateReport = async (type: ReportType, params: any) => {
    try {
      const { data, error } = await supabase
        .from("reports") // تحديد الجدول الذي نريد الإدخال فيه
        .insert([{ type, ...params }]) // إدخال التقرير الجديد مع المعلمات
        .select() // جلب البيانات المدخلة
        .single(); // نريد نتيجة واحدة فقط

      if (error) throw error; // إذا كان هناك خطأ، نرميه
      setReports((prev) => [data, ...prev]); // إضافة التقرير الجديد إلى قائمة التقارير الموجودة
      return data; // إرجاع البيانات الجديدة
    } catch (error) {
      console.error("Error generating report:", error); // طباعة الخطأ في حال حدوثه
      throw error; // رمي الخطأ مرة أخرى
    }
  };

  return {
    reports, // تقارير الجلب
    loading, // حالة التحميل
    fetchReports, // دالة جلب التقارير
    generateReport, // دالة إنشاء تقرير
  };
};
