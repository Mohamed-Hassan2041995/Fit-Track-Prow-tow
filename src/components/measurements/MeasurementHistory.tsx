import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from "@mui/material";
import { formatDate } from "../../utils/formatters"; // استيراد دالة لتنسيق التاريخ

// تعريف واجهة البيانات لقياسات الجسم
interface Measurement {
  id: string; // معرف القياس
  weight: number; // الوزن
  height: number; // الطول
  bodyFatPercentage: number; // نسبة الدهون
  muscleMass: number; // كتلة العضلات
  measurementDate: Date; // تاريخ القياس
  notes?: string; // ملاحظات اختيارية
}

// تعريف الخصائص المطلوبة للمكون
interface MeasurementHistoryProps {
  measurements: Measurement[]; // مصفوفة من قياسات الجسم
}

// مكون سجل القياسات
const MeasurementHistory: React.FC<MeasurementHistoryProps> = ({
  measurements,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* استخدام Paper لتصميم خلفية المكون */}
      <Typography variant="h6" gutterBottom>
        سجل القياسات
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>التاريخ</TableCell>
              <TableCell>الوزن</TableCell>
              <TableCell>نسبة الدهون</TableCell>
              <TableCell>كتلة العضلات</TableCell>
              <TableCell>التغيير</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measurements.map((measurement, index) => {
              const prevMeasurement = measurements[index + 1]; // القياس السابق
              const weightChange = prevMeasurement
                ? measurement.weight - prevMeasurement.weight // حساب التغيير في الوزن
                : 0;

              return (
                <TableRow key={measurement.id}>
                  <TableCell>
                    {formatDate(measurement.measurementDate)}
                  </TableCell>{" "}
                  {/* عرض التاريخ بتنسيق معين */}
                  <TableCell>{measurement.weight} كجم</TableCell>{" "}
                  {/* عرض الوزن */}
                  <TableCell>{measurement.bodyFatPercentage}%</TableCell>{" "}
                  {/* عرض نسبة الدهون */}
                  <TableCell>{measurement.muscleMass} كجم</TableCell>{" "}
                  {/* عرض كتلة العضلات */}
                  <TableCell>
                    {weightChange !== 0 && ( // إذا كان هناك تغيير في الوزن
                      <Chip
                        label={`${
                          weightChange > 0 ? "+" : ""
                        }${weightChange} كجم`} // عرض التغيير مع علامة + إذا كان الوزن زاد
                        color={weightChange > 0 ? "success" : "error"} // لون الشريحة حسب التغيير
                        size="small"
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MeasurementHistory; // تصدير المكون
