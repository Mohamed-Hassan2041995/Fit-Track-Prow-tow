// هذا الكمبوننت يعرض قائمة المتدربين، مع معلومات عن كل متدرب تشمل حالة خطط التمارين والتغذية وآخر نشاط لهم.
import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { Person, FitnessCenter, Restaurant } from "@mui/icons-material";

// تعريف واجهة عنصر المتدرب
interface TraineeListItem {
  id: string; // معرف المتدرب
  name: string; // اسم المتدرب
  hasWorkoutPlan: boolean; // هل لديه خطة تمارين
  hasNutritionPlan: boolean; // هل لديه خطة تغذية
  lastActive: string; // آخر نشاط
}

const MyTraineesList: React.FC = () => {
  // TODO: استبدل بهذا استدعاء API الفعلي
  const trainees: TraineeListItem[] = [
    {
      id: "1",
      name: "John Doe",
      hasWorkoutPlan: true,
      hasNutritionPlan: true,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      hasWorkoutPlan: true,
      hasNutritionPlan: false,
      lastActive: "1 day ago",
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        متدربيي
      </Typography>

      <List>
        {trainees.map((trainee) => (
          <ListItem
            key={trainee.id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              mb: 1,
              "&:last-child": { mb: 0 },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={trainee.name}
              secondary={`آخر نشاط: ${trainee.lastActive}`}
            />

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip
                icon={<FitnessCenter />}
                label="تمرين"
                color={trainee.hasWorkoutPlan ? "success" : "default"}
                size="small"
              />
              <Chip
                icon={<Restaurant />}
                label="تغذية"
                color={trainee.hasNutritionPlan ? "success" : "default"}
                size="small"
              />
              <Button variant="outlined" size="small">
                عرض التفاصيل
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyTraineesList;
