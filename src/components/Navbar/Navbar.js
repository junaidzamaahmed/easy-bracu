import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Navbar = ({ handleDrawerToggle, open }) => {
  const { signInWithGoogle, user, logOut } = useAuth();
  const drawerWidth = 240;

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <AppBar position="fixed" open={open}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <SchoolIcon sx={{ display: "flex", mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              flex: 1,
            }}
          >
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Easy BRACU
            </NavLink>
          </Typography>
          <Box>
            {user?.email ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.photoURL} />
                </IconButton>
              </Tooltip>
            ) : (
              <Button onClick={signInWithGoogle} variant="outlined">
                Login
              </Button>
            )}

            {user.email && (
              <Menu
                sx={{
                  mt: "45px",
                  ml: {
                    xs: "calc(62%)",
                    sm: "calc(75%)",
                    md: "calc(80%)",
                    lg: "calc(88%)",
                    xl: "calc(90%)",
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => ( */}

                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={logOut} variant="outlined">
                    Logout
                  </Button>
                </MenuItem>
                {/* <Typography textAlign="center"></Typography> */}
                {/* ))} */}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
