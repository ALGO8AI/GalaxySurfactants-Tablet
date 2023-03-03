import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import Navigation from "./components/Navigation/Navigation";

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
    </ThemeProvider>
  );
}

export default App;
