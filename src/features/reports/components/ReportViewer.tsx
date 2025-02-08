import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Report } from '../../../types/report';

interface ReportViewerProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report, open, onClose }) => {
  if (!report) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{report.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Generated on {new Date(report.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        
        {report.sections.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {section.title}
            </Typography>
            {section.content}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => {}}>Download</Button>
      </DialogActions>
    </Dialog>
  );
};