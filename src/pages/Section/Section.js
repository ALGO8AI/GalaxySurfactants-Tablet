import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ELEVATION, GREY } from "../../constant/color";

function Section() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Sidebar page={`Section ${id}`} />
      <Grid padding={2} container alignItems="center">
        <Grid container item alignItems="center" xs={12} sm={6}>
          <IconButton
            aria-label="delete"
            size="large"
            color="primary"
            variant="contained"
            sx={{
              fontSize: "24px",
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
          <Grid>
            {["Unchecked", "Checked"].map((item, index) => (
              <Button
                key={index}
                onClick={() => setCurrent(index)}
                variant={current === index && "contained"}
              >
                {item}
              </Button>
            ))}
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={6} justifyContent="flex-end">
          <TextField
            variant="outlined"
            label="Search"
            size="small"
            type={"search"}
          />
        </Grid>

        {current === 0 && (
          <Grid container>
            {Array(10)
              .fill(1)
              .map((item, index) => (
                <Grid
                  container
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  padding={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Paper
                    elevation={ELEVATION}
                    sx={{
                      width: "100%",
                      padding: 2,
                    }}
                    component={Grid}
                    container
                  >
                    <Grid
                      container
                      alignItems="center"
                      sx={{
                        borderBottom: `1px solid ${GREY}`,
                      }}
                      paddingBottom={1}
                      marginBottom={1}
                    >
                      <Grid container item xs={11}>
                        <Typography variant="h5" color="secondary">
                          63 bagging online turner belt conveyor
                        </Typography>
                      </Grid>
                      <Grid container item xs={1}>
                        <Grid
                          sx={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                          }}
                        ></Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Typography variant="h5" color="secondary">
                          Tag : Online Turner
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container item xs={12} padding={1}>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          CBM
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          TBM
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          TBR
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          TBI
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}

        {current === 1 && (
          <Grid container>
            {Array(4)
              .fill(1)
              .map((item, index) => (
                <Grid
                  container
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  padding={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Paper
                    elevation={ELEVATION}
                    sx={{
                      width: "100%",
                      padding: 2,
                    }}
                    component={Grid}
                    container
                  >
                    <Grid
                      container
                      alignItems="center"
                      sx={{
                        borderBottom: `1px solid ${GREY}`,
                      }}
                      paddingBottom={1}
                      marginBottom={1}
                    >
                      <Grid container item xs={11}>
                        <Typography variant="h5" color="secondary">
                          63 bagging online turner belt conveyor
                        </Typography>
                      </Grid>
                      <Grid container item xs={1}>
                        <Grid
                          sx={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                          }}
                        ></Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Typography variant="h5" color="secondary">
                          Tag : Online Turner
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container item xs={12} padding={1}>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          CBM
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          TBM
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          TBR
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          TBI
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Section;
