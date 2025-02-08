import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <AuthProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navbar onMenuClick={toggleSidebar} />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              minHeight: "100vh",
              // backgroundColor: '#f5f5f5',
            }}
          >
            <AppRoutes />
          </Box>
        </Box>
      </AuthProvider>
    </Router>
  );
};

export default App;
