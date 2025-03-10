import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  FitnessCenter,
  Restaurant,
  People,
  Settings,
  EventNote,
  ExpandLess,
  ExpandMore,
  Chat,
  BarChart,
  Help,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types/user";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission } = useAuth();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Workouts",
      icon: <FitnessCenter />,
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
      subItems: [
        { text: "My Workouts", path: "/workouts" },
        { text: "Create Workout", path: "/workouts/create" },
      ],
    },
    {
      text: "Nutrition",
      icon: <Restaurant />,
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
      subItems: [
        { text: "Meal Plans", path: "/nutrition" },
        { text: "Add Meal", path: "/nutrition/add" },
      ],
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
      text: "Chat",
      icon: <Chat />,
      path: "/chat",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Reports",
      icon: <BarChart />,
      path: "/reports",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
    },
    {
      text: "Support",
      icon: <Help />,
      path: "/support",
      roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE],
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
      <List sx={{ width: 300 }}>
        {menuItems.map((item, index) =>
          item.roles.some((role) => hasPermission(role)) ? (
            <React.Fragment key={index}>
              {item.subItems ? (
                <>
                  <ListItemButton onClick={() => toggleSection(item.text)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openSections[item.text] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openSections[item.text]}
                    timeout="auto"
                    unmountOnExit
                  >
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
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
              {index !== menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
