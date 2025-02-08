import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  FitnessCenter,
  Restaurant,
  People,
  Settings,
  EventNote,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types/user";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Workout Plans",
      icon: <FitnessCenter />,
      path: "/workouts",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Nutrition Plans",
      icon: <Restaurant />,
      path: "/nutrition",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Attendance",
      icon: <EventNote />,
      path: "/attendance",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Users Management",
      icon: <People />,
      path: "/users",
      roles: [UserRole.ADMIN],
    },
    {
      text: "Settings",
      icon: <Settings />,
      path: "/settings",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {menuItems.map(
          (item) =>
            item.roles.some((role) => hasPermission(role)) && (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )
        )}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;

/*
import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider } from "@mui/material";
import { Dashboard, FitnessCenter, Restaurant, ExpandLess, ExpandMore, Chat, BarChart, Help } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [openSections, setOpenSections] = useState({ workouts: false, nutrition: false });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    {
      text: "Workouts",
      icon: <FitnessCenter />, 
      subItems: [
        { text: "My Workouts", path: "/workouts" },
        { text: "Create Workout", path: "/workouts/create" },
      ],
    },
    {
      text: "Nutrition",
      icon: <Restaurant />, 
      subItems: [
        { text: "Meal Plans", path: "/nutrition" },
        { text: "Add Meal", path: "/nutrition/add" },
      ],
    },
    { text: "Chat", icon: <Chat />, path: "/chat" },
    { text: "Reports", icon: <BarChart />, path: "/reports" },
    { text: "Support", icon: <Help />, path: "/support" },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={{ width: 250 }}>
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.subItems ? (
              <>
                <ListItemButton onClick={() => toggleSection(item.text.toLowerCase())}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openSections[item.text.toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections[item.text.toLowerCase()]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItemButton
                        key={subIndex}
                        sx={{ pl: 4 }}
                        selected={location.pathname === subItem.path}
                        onClick={() => navigate(subItem.path)}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
            {index !== menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

*/
