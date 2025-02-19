import React from "react";
import { Grid } from "@mui/material";
import WorkoutCard from "./WorkoutCard";
import { Exercise } from "../../../types/workout";

interface WorkoutGridProps {
  exercises: Exercise[]; // مصفوفة من التمارين
}

// مكون شبكة التمارين
const WorkoutGrid: React.FC<WorkoutGridProps> = ({ exercises }) => {
  return (
    <Grid container spacing={3}>
      {" "}
      {/* حاوية الشبكة مع مسافة بين العناصر */}
      {exercises.map(
        (
          exercise // تكرار عبر كل تمرين في المصفوفة
        ) => (
          <Grid item xs={12} sm={6} md={4} key={exercise.id}>
            {" "}
            {/* تعريف حجم العنصر في الشبكة */}
            <WorkoutCard
              name={exercise.name} // اسم التمرين
              exercise={exercise} // تمرين مفصل
              completed={false} // تعيين الحالة كغير مكتمل
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default WorkoutGrid; // تصدير المكون
