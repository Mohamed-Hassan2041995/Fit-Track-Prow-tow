/**
 * مكون بطاقة التوصيات المدعوم بالذكاء الاصطناعي
 * يعرض توصيات شخصية باستخدام تحليل الذكاء الاصطناعي
 * الميزات:
 * - أنواع توصيات ديناميكية
 * - مؤشرات بصرية للأولوية
 * - اقتراحات مصنفة
 * - عناصر واجهة مستخدم تفاعلية
 */
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import { Lightbulb, TrendingUp, Warning } from "@mui/icons-material";

// تعريف خصائص مكون بطاقة التوصيات
interface AIRecommendationCardProps {
  title: string; // عنوان البطاقة
  recommendations: string[]; // قائمة بالتوصيات
  type: "success" | "warning" | "info"; // نوع البطاقة (نجاح، تحذير، معلومات)
}

// مكون بطاقة التوصيات
const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  title,
  recommendations,
  type,
}) => {
  // دالة للحصول على الأيقونة المناسبة بناءً على نوع البطاقة
  const getIcon = () => {
    switch (type) {
      case "success":
        return <TrendingUp color="success" />; // أيقونة النجاح
      case "warning":
        return <Warning color="warning" />; // أيقونة التحذير
      default:
        return <Lightbulb color="info" />; // أيقونة المعلومات
    }
  };

  return (
    <Card>
      <CardContent>
        {/* صندوق يحتوي على الأيقونة والعنوان وعلامة AI */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ mr: 1 }}>{getIcon()}</Box>
          <Typography variant="h6">{title}</Typography>
          <Chip
            label="AI Generated" // علامة تشير إلى أن المحتوى تم إنشاؤه بواسطة الذكاء الاصطناعي
            size="small"
            color="primary"
            sx={{ ml: "auto" }} // إضافة مساحة على اليسار
          />
        </Box>
        {/* قائمة بالتوصيات */}
        <List dense>
          {recommendations.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: 32 }}>•</ListItemIcon>{" "}
              {/* رمز قائمة */}
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;
