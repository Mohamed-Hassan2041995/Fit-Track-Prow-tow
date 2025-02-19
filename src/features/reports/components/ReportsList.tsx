/**
 * مكون قائمة التقارير
 *
 * يقوم هذا المكون بعرض قائمة بالتقارير المتاحة، حيث يتم عرض
 * عنوان كل تقرير وتاريخ إنشائه مع أيقونات لمشاهدة التقرير
 * وتحميله. يتم تمرير قائمة التقارير والدوال الخاصة بعمليات
 * المشاهدة والتنزيل كممتلكات (props) إلى المكون.
 */

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { Description, Download, Visibility } from "@mui/icons-material";
import { Report } from "../../../types/report";
import { formatDate } from "../../../utils/formatters";

interface ReportsListProps {
  reports: Report[]; // قائمة بالتقارير
  onViewReport: (reportId: string) => void; // دالة لمشاهدة التقرير
  onDownloadReport: (reportId: string) => void; // دالة لتحميل التقرير
}

const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  onViewReport,
  onDownloadReport,
}) => {
  return (
    <List>
      {reports.map((report) => (
        <ListItem
          key={report.id} // استخدام معرف التقرير كمفتاح فريد
          sx={{
            border: "1px solid", // إضافة حدود
            borderColor: "divider", // لون الحدود
            borderRadius: 1, // زوايا دائرية
            mb: 1, // هامش أسفل
          }}
        >
          <ListItemIcon>
            <Description /> {/* أيقونة التقرير */}
          </ListItemIcon>
          <ListItemText
            primary={report.title} // عنوان التقرير
            secondary={`Generated on ${formatDate(report.createdAt)}`} // تاريخ إنشاء التقرير
          />
          <IconButton onClick={() => onViewReport(report.id)}>
            {" "}
            {/* زر لمشاهدة التقرير */}
            <Visibility /> {/* أيقونة المشاهدة */}
          </IconButton>
          <IconButton onClick={() => onDownloadReport(report.id)}>
            {" "}
            {/* زر لتحميل التقرير */}
            <Download /> {/* أيقونة التحميل */}
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ReportsList;
