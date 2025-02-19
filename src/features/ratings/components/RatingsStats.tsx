/**
 * مكون `RatingsStats`
 *
 * - يعرض متوسط التقييمات الإجمالي للمستخدمين.
 * - يعرض توزيع التقييمات حسب عدد النجوم (من 1 إلى 5 نجوم).
 * - يستخدم `Rating` لعرض متوسط التقييم كنقاط نجوم.
 * - يستخدم `LinearProgress` لعرض نسبة كل تقييم بصريًا.
 * - يتم تنسيق التصميم باستخدام `Material-UI`.
 */

import React from "react";
import { Box, Typography, Rating, LinearProgress } from "@mui/material";
import { RatingStats } from "../../../types/rating"; // استيراد نوع بيانات إحصائيات التقييمات

interface RatingsStatsProps {
  stats: RatingStats; // تعريف نوع البيانات المتوقعة للمكون
}

export const RatingsStats: React.FC<RatingsStatsProps> = ({ stats }) => {
  return (
    <Box>
      {/* عرض متوسط التقييم وإجمالي عدد التقييمات */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Rating
          value={stats.averageScore}
          precision={0.5}
          readOnly
          size="large"
          sx={{ mr: 2 }} // إضافة هامش بين النجوم والنصوص
        />
        <Typography variant="h6">
          {stats.averageScore.toFixed(1)} من 5{" "}
          {/* عرض المتوسط بتنسيق عشري (مثل 4.5) */}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          ({stats.totalRatings} تقييم) {/* عرض إجمالي عدد التقييمات */}
        </Typography>
      </Box>

      {/* عرض توزيع التقييمات لكل عدد من النجوم */}
      {Object.entries(stats.breakdown)
        .reverse()
        .map(([score, count]) => (
          <Box
            key={score}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Typography sx={{ minWidth: 60 }}>
              {score} نجوم {/* عرض عدد النجوم */}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(count / stats.totalRatings) * 100} // حساب نسبة كل تقييم
              sx={{
                flexGrow: 1,
                mx: 1,
                height: 8,
                borderRadius: 4,
              }}
            />
            <Typography sx={{ minWidth: 40 }}>
              {count} {/* عرض عدد المستخدمين الذين أعطوا هذا التقييم */}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};
