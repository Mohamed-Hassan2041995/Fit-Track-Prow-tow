/**
 * مكون `RatingsSummary`
 *
 * - يعرض ملخص التقييمات لمستخدم معين بناءً على `userId`.
 * - يستدعي `useRatings` لجلب التقييمات والإحصائيات الخاصة بالمستخدم.
 * - يتكون من قسمين رئيسيين:
 *   1. `RatingStats`: يعرض متوسط التقييم وتوزيع النجوم.
 *   2. `RatingList`: يعرض قائمة بالتقييمات والتعليقات.
 * - يستخدم `Grid` من `Material-UI` لتنسيق العرض بشكل متجاوب.
 * - في حالة تحميل البيانات (`loading`)، لا يتم عرض أي محتوى حتى يتم التحميل.
 */

import React from "react";
import { Grid } from "@mui/material";
import RatingStats from "./RatingStats"; // استيراد مكون إحصائيات التقييمات
import RatingList from "./RatingList"; // استيراد مكون قائمة التقييمات
import { useRatings } from "../hooks/useRatings"; // استيراد هوك جلب التقييمات

interface RatingsSummaryProps {
  userId: string; // معرف المستخدم المطلوب عرض تقييماته
}

const RatingsSummary: React.FC<RatingsSummaryProps> = ({ userId }) => {
  // استدعاء هوك `useRatings` لجلب التقييمات والإحصائيات
  const { ratings, stats, loading } = useRatings(userId);

  // إخفاء المحتوى أثناء تحميل البيانات
  if (loading) return null;

  return (
    <Grid container spacing={3}>
      {/* عرض إحصائيات التقييمات في عمود يشغل 4 أعمدة على الشاشات المتوسطة والكبيرة */}
      <Grid item xs={12} md={4}>
        <RatingStats stats={stats} />
      </Grid>

      {/* عرض قائمة التقييمات في عمود يشغل 8 أعمدة على الشاشات المتوسطة والكبيرة */}
      <Grid item xs={12} md={8}>
        <RatingList ratings={ratings} />
      </Grid>
    </Grid>
  );
};

export default RatingsSummary;
