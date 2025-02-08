import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { Description, Download, Visibility } from '@mui/icons-material';
import { Report } from '../../../types/report';
import { formatDate } from '../../../utils/formatters';

interface ReportsListProps {
  reports: Report[];
  onViewReport: (reportId: string) => void;
  onDownloadReport: (reportId: string) => void;
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
          key={report.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText
            primary={report.title}
            secondary={`Generated on ${formatDate(report.createdAt)}`}
          />
          <IconButton onClick={() => onViewReport(report.id)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => onDownloadReport(report.id)}>
            <Download />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};