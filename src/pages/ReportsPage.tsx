import React, { useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import ReportsList from '../features/reports/components/ReportsList';
import ReportFilters from '../features/reports/components/ReportFilters';
import ReportViewer from '../features/reports/components/ReportViewer';
import { useReports } from '../features/reports/hooks/useReports';
import { Report } from '../types/report';

const ReportsPage: React.FC = () => {
  const { reports, loading, fetchReports } = useReports();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filters, setFilters] = useState({
    type: 'attendance',
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    fetchReports(newFilters);
  };

  const handleViewReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report || null);
  };

  const handleDownloadReport = (reportId: string) => {
    // TODO: Implement report download
    console.log('Downloading report:', reportId);
  };

  if (loading) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <ReportFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <ReportsList
          reports={reports}
          onViewReport={handleViewReport}
          onDownloadReport={handleDownloadReport}
        />
      </Paper>

      <ReportViewer
        report={selectedReport}
        open={!!selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </Container>
  );
};

export default ReportsPage;