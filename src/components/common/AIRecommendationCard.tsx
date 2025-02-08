/**
 * مكون توصيات الذكاء الاصطناعي
 * يعرض توصيات مخصصة للمستخدم بناءً على تحليل البيانات
 */
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Lightbulb,
  TrendingUp,
  FitnessCenter,
  Restaurant,
} from '@mui/icons-material';

interface AIRecommendation {
  type: 'workout' | 'nutrition' | 'general';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  suggestions: string[];
}

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'workout':
      return <FitnessCenter color="primary" />;
    case 'nutrition':
      return <Restaurant color="success" />;
    default:
      return <Lightbulb color="warning" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    default:
      return 'info';
  }
};

const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendation
}) => {
  return (
    <Card 
      sx={{ 
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: (theme) => 
            theme.palette[getPriorityColor(recommendation.priority)].main,
          borderRadius: '4px 4px 0 0',
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 2 }}>{getIcon(recommendation.type)}</Box>
          <Typography variant="h6">{recommendation.title}</Typography>
          <Chip
            label="AI توصية"
            size="small"
            color="primary"
            sx={{ ml: 'auto' }}
          />
        </Box>

        <Typography color="text.secondary" paragraph>
          {recommendation.description}
        </Typography>

        <List dense>
          {recommendation.suggestions.map((suggestion, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <TrendingUp color="primary" />
              </ListItemIcon>
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;