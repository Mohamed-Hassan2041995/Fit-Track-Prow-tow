import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { User, UserRole } from '../../types/user';

interface UsersListProps {
  onEditUser: (user: User) => void;
}

const UsersList: React.FC<UsersListProps> = ({ onEditUser }) => {
  // TODO: Replace with actual API call
  const users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      email: 'trainer@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.TRAINER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={
            params.value === UserRole.ADMIN
              ? 'primary'
              : params.value === UserRole.TRAINER
              ? 'secondary'
              : 'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          size="small"
          onClick={() => onEditUser(params.row as User)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <DataGrid
      rows={users}
      columns={columns}
      autoHeight
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
      }}
    />
  );
};

export default UsersList;