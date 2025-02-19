/**
 * مكون `RatingList` لعرض قائمة التقييمات
 *
 * - يعرض قائمة بالتقييمات التي أضافها المستخدمون.
 * - يحتوي كل تقييم على صورة رمزية للمستخدم، اسمه، توقيت الإضافة، عدد النجوم، والتعليق.
 * - يتم استخدام `formatTimeAgo` لعرض الوقت بشكل مناسب.
 * - يتم استخدام `Material-UI` لتنسيق وتصميم القائمة بطريقة احترافية.
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
  Paper,
} from "@mui/material";
import { formatTimeAgo } from "../../../utils/formatters"; // دالة لتحويل التاريخ إلى صيغة "منذ وقت معين"
import { Rating as RatingType } from "../../../types/rating"; // استيراد نوع التقييم

interface RatingListProps {
  ratings: RatingType[]; // قائمة التقييمات التي سيتم عرضها
}

const RatingList: React.FC<RatingListProps> = ({ ratings }) => {
  return (
    <Paper>
      {" "}
      {/* مكون ورقي لتغليف القائمة وإضافة تصميم مناسب */}
      <List>
        {ratings.map((rating) => (
          <ListItem key={rating.id} divider sx={{ py: 2 }}>
            {" "}
            {/* عنصر منفصل لكل تقييم مع فاصل */}
            <ListItemAvatar>
              <Avatar>{rating.from_user?.first_name?.[0]}</Avatar>{" "}
              {/* عرض أول حرف من اسم المستخدم */}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography>
                    {rating.from_user?.first_name} {rating.from_user?.last_name}{" "}
                    {/* اسم المستخدم */}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • {formatTimeAgo(rating.created_at)}{" "}
                    {/* عرض الزمن بشكل نسبي */}
                  </Typography>
                </Box>
              }
              secondary={
                <>
                  <Rating
                    value={rating.score}
                    readOnly
                    size="small"
                    sx={{ mb: 1 }}
                  />{" "}
                  {/* عرض التقييم كنقاط نجوم */}
                  <Typography variant="body2" color="text.secondary">
                    {rating.feedback} {/* عرض التعليق الخاص بالتقييم */}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RatingList;
