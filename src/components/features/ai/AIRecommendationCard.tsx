/**
 * AI-powered recommendation card component
 * Displays personalized recommendations using AI analysis
 * Features:
 * - Dynamic recommendation types
 * - Visual indicators for priority
 * - Categorized suggestions
 * - Interactive UI elements
 */
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import { Lightbulb, TrendingUp, Warning } from "@mui/icons-material";

interface AIRecommendationCardProps {
  title: string;
  recommendations: string[];
  type: "success" | "warning" | "info";
}

const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  title,
  recommendations,
  type,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <TrendingUp color="success" />;
      case "warning":
        return <Warning color="warning" />;
      default:
        return <Lightbulb color="info" />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ mr: 1 }}>{getIcon()}</Box>
          <Typography variant="h6">{title}</Typography>
          <Chip
            label="AI Generated"
            size="small"
            color="primary"
            sx={{ ml: "auto" }}
          />
        </Box>
        <List dense>
          {recommendations.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: 32 }}>•</ListItemIcon>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;
