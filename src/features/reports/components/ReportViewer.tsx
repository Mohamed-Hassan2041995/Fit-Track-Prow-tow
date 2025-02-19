/**
 * مكون عارض التقرير
 *
 * يقوم هذا المكون بعرض تفاصيل تقرير محدد في نافذة حوار.
 * يحتوي على عنوان التقرير وتاريخ إنشائه، بالإضافة إلى
 * محتوى الأقسام المختلفة في التقرير. يتم تمرير التقرير
 * وحالة الفتح والدالة لإغلاق الحوار كممتلكات (props) إلى
 * المكون.
 */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Report } from "../../../types/report";

interface ReportViewerProps {
  report: Report | null; // التقرير المراد عرضه (أو null إذا لم يكن موجودًا)
  open: boolean; // حالة فتح النافذة
  onClose: () => void; // دالة لإغلاق النافذة
}

const ReportViewer: React.FC<ReportViewerProps> = ({
  report,
  open,
  onClose,
}) => {
  if (!report) return null; // إذا لم يكن هناك تقرير، لا تعرض شيئًا

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{report.title}</DialogTitle> {/* عنوان التقرير */}
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Generated on {new Date(report.createdAt).toLocaleDateString()}{" "}
            {/* تاريخ إنشاء التقرير */}
          </Typography>
        </Box>

        {report.sections.map(
          (
            section,
            index // تكرار الأقسام في التقرير
          ) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {section.title} {/* عنوان القسم */}
              </Typography>
              {section.content} {/* محتوى القسم */}
            </Box>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button> {/* زر إغلاق النافذة */}
        <Button variant="contained" onClick={() => {}}>
          Download
        </Button>{" "}
        {/* زر تحميل التقرير (يجب إضافة الوظيفة لاحقًا) */}
      </DialogActions>
    </Dialog>
  );
};

export default ReportViewer;
