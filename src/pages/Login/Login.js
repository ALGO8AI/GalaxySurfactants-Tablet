import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { LOGO, WATERMARK } from "../../assets";
import { ELEVATION, GREY, ORANGE } from "../../constant/color";

function Login() {
  const dispatch = useDispatch();
  return (
    <Grid
      sx={{
        height: "100vh",
      }}
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper
        sx={{
          width: "80%",
          margin: "0 auto",
          height: "80%",
        }}
        elevation={ELEVATION}
        component={Grid}
        container
      >
        <Grid
          xs={12}
          sm={6}
          md={8}
          sx={{
            height: "100%",
          }}
          container
          item
        >
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "80%",
            }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid>
              <Typography
                variant={"h1"}
                fontWeight={"600"}
                color={"primary"}
                sx={{
                  letterSpacing: "2px",
                }}
                textAlign={"center"}
              >
                Plant
                <span
                  style={{
                    color: ORANGE,
                  }}
                >
                  Brain
                </span>
              </Typography>
              <hr
                style={{
                  backgroundColor: ORANGE,
                  margin: "8px 0",
                }}
              />
              <Typography
                variant={"h1"}
                fontWeight={"500"}
                color={ORANGE}
                sx={{
                  letterSpacing: "2px",
                }}
                textAlign={"center"}
              >
                Digitisation
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "20%",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={10}
              padding={2}
              alignItems="center"
            >
              <img
                src={WATERMARK}
                alt={"watermark"}
                style={{ height: "2rem", marginRight: "1rem" }}
              />
              <img
                src={LOGO}
                alt={"logo"}
                style={{
                  height: "2rem",
                  marginRight: "1rem",
                }}
              />
              <Typography color={GREY}>an algo8.ai product</Typography>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={4}
          sx={{
            height: "100%",
          }}
          item
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            sx={{
              width: {
                xs: "90%",
                sm: "80%",
              },
            }}
          >
            <Typography
              variant={"h1"}
              fontWeight={"500"}
              color={"primary"}
              marginBottom={3}
            >
              Sign In
            </Typography>
            <TextField
              label={"Email"}
              variant={"outlined"}
              color={"primary"}
              size={"small"}
              fullWidth
              sx={{
                marginBottom: 2,
              }}
            />
            <TextField
              label={"Password"}
              variant={"outlined"}
              color={"primary"}
              size={"small"}
              fullWidth
              sx={{
                marginBottom: 2,
              }}
            />
            <Button
              variant={"contained"}
              sx={{
                display: "block",
                marginLeft: "auto",
              }}
              onClick={() => dispatch({ type: "LOGIN" })}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
