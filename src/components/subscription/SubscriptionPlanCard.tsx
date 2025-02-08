import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FitnessCenter,
  Restaurant,
  CheckCircle,
} from '@mui/icons-material';
import { SubscriptionPlan } from '../../types/subscription';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onSubscribe: (planId: string) => void;
  isSubscribed?: boolean;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  onSubscribe,
  isSubscribed,
}) => {
  const getTypeLabel = () => {
    switch (plan.type) {
      case 'per-session':
        return `${plan.sessions} Sessions`;
      case 'monthly':
        return 'Monthly';
      case 'package':
        return `${plan.duration} Days Package`;
    }
  };

  const getFeaturesIcon = () => {
    switch (plan.features) {
      case 'workout':
        return <FitnessCenter />;
      case 'nutrition':
        return <Restaurant />;
      case 'both':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FitnessCenter />
            <Restaurant />
          </Box>
        );
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {isSubscribed && (
        <Chip
          label="Current Plan"
          color="primary"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {plan.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="span">
            ${plan.price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
            / {getTypeLabel()}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            icon={getFeaturesIcon()}
            label={plan.features === 'both' ? 'Workout & Nutrition' : plan.features}
            color="secondary"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {plan.description}
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary={`Access to ${plan.features === 'both' ? 'all' : plan.features} programs`} />
          </ListItem>
          {plan.features === 'both' && (
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="Personalized nutrition plan" />
            </ListItem>
          )}
        </List>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onSubscribe(plan.id)}
          disabled={isSubscribed}
        >
          {isSubscribed ? 'Current Plan' : 'Subscribe Now'}
        </Button>
      </CardActions>
    </Card>
  );
};