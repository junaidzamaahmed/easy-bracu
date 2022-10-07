import logo from "./logo.svg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import initializeAuthentication from "./Firebase/firebase.init";
import AuthProvider from "./context/AuthProvider";
import { useFirebase } from "./hooks/useFirebase";
import { CircularProgress } from "@mui/material";
import { FacultyReviews } from "./pages/FacultyReviews";

initializeAuthentication();

function App() {
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-240px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const { isLoading } = useFirebase();
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <BrowserRouter>
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Navbar
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
              />
              <Sidebar
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                toggleTheme={toggleTheme}
                theme={theme}
              />
              <Main open={mobileOpen}>
                <DrawerHeader />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/faculty-reviews" element={<FacultyReviews />} />
                </Routes>
              </Main>
            </Box>
          )}
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
