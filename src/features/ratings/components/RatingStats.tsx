/**
 * مكون `RatingStats`
 *
 * - يعرض إحصائيات التقييمات لمحتوى معين (منتج، خدمة، مستخدم...).
 * - يعرض متوسط التقييم الإجمالي بعدد النجوم.
 * - يعرض عدد التقييمات الإجمالية.
 * - يعرض توزيع التقييمات لكل عدد من النجوم باستخدام `LinearProgress`.
 * - يستخدم `Paper` من `Material-UI` لإضافة تأثير بطاقات أنيق حول الإحصائيات.
 */

import React from "react";
import { Box, Typography, Rating, LinearProgress, Paper } from "@mui/material";
import { RatingStats as RatingStatsType } from "../../../types/rating";

interface RatingStatsProps {
  stats: RatingStatsType; // بيانات الإحصائيات الخاصة بالتقييمات
}

const RatingStats: React.FC<RatingStatsProps> = ({ stats }) => {
  return (
    <Paper sx={{ p: 3 }}>
      {/* عرض متوسط التقييم الكلي وعدد التقييمات */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ mr: 2 }}>
          {/* عرض متوسط التقييم برقم كبير */}
          <Typography variant="h3" component="div">
            {stats.averageScore.toFixed(1)}
          </Typography>
          {/* عرض التقييم بالنجوم، للقراءة فقط */}
          <Rating
            value={stats.averageScore}
            precision={0.5}
            readOnly
            size="large"
          />
        </Box>
        <Box>
          {/* عرض عدد التقييمات الإجمالي */}
          <Typography variant="body2" color="text.secondary">
            Based on {stats.totalRatings} ratings
          </Typography>
        </Box>
      </Box>

      {/* عرض توزيع التقييمات لكل عدد من النجوم */}
      {Object.entries(stats.breakdown)
        .sort((a, b) => Number(b[0]) - Number(a[0])) // ترتيب التقييمات من 5 إلى 1 نجمة
        .map(([score, count]) => (
          <Box key={score} sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              {/* عدد النجوم */}
              <Typography sx={{ minWidth: 30 }}>{score}</Typography>
              {/* شريط تقدم يعكس نسبة التقييمات لهذا العدد من النجوم */}
              <LinearProgress
                variant="determinate"
                value={(count / stats.totalRatings) * 100}
                sx={{
                  flexGrow: 1,
                  mx: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "grey.200", // لون خلفية الشريط
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4, // جعل شريط التقدم بحواف ناعمة
                  },
                }}
              />
              {/* عدد الأشخاص الذين أعطوا هذا التقييم */}
              <Typography sx={{ minWidth: 30 }}>{count}</Typography>
            </Box>
          </Box>
        ))}
    </Paper>
  );
};

export default RatingStats;
