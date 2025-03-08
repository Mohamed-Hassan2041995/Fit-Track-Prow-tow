// هذا الكمبوننت يمثل صفحة التقارير.
// يعرض قائمة بالتقارير المتاحة مع إمكانية تصفية التقارير وعرض التفاصيل وتنزيلها.
// يعتمد على مكونات من مكتبة Material-UI ويستخدم هوك مخصص لجلب التقارير.

import React, { useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import ReportsList from "../features/reports/components/ReportsList";
import ReportFilters from "../features/reports/components/ReportFilters";
import ReportViewer from "../features/reports/components/ReportViewer";
import { useReports } from "../features/reports/hooks/useReports";
import { Report } from "../types/report";

const ReportsPage: React.FC = () => {
  const { reports, loading, fetchReports } = useReports(); // استخدام هوك لجلب التقارير
  const [selectedReport, setSelectedReport] = useState<Report | null>(null); // حالة لتحديد التقرير المحدد
  const [filters, setFilters] = useState({
    // حالة لحفظ الفلاتر المطبقة على التقارير
    type: "attendance",
    startDate: null,
    endDate: null,
  });

  // دالة لتحديث الفلاتر وجلب التقارير بناءً عليها
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters); // تحديث الفلاتر
    fetchReports(newFilters); // جلب التقارير الجديدة بناءً على الفلاتر
  };

  // دالة لعرض تقرير معين عند النقر عليه
  const handleViewReport = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId); // العثور على التقرير بناءً على معرفه
    setSelectedReport(report || null); // تعيين التقرير المحدد
  };

  // دالة لتنزيل تقرير معين
  const handleDownloadReport = (reportId: string) => {
    // TODO: تنفيذ عملية تنزيل التقرير
    console.log("Downloading report:", reportId); // طباعة معرف التقرير في وحدة التحكم
  };

  if (loading) return null; // عرض لا شيء أثناء تحميل التقارير

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <ReportFilters
          filters={filters} // تمرير الفلاتر الحالية
          onFilterChange={handleFilterChange} // تمرير دالة تحديث الفلاتر
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <ReportsList
          reports={reports} // تمرير قائمة التقارير
          onViewReport={handleViewReport} // تمرير دالة عرض التقرير
          onDownloadReport={handleDownloadReport} // تمرير دالة تنزيل التقرير
        />
      </Paper>

      <ReportViewer
        report={selectedReport} // تمرير التقرير المحدد
        open={!!selectedReport} // حالة فتح العرض بناءً على وجود تقرير محدد
        onClose={() => setSelectedReport(null)} // دالة لإغلاق عرض التقرير
      />
    </Container>
  );
};

export default ReportsPage;
