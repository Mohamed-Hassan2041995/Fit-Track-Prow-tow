import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Avatar,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { formatDate } from "../../utils/formatters";
import { User, UserRole } from "../../types/user";

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "error";
      case UserRole.TRAINER:
        return "primary";
      case UserRole.TRAINEE:
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar src={user.profileImage} sx={{ width: 100, height: 100, mr: 2 }}>
          {user.firstName[0]}
        </Avatar>
        <Box>
          <Typography variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography color="text.secondary">{user.email}</Typography>
          <Chip
            label={user.role}
            color={getRoleColor(user.role)}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Phone Number
          </Typography>
          <Typography>{user.phoneNumber || "Not provided"}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Birth Date
          </Typography>
          <Typography>
            {user.birthDate ? formatDate(user.birthDate) : "Not provided"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary">
            Address
          </Typography>
          <Typography>{user.address || "Not provided"}</Typography>
        </Grid>

        {user.role === UserRole.TRAINER && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Specialization
              </Typography>
              <Typography>{user.specialization || "Not provided"}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Experience
              </Typography>
              <Typography>{user.experience} years</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Certifications
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {user.certifications?.map((cert, index) => (
                  <Chip key={index} label={cert} size="small" />
                ))}
              </Box>
            </Grid>
          </>
        )}

        {user.role === UserRole.TRAINEE && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Goals
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {user.goals?.map((goal, index) => (
                  <Chip key={index} label={goal} size="small" />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Medical Conditions
              </Typography>
              <Typography>
                {user.medicalConditions?.join(", ") || "None reported"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Preferred Training Time
              </Typography>
              <Typography>
                {user.preferredTrainingTime || "Not specified"}
              </Typography>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary">
            Member Since
          </Typography>
          <Typography>{formatDate(user.createdAt)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileDetails;
