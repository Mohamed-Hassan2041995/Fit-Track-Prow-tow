// هذا الكمبوننت يعرض خطط التمارين النشطة، مع معلومات عن المتدرب وتواريخ البدء والانتهاء، بالإضافة إلى خيارات للتحرير والحذف.
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// تعريف واجهة خطة التمارين
interface WorkoutPlan {
  id: string; // معرف الخطة
  traineeName: string; // اسم المتدرب
  startDate: string; // تاريخ البدء
  endDate: string; // تاريخ الانتهاء
  status: "active" | "completed" | "upcoming"; // حالة الخطة
}

const ActiveWorkoutPlans: React.FC = () => {
  const plans: WorkoutPlan[] = [
    {
      id: "1",
      traineeName: "John Doe",
      startDate: "2023-08-01",
      endDate: "2023-09-01",
      status: "active",
    },
    {
      id: "2",
      traineeName: "Jane Smith",
      startDate: "2023-08-15",
      endDate: "2023-09-15",
      status: "upcoming",
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        خطط التمارين
      </Typography>
      <List>
        {plans.map((plan) => (
          <ListItem
            key={plan.id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              mb: 1,
              "&:last-child": { mb: 0 },
            }}
          >
            <ListItemText
              primary={plan.traineeName}
              secondary={`${plan.startDate} - ${plan.endDate}`}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                label={plan.status}
                color={plan.status === "active" ? "success" : "default"}
                size="small"
              />
              <IconButton size="small">
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActiveWorkoutPlans;
