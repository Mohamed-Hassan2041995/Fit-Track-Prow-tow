import { User, UserRole } from "../types/user";

interface MockUser {
  email: string;
  password: string;
  user: User;
}

export const mockUsers: MockUser[] = [
  {
    email: "admin@example.com",
    password: "password",
    user: {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
      gender: "male",
    },
  },
  {
    email: "trainer@example.com",
    password: "password",
    user: {
      id: "2",
      email: "trainer@example.com",
      firstName: "John",
      lastName: "Trainer",
      role: UserRole.TRAINER,
      createdAt: new Date(),
      updatedAt: new Date(),
      gender: "male",
    },
  },
  {
    email: "trainee@example.com",
    password: "password",
    user: {
      id: "3",
      email: "trainee@example.com",
      firstName: "Sarah",
      lastName: "Trainee",
      role: UserRole.TRAINEE,
      createdAt: new Date(),
      updatedAt: new Date(),
      gender: "female",
    },
  },
];
