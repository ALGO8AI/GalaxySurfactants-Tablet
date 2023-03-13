import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Toast from "./components/Toast/Toast";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0077b6",
      },
      secondary: {
        main: "#404040",
        dark: "#000000",
      },
      text: {
        primary: "#404040",
        secondary: "#0077b6",
      },
    },
    typography: {
      fontSize: "16px",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Toast />
    </ThemeProvider>
  );
}

export default App;
