import React, { useState } from "react";
import { Container, Grid, Button, Box, Paper, Tab, Tabs } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileEdit from "../components/profile/ProfileEdit";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import RatingsSummary from "../features/ratings/components/RatingsSummary";
import UserActivityReport from "../components/reports/UserActivityReport";

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showNotification } = useNotification();
  const [openEdit, setOpenEdit] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  if (!user) return null;

  const handleEditClick = () => {
    setOpenEdit(true);
  };

  const handleSaveProfile = async (values: any) => {
    try {
      await updateUser(values);
      showNotification("Profile updated successfully", "success");
    } catch (error) {
      showNotification("Failed to update profile", "error");
      throw error;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditClick}
        >
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ mb: 1 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Profile" />
              <Tab label="Ratings" />
              <Tab label="Activity" />
            </Tabs>
          </Paper>

          {activeTab === 0 && <ProfileDetails user={user} />}

          {activeTab === 1 && <RatingsSummary userId={user.id} />}

          {activeTab === 2 && (
            <UserActivityReport
              userId={user.id}
              userType={user.role.toLowerCase() as "trainer" | "trainee"}
            />
          )}
        </Grid>
      </Grid>

      <ProfileEdit
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </Container>
  );
};

export default Profile;
