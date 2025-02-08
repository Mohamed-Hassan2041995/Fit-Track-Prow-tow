import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Push Notifications"
            />
            {user?.role === UserRole.TRAINEE && (
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Workout Reminders"
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
              Change Password
            </Button>
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
              Update Profile
            </Button>
            <Divider sx={{ my: 2 }} />
            <Button variant="outlined" color="error" fullWidth>
              Delete Account
            </Button>
          </Paper>
        </Grid>

        {user?.role === UserRole.ADMIN && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                System Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Allow User Registration"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Maintenance Mode"
              />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Settings;