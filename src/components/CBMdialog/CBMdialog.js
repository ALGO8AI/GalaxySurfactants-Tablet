/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GREY } from "../../constant/color";
import { openToast } from "../../redux/toggleReducer/toggleAction";
import ApplicationServices from "../../services/Application.Services";

function CBMdialog({ open, handleClose, section, equipment }) {
  const dispatch = useDispatch();
  const [healthCheckup, setHealthCheckup] = useState({
    Rph: "",
    Yph: "",
    Bph: "",
    motorTemp: "",
  });

  const [thermography, setThermography] = useState({
    temp: "",
  });

  const [annualMaintenance, setAnnualMaintenance] = useState({
    enableAll: false,
    enableMotorCurrent: false,
    motorNoLoadCurrent: {
      Rph: "",
      Yph: "",
      Bph: "",
    },
    enableMotorResistance: false,
    motorWindingResistance: {
      RY: "",
      YB: "",
      BR: "",
    },
    enableMotorInsulation: false,
    motorWindingInsulationResistance: {
      RY: "",
      YB: "",
      BR: "",
      RE: "",
      YE: "",
      BE: "",
    },
    enableMotorEarthing: false,
    motorEarthing: {
      typeOfEarthing: "",
      earthingValue1: "",
      earthingValue2: "",
    },
    enableMotorVibrationDE: false,
    motorVibrationDE: {
      dBm: "",
      dBc: "",
      H: "",
      V: "",
      A: "",
    },
    enableMotorVibrationNDE: false,
    motorVibrationNDE: {
      dBm: "",
      dBc: "",
      H: "",
      V: "",
      A: "",
    },
  });

  const [actions, setAction] = useState({
    actionTaken: "",
    actionDate: "",
  });

  const [remark, setRemarks] = useState("");

  const [tableData, setTableData] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const { selectedMonth } = useSelector((state) => state?.app);

  const ENABLE =
    selectedMonth === "January" ||
    selectedMonth === "April" ||
    selectedMonth === "July" ||
    selectedMonth === "October";

  const fetchData = (section, equipment) => {
    ApplicationServices.getSectionEquipmentWiseCBMdata(section, equipment)
      .then((res) => {
        const formData = res?.data?.formData[0];
        setAction({
          ...formData?.actions,
          actionDate: formData?.actions?.actionDate?.split("T")[0],
        });
        setHealthCheckup(formData?.healthCheckup);
        setThermography(formData?.thermography);
        setAnnualMaintenance({
          ...annualMaintenance,
          ...formData?.annualMaintenance,
          enableAll: formData?.annualMaintenance?.status === 0 ? false : true,
        });
        setRemarks(formData?.remark);
        setTableData(res?.data?.tableData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveData = () => {
    setSubmitting(true);
    if (
      !healthCheckup?.Rph ||
      !healthCheckup?.Yph ||
      !healthCheckup?.Bph ||
      !healthCheckup?.motorTemp
    ) {
      dispatch(openToast("Please fill all the health checkup fields", "error"));
      return;
    }

    if (ENABLE && !thermography?.temp) {
      dispatch(openToast("Please fill all the thermography fields", "error"));
      return;
    }

    const body = {
      healthCheckup,
      thermography,
      annualMaintenance: {
        ...annualMaintenance,
        status: annualMaintenance?.enableAll ? 1 : 0,
      },
      actions,
      remark,
      checkedBy: 1,
    };

    ApplicationServices.postSectionEquipmentWiseCBMdata(
      section,
      equipment,
      body
    )
      .then((res) => {
        setSubmitting(false);
        dispatch(openToast(res?.data?.msg, "success"));
        handleClose();
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("ERR", err);
        dispatch(openToast(err.message || "Something went wrong", "success"));
      });
  };

  useEffect(() => {
    section && equipment && fetchData(section, equipment);
  }, [section, equipment]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent
        sx={{
          maxHeight: "500px",
          minWidth: "600px",
          maxWidth: "720px",
          overflowY: "scroll",
        }}
      >
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h2">
            CBM
            {tableData.length}
          </Typography>
        </DialogContentText>
        <Grid
          container
          sx={{
            padding: 1,
          }}
        >
          <Typography variant="h4" color="secondary" marginBottom={1}>
            Equipment :{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {equipment}
            </span>
          </Typography>

          {/* DATA TABLE */}

          <Grid
            container
            xs={12}
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: "100%",
                }}
                size="small"
              >
                <TableHead>
                  <TableRow>
                    {[
                      "Tag",
                      "Motor kW",
                      "Current",
                      "Make",
                      "RPM",
                      "Frame",
                      "Mounting",
                      "Greasing",
                      "Bearing DE",
                      "Bearing NDE",
                    ].map((item, index) => (
                      <TableCell
                        align="center"
                        key={index}
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index1) => (
                    <TableRow key={index1}>
                      {[
                        "tag",
                        "kW",
                        "ampere",
                        "make",
                        "rpm",
                        "frame",
                        "mounting",
                        "greasing",
                        "bearingNoDE",
                        "bearingNoNDE",
                      ].map((item, index2) => (
                        <TableCell align="center" key={index2}>
                          {row?.[item]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* HEALTH CHECKUP FORM */}
          <HealthCheckup value={healthCheckup} setValue={setHealthCheckup} />

          {/* THERMOGRAPHY FORM */}
          <Thermography value={thermography} setValue={setThermography} />

          {/* ANNUAL MAINTENANCE FORM */}
          <AnnualMaintenance
            value={annualMaintenance}
            setValue={setAnnualMaintenance}
          />

          {/* ACTION FORM */}
          <Action value={actions} setValue={setAction} />

          {/* REMARKS FORM */}
          <Remarks value={remark} setValue={setRemarks} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={saveData}
          autoFocus
          variant="contained"
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CBMdialog;

function HealthCheckup({ value, setValue }) {
  return (
    <Grid
      marginBottom={2}
      sx={{
        borderBottom: `1px solid ${GREY}`,
      }}
    >
      <Typography variant="h4" color="primary">
        1. Health Checkup
      </Typography>
      <Typography variant="h5" color="secondary">
        Current (A)
      </Typography>
      <Grid container>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="R ph"
            size="small"
            value={value?.Rph}
            onChange={(e) =>
              setValue({
                ...value,
                Rph: e.target.value,
              })
            }
            error={!value?.Rph}
          />
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="Y ph"
            size="small"
            value={value?.Yph}
            onChange={(e) =>
              setValue({
                ...value,
                Yph: e.target.value,
              })
            }
            error={!value?.Yph}
          />
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="B ph"
            size="small"
            value={value?.Bph}
            onChange={(e) =>
              setValue({
                ...value,
                Bph: e.target.value,
              })
            }
            error={!value?.Bph}
          />
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="Motor Temp. (℃)"
            size="small"
            value={value?.motorTemp}
            onChange={(e) =>
              setValue({
                ...value,
                motorTemp: e.target.value,
              })
            }
            error={!value?.motorTemp}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function Thermography({ value, setValue }) {
  const { selectedMonth } = useSelector((state) => state?.app);

  const ENABLE =
    selectedMonth === "January" ||
    selectedMonth === "April" ||
    selectedMonth === "July" ||
    selectedMonth === "October";

  return (
    <Grid
      marginBottom={2}
      sx={{
        borderBottom: `1px solid ${GREY}`,

        width: "100%",
      }}
    >
      <Typography variant="h4" color="primary">
        1. Thermography
      </Typography>

      <Grid container>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="Temp."
            size="small"
            value={value?.temp}
            onChange={(e) =>
              setValue({
                ...value,
                temp: e.target.value,
              })
            }
            disabled={!ENABLE}
            error={ENABLE && !value?.temp}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function AnnualMaintenance({ value, setValue }) {
  return (
    <Grid
      marginBottom={2}
      sx={{
        borderBottom: `1px solid ${GREY}`,

        width: "100%",
      }}
    >
      <Typography variant="h4" color="primary">
        3. Annual Maintenance{" "}
        <Switch
          checked={value?.enableAll}
          onChange={(e) =>
            setValue({
              ...value,
              enableAll: e.target.checked,
              enableMotorCurrent: false,
              enableMotorResistance: false,
              enableMotorInsulation: false,
              enableMotorEarthing: false,
              enableMotorVibrationDE: false,
              enableMotorVibrationNDE: false,
            })
          }
        />
      </Typography>

      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.enableMotorCurrent}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorCurrent: e.target.checked,
                  // motorNoLoadCurrent: {
                  //   Rph: "",
                  //   Yph: "",
                  //   Bph: "",
                  // },
                })
              }
            />
          }
          label="Motor No. Load Current (A)"
          disabled={!value?.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="R ph"
              size="small"
              disabled={!value?.enableMotorCurrent}
              value={value?.motorNoLoadCurrent.Rph}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorNoLoadCurrent: {
                    ...value?.motorNoLoadCurrent,
                    Rph: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="Y ph"
              size="small"
              disabled={!value?.enableMotorCurrent}
              value={value?.motorNoLoadCurrent.Yph}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorNoLoadCurrent: {
                    ...value?.motorNoLoadCurrent,
                    Yph: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="B ph"
              size="small"
              disabled={!value?.enableMotorCurrent}
              value={value?.motorNoLoadCurrent.Bph}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorNoLoadCurrent: {
                    ...value?.motorNoLoadCurrent,
                    Bph: e.target.value,
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.enableMotorResistance}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorResistance: e.target.checked,
                  // motorWindingResistance: {
                  //   RY: "",
                  //   YB: "",
                  //   BR: "",
                  // },
                })
              }
            />
          }
          label="Motor Winding Resistance (Ω)"
          disabled={!value?.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="RY"
              size="small"
              disabled={!value?.enableMotorResistance}
              value={value?.motorWindingResistance.RY}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingResistance: {
                    ...value?.motorWindingResistance,
                    RY: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="YB"
              size="small"
              disabled={!value?.enableMotorResistance}
              value={value?.motorWindingResistance.YB}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingResistance: {
                    ...value?.motorWindingResistance,
                    YB: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="BR"
              size="small"
              disabled={!value?.enableMotorResistance}
              value={value?.motorWindingResistance.BR}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingResistance: {
                    ...value?.motorWindingResistance,
                    BR: e.target.value,
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.enableMotorInsulation}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorInsulation: e.target.checked,
                  // motorWindingInsulationResistance: {
                  //   RY: "",
                  //   YB: "",
                  //   BR: "",
                  //   RE: "",
                  //   YE: "",
                  //   BE: "",
                  // },
                })
              }
            />
          }
          label="Motor Winding Insulation Resistance (Ω)"
          disabled={!value?.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="RY"
              size="small"
              disabled={!value?.enableMotorInsulation}
              value={value?.motorWindingInsulationResistance.RY}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingInsulationResistance: {
                    ...value?.motorWindingInsulationResistance,
                    RY: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="YB"
              size="small"
              disabled={!value?.enableMotorInsulation}
              value={value?.motorWindingInsulationResistance.YB}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingInsulationResistance: {
                    ...value?.motorWindingInsulationResistance,
                    YB: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="BR"
              size="small"
              disabled={!value?.enableMotorInsulation}
              value={value?.motorWindingInsulationResistance.BR}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingInsulationResistance: {
                    ...value?.motorWindingInsulationResistance,
                    BR: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}></Grid>

          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="RE"
              size="small"
              disabled={!value?.enableMotorInsulation}
              value={value?.motorWindingInsulationResistance.RE}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingInsulationResistance: {
                    ...value?.motorWindingInsulationResistance,
                    RE: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="YE"
              size="small"
              disabled={!value?.enableMotorInsulation}
              value={value?.motorWindingInsulationResistance.YE}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingInsulationResistance: {
                    ...value?.motorWindingInsulationResistance,
                    YE: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="BE"
              size="small"
              disabled={!value?.enableMotorInsulation}
              value={value?.motorWindingInsulationResistance.BE}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorWindingInsulationResistance: {
                    ...value?.motorWindingInsulationResistance,
                    BE: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}></Grid>
        </Grid>
      </Grid>

      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.enableMotorEarthing}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorEarthing: e.target.checked,
                  // motorEarthing: {
                  //   typeOfEarthing: "",
                  //   earthingValue1: "",
                  //   earthingValue2: "",
                  // },
                })
              }
            />
          }
          label="Motor Earthing"
          disabled={!value?.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            {/* <TextField
              variant="outlined"
              label="Type"
              size="small"
              disabled={!value?.enableMotorEarthing}
              value={value?.motorEarthing.typeOfEarthing}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorEarthing: {
                    ...value?.motorEarthing,
                    typeOfEarthing: e.target.value,
                  },
                })
              }
            /> */}
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                label="Type"
                disabled={!value?.enableMotorEarthing}
                value={value?.motorEarthing.typeOfEarthing}
                onChange={(e) =>
                  setValue({
                    ...value,
                    motorEarthing: {
                      ...value?.motorEarthing,
                      typeOfEarthing: e.target.value,
                    },
                  })
                }
              >
                {["Wire", "Strip"]?.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="Value 1"
              size="small"
              disabled={!value?.enableMotorEarthing}
              value={value?.motorEarthing.earthingValue1}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorEarthing: {
                    ...value?.motorEarthing,
                    earthingValue1: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="Value 2"
              size="small"
              disabled={!value?.enableMotorEarthing}
              value={value?.motorEarthing.earthingValue2}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorEarthing: {
                    ...value?.motorEarthing,
                    earthingValue2: e.target.value,
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.enableMotorVibrationDE}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorVibrationDE: e.target.checked,
                  // motorVibrationDE: { dBm: "", dBc: "", H: "", V: "", A: "" },
                })
              }
            />
          }
          label="Motor Vibration - DE"
          disabled={!value?.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="dBm"
              size="small"
              disabled={!value?.enableMotorVibrationDE}
              value={value?.motorVibrationDE.dBm}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value?.motorVibrationDE,
                    dBm: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="dBc"
              size="small"
              disabled={!value?.enableMotorVibrationDE}
              value={value?.motorVibrationDE.dBc}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value?.motorVibrationDE,
                    dBc: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="H"
              size="small"
              disabled={!value?.enableMotorVibrationDE}
              value={value?.motorVibrationDE.H}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value?.motorVibrationDE,
                    H: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="V"
              size="small"
              disabled={!value?.enableMotorVibrationDE}
              value={value?.motorVibrationDE.V}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value?.motorVibrationDE,
                    V: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="A"
              size="small"
              disabled={!value?.enableMotorVibrationDE}
              value={value?.motorVibrationDE.A}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value?.motorVibrationDE,
                    A: e.target.value,
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.enableMotorVibrationNDE}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorVibrationNDE: e.target.checked,
                  // motorVibrationNDE: { dBm: "", dBc: "", H: "", V: "", A: "" },
                })
              }
            />
          }
          label="Motor Vibration - NDE"
          disabled={!value?.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="dBm"
              size="small"
              disabled={!value?.enableMotorVibrationNDE}
              value={value?.motorVibrationNDE.dBm}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value?.motorVibrationNDE,
                    dBm: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="dBc"
              size="small"
              disabled={!value?.enableMotorVibrationNDE}
              value={value?.motorVibrationNDE.dBc}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value?.motorVibrationNDE,
                    dBc: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="H"
              size="small"
              disabled={!value?.enableMotorVibrationNDE}
              value={value?.motorVibrationNDE.H}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value?.motorVibrationNDE,
                    H: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="V"
              size="small"
              disabled={!value?.enableMotorVibrationNDE}
              value={value?.motorVibrationNDE.V}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value?.motorVibrationNDE,
                    V: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="A"
              size="small"
              disabled={!value?.enableMotorVibrationNDE}
              value={value?.motorVibrationNDE.A}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value?.motorVibrationNDE,
                    A: e.target.value,
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Action({ value, setValue }) {
  return (
    <Grid
      marginBottom={2}
      sx={{
        borderBottom: `1px solid ${GREY}`,
        width: "100%",
      }}
    >
      <Typography variant="h4" color="primary">
        4. Action
      </Typography>

      <Grid
        container
        sx={{
          width: "100%",
        }}
      >
        <Grid item xs={6} padding={1} fullWidth>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Action Taken</InputLabel>
            <Select
              label="Action Taken"
              value={value?.actionTaken}
              onChange={(e) =>
                setValue({ ...value, actionTaken: e.target.value })
              }
            >
              {[
                "Informe to SIC",
                "Addressed process abnormality",
                "Component/Part replaced",
              ]?.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
            variant="outlined"
            label="Action Taken"
            value={value?.actionTaken}
            onChange={(e) =>
              setValue({ ...value, actionTaken: e.target.value })
            }
            size="small"
          /> */}
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="Action Date"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={value?.actionDate}
            onChange={(e) => setValue({ ...value, actionDate: e.target.value })}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function Remarks({ value, setValue }) {
  return (
    <Grid
      marginBottom={2}
      sx={{
        borderBottom: `1px solid ${GREY}`,
        width: "100%",
      }}
    >
      <Typography variant="h4" color="primary">
        5. Remarks
      </Typography>

      <Grid
        container
        sx={{
          width: "100%",
        }}
      >
        <Grid item xs={12} padding={1} fullWidth>
          <TextField
            variant="outlined"
            fullWidth
            label="Enter Remarks Here"
            size="medium"
            multiline
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
