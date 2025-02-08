import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import UsersList from '../components/users/UsersList';
import UserForm from '../components/users/UserForm';
import { User } from '../types/user';

const UsersManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      // TODO: Implement API call to save user
      console.log('Saving user:', userData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Users Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <UsersList onEditUser={handleEditUser} />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <UserForm
          initialValues={selectedUser}
          onSubmit={handleSaveUser}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Container>
  );
};

export default UsersManagement;