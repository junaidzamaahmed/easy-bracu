import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ handleDrawerToggle, open, toggleTheme }) => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const theme = useTheme();
  console.log(theme);

  const drawerWidth = 240;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <NavLink
          to="faculty-reviews"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary={"Faculty Reviews"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        {theme.palette.mode === "dark" ? "Dark" : "Light"} Mode
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>
      </Box>
    </Drawer>
  );
};
