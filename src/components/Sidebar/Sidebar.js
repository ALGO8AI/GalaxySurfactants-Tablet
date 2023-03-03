import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { LOGO, WATERMARK } from "../../assets";
import { LIGHT_GREY } from "../../constant/color";
import { useDispatch } from "react-redux";

function Sidebar({ page }) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{
        height: "100%",
      }}
    >
      {/* <List>
        <ListItem>User</ListItem>
        <ListItem>Admin</ListItem>
      </List> */}
      <Divider />

      <Grid
        cotainer
        sx={{
          padding: 2,
          marginTop: "auto",
          backgroundColor: LIGHT_GREY,
        }}
      >
        <Grid
          container
          item
          sx={12}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <img
            src={WATERMARK}
            alt="watermark"
            style={{
              height: "2rem",
            }}
          />

          <img
            src={LOGO}
            alt="watermark"
            style={{
              height: "2rem",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, fontSize: "24px" }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {page}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
}

export default Sidebar;
