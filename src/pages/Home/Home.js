import { Grid, LinearProgress, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ELEVATION } from "../../constant/color";

function Home() {
  const DATA = [
    {
      name: "Section 1",
      checked: 5,
    },
    {
      name: "Section 2",
      checked: 3,
    },
    {
      name: "Section 3",
      checked: 0,
    },
    {
      name: "Section 4",
      checked: 0,
    },
    {
      name: "Section 5",
      checked: 40,
    },
    {
      name: "Section 6",
      checked: 30,
    },
  ];

  return (
    <>
      <Sidebar page={"Home"} />
      <Grid padding={2}>
        <Typography variant="h3" color={"primary"}>
          Select a section to check equipments.
        </Typography>
        <Grid container padding={4}>
          {DATA?.map((item, index) => (
            <Grid
              container
              item
              padding={1}
              xs={12}
              sm={6}
              sx={{
                cursor: "pointer",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
                to={`/section/${index + 1}`}
              >
                <Paper
                  elevation={ELEVATION}
                  sx={{
                    padding: 2,
                  }}
                  component={Grid}
                  container
                  item
                >
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h4" color={"primary"}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sm={8}
                    justifyContent={"flex-end"}
                  >
                    <Typography variant="h4" color={"secondary"}>
                      Equipments Checked : {item.checked}/100
                    </Typography>
                  </Grid>

                  <Grid container item xs={12} marginTop={2}>
                    <LinearProgress
                      variant="determinate"
                      size={40}
                      thickness={4}
                      value={(item.checked / 40) * 100}
                      sx={{
                        width: "100%",
                        height: "10px",
                      }}
                    />
                  </Grid>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
