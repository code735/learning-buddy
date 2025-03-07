"use client"
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon, PictureAsPdf, VideoLibrary, School } from "@mui/icons-material";

export default function Navbar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon />, path: "dashboard" },
    { name: "PDF Upload", icon: <PictureAsPdf />, path: "pdf" },
    { name: "Video Upload", icon: <VideoLibrary />, path: "video" },
    { name: "LMS", icon: <School />, path: "lms" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Learning Buddy
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            onClick={() => onNavigate(item.path)}
            selected={currentPage === item.path}
            sx={{
              color: currentPage === item.path ? "primary.main" : "inherit",
              "&.Mui-selected": {
                backgroundColor: "rgba(63, 81, 181, 0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ color: currentPage === item.path ? "primary.main" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <School sx={{ mr: 1 }} /> Learning Buddy
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => onNavigate(item.path)}
                  sx={{
                    mx: 1,
                    borderBottom: currentPage === item.path ? "2px solid white" : "none",
                    borderRadius: 0,
                    paddingBottom: "4px",
                  }}
                  startIcon={item.icon}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
