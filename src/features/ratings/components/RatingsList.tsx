/**
 * مكون `RatingsList`
 *
 * - يعرض قائمة التقييمات التي تمت إضافتها من قبل المستخدمين.
 * - كل عنصر في القائمة يحتوي على:
 *   - صورة رمزية (Avatar) تعرض أول حرف من اسم المستخدم.
 *   - تقييم بالنجوم باستخدام `Rating` من MUI.
 *   - توقيت إضافة التقييم بصيغة "منذ وقت معين" باستخدام `formatTimeAgo`.
 *   - تعليق المستخدم على التقييم.
 * - يستخدم `Material-UI` لتنسيق القائمة وتصميمها بشكل أنيق.
 */

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import { formatTimeAgo } from "../../../utils/formatters"; // دالة لتحويل التاريخ إلى صيغة "منذ وقت معين"
import { Rating as RatingType } from "../../../types/rating"; // استيراد نوع التقييم

interface RatingsListProps {
  ratings: RatingType[]; // مصفوفة التقييمات التي سيتم عرضها
}

export const RatingsList: React.FC<RatingsListProps> = ({ ratings }) => {
  return (
    <List>
      {" "}
      {/* قائمة التقييمات */}
      {ratings.map((rating) => (
        <ListItem
          key={rating.id} // معرف فريد لكل تقييم
          sx={{
            mb: 2, // إضافة هامش بين العناصر
            border: "1px solid", // إطار حول كل عنصر
            borderColor: "divider", // لون الإطار مطابق للموضوع العام
            borderRadius: 1, // تدوير الزوايا
          }}
        >
          <ListItemAvatar>
            <Avatar>{rating.fromUserId.charAt(0)}</Avatar>{" "}
            {/* عرض أول حرف من معرف المستخدم */}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={rating.score} readOnly size="small" />{" "}
                {/* عرض التقييم كنقاط نجوم */}
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(rating.createdAt)} {/* عرض الزمن بشكل نسبي */}
                </Typography>
              </Box>
            }
            secondary={rating.feedback} // عرض التعليق الخاص بالتقييم
          />
        </ListItem>
      ))}
    </List>
  );
};
