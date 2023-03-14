import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ELEVATION, GREY } from "../../constant/color";
import CBMdialog from "../../components/CBMdialog/CBMdialog";
import TBMdialog from "../../components/TBMdialog/TBMdialog";
import TBRdialog from "../../components/TBRdialog/TBRdialog";
import ApplicationServices from "../../services/Application.Services";
import { useDispatch, useSelector } from "react-redux";

function Section() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [currentEquipment, setCurrentEquipment] = useState("");
  const [sectionData, setSectionData] = useState([]);
  const [toggleCBMdialog, setToggleCBMdialog] = useState(false);
  const [toggleTBMdialog, setToggleTBMdialog] = useState(false);
  const [toggleTBRdialog, setToggleTBRdialog] = useState(false);
  const [search, setSearch] = useState("");
  const { selectedMonth } = useSelector((state) => state?.app);
  const dispatch = useDispatch();

  const fetchData = (id) => {
    ApplicationServices.getSectionEquipments(id)
      .then((res) => {
        console.log(res);
        setSectionData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    id && fetchData(id);
  }, [id]);

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
          <Grid xs={5} item>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                label="Month"
                value={selectedMonth}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SELECTED_MONTH",
                    payload: e.target.value,
                  })
                }
                fullWidth
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",

                  "November",
                  "December",
                ]?.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}></Grid>
          <Grid xs={5} item>
            <TextField
              variant="outlined"
              label="Search"
              size="small"
              type={"search"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        {current === 0 && (
          <Grid container>
            {sectionData?.length === 0 && (
              <Box sx={{ width: "100%" }} padding={2}>
                <LinearProgress />
              </Box>
            )}

            {sectionData
              ?.filter((item) => item?.description?.includes(search))
              ?.map((item, index) => (
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
                        <Typography
                          variant="h4"
                          color="secondary"
                          fontWeight={700}
                        >
                          {item?.description}
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
                          Tag :{" "}
                          <span
                            style={{
                              fontWeight: "600",
                            }}
                          >
                            {item?.tag}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container item xs={12} padding={1}>
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setCurrentEquipment(item?.description);
                            setToggleCBMdialog(true);
                          }}
                        >
                          CBM
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setToggleTBMdialog(true)}
                        >
                          TBM
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setToggleTBRdialog(true)}
                        >
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

      {toggleCBMdialog && (
        <CBMdialog
          open={toggleCBMdialog}
          handleClose={() => setToggleCBMdialog(false)}
          section={id}
          equipment={currentEquipment}
        />
      )}

      {toggleTBMdialog && (
        <TBMdialog
          open={toggleTBMdialog}
          handleClose={() => setToggleTBMdialog(false)}
        />
      )}

      {toggleTBRdialog && (
        <TBRdialog
          open={toggleTBRdialog}
          handleClose={() => setToggleTBRdialog(false)}
        />
      )}
    </>
  );
}

export default Section;
