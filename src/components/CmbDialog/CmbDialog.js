import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { GREY } from "../../constant/color";

function CmbDialog({ open, handleClose }) {
  const [healthCheckup, setHealthCheckup] = React.useState({
    rPh: "",
    yPh: "",
    bPh: "",
    motorTemp: "",
  });

  const [thermography, setThermography] = React.useState({
    temp: "",
  });

  const [annualMaintenance, setAnnualMaintenance] = React.useState({
    enableAll: false,
    enableMotorCurrent: false,
    motorCurrent: {
      rPh: "",
      yPh: "",
      bPh: "",
    },
    enableMotorResistance: false,
    motorResistance: {
      ry: "",
      yb: "",
      br: "",
    },
    enableMotorInsulation: false,
    motorInsulation: {
      ry: "",
      yb: "",
      br: "",
      re: "",
      ye: "",
      be: "",
    },
    enableMotorEarthing: false,
    motorEarthing: {
      type: "",
      value1: "",
      value2: "",
    },
    enableMotorVibrationDE: false,
    motorVibrationDE: {
      dbm: "",
      dbc: "",
      h: "",
      v: "",
      a: "",
    },
    enableMotorVibrationNDE: false,
    motorVibrationNDE: {
      dbm: "",
      dbc: "",
      h: "",
      v: "",
      a: "",
    },
  });

  const [action, setAction] = React.useState({
    action: "",
    actionDate: "",
  });

  const [remarks, setRemarks] = React.useState("");

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
          <Typography variant="h2">CBM</Typography>
        </DialogContentText>
        <Grid
          container
          sx={{
            padding: 1,
          }}
        >
          <Typography variant="h4" color="secondary" marginBottom={1}>
            Equipment : 63 bagging online turner belt conveyor
          </Typography>

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
          <Action value={action} setValue={setAction} />

          {/* REMARKS FORM */}
          <Remarks value={remarks} setValue={setRemarks} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Disagree
        </Button>
        <Button
          onClick={() => {
            console.log({
              healthCheckup,
              thermography,
              annualMaintenance,
              action,
              remarks,
            });
          }}
          autoFocus
          variant="contained"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CmbDialog;

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
            value={value.rPh}
            onChange={(e) =>
              setValue({
                ...value,
                rPh: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="Y ph"
            size="small"
            value={value.yPh}
            onChange={(e) =>
              setValue({
                ...value,
                yPh: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="B ph"
            size="small"
            value={value.bPh}
            onChange={(e) =>
              setValue({
                ...value,
                bPh: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={3} padding={1}>
          <TextField
            variant="outlined"
            label="Motor Temp. (℃)"
            size="small"
            value={value.motorTemp}
            onChange={(e) =>
              setValue({
                ...value,
                motorTemp: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function Thermography({ value, setValue }) {
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
            value={value.temp}
            onChange={(e) =>
              setValue({
                ...value,
                temp: e.target.value,
              })
            }
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
          checked={value.enableAll}
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
              checked={value.enableMotorCurrent}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorCurrent: e.target.checked,
                  motorCurrent: {
                    rPh: "",
                    yPh: "",
                    bPh: "",
                  },
                })
              }
            />
          }
          label="Motor No. Load Current (A)"
          disabled={!value.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="R ph"
              size="small"
              disabled={!value.enableMotorCurrent}
              value={value.motorCurrent.rPh}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorCurrent: {
                    ...value.motorCurrent,
                    rPh: e.target.value,
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
              disabled={!value.enableMotorCurrent}
              value={value.motorCurrent.yPh}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorCurrent: {
                    ...value.motorCurrent,
                    yPh: e.target.value,
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
              disabled={!value.enableMotorCurrent}
              value={value.motorCurrent.bPh}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorCurrent: {
                    ...value.motorCurrent,
                    bPh: e.target.value,
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
              checked={value.enableMotorResistance}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorResistance: e.target.checked,
                  motorResistance: {
                    ry: "",
                    yb: "",
                    br: "",
                  },
                })
              }
            />
          }
          label="Motor Winding Resistance (Ω)"
          disabled={!value.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="RY"
              size="small"
              disabled={!value.enableMotorResistance}
              value={value.motorResistance.ry}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorResistance: {
                    ...value.motorResistance,
                    ry: e.target.value,
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
              disabled={!value.enableMotorResistance}
              value={value.motorResistance.yb}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorResistance: {
                    ...value.motorResistance,
                    yb: e.target.value,
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
              disabled={!value.enableMotorResistance}
              value={value.motorResistance.br}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorResistance: {
                    ...value.motorResistance,
                    br: e.target.value,
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
              checked={value.enableMotorInsulation}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorInsulation: e.target.checked,
                  motorInsulation: {
                    ry: "",
                    yb: "",
                    br: "",
                    re: "",
                    ye: "",
                    be: "",
                  },
                })
              }
            />
          }
          label="Motor Winding Insulation Resistance (Ω)"
          disabled={!value.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="RY"
              size="small"
              disabled={!value.enableMotorInsulation}
              value={value.motorInsulation.ry}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorInsulation: {
                    ...value.motorInsulation,
                    ry: e.target.value,
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
              disabled={!value.enableMotorInsulation}
              value={value.motorInsulation.yb}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorInsulation: {
                    ...value.motorInsulation,
                    yb: e.target.value,
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
              disabled={!value.enableMotorInsulation}
              value={value.motorInsulation.br}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorInsulation: {
                    ...value.motorInsulation,
                    br: e.target.value,
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
              disabled={!value.enableMotorInsulation}
              value={value.motorInsulation.re}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorInsulation: {
                    ...value.motorInsulation,
                    re: e.target.value,
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
              disabled={!value.enableMotorInsulation}
              value={value.motorInsulation.ye}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorInsulation: {
                    ...value.motorInsulation,
                    ye: e.target.value,
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
              disabled={!value.enableMotorInsulation}
              value={value.motorInsulation.be}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorInsulation: {
                    ...value.motorInsulation,
                    be: e.target.value,
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
              checked={value.enableMotorEarthing}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorEarthing: e.target.checked,
                  motorEarthing: { type: "", value1: "", value2: "" },
                })
              }
            />
          }
          label="Motor Earthing"
          disabled={!value.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="Type"
              size="small"
              disabled={!value.enableMotorEarthing}
              value={value.motorEarthing.type}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorEarthing: {
                    ...value.motorEarthing,
                    type: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="Value 1"
              size="small"
              disabled={!value.enableMotorEarthing}
              value={value.motorEarthing.value1}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorEarthing: {
                    ...value.motorEarthing,
                    value1: e.target.value,
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
              disabled={!value.enableMotorEarthing}
              value={value.motorEarthing.value2}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorEarthing: {
                    ...value.motorEarthing,
                    value2: e.target.value,
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
              checked={value.enableMotorVibrationDE}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorVibrationDE: e.target.checked,
                  motorVibrationDE: { dbm: "", dbc: "", h: "", v: "", a: "" },
                })
              }
            />
          }
          label="Motor Vibration - DE"
          disabled={!value.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="dBm"
              size="small"
              disabled={!value.enableMotorVibrationDE}
              value={value.motorVibrationDE.dbm}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value.motorVibrationDE,
                    dbm: e.target.value,
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
              disabled={!value.enableMotorVibrationDE}
              value={value.motorVibrationDE.dbc}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value.motorVibrationDE,
                    dbc: e.target.value,
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
              disabled={!value.enableMotorVibrationDE}
              value={value.motorVibrationDE.h}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value.motorVibrationDE,
                    h: e.target.value,
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
              disabled={!value.enableMotorVibrationDE}
              value={value.motorVibrationDE.v}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value.motorVibrationDE,
                    v: e.target.value,
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
              disabled={!value.enableMotorVibrationDE}
              value={value.motorVibrationDE.a}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationDE: {
                    ...value.motorVibrationDE,
                    a: e.target.value,
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
              checked={value.enableMotorVibrationNDE}
              onChange={(e) =>
                setValue({
                  ...value,
                  enableMotorVibrationNDE: e.target.checked,
                  motorVibrationNDE: { dbm: "", dbc: "", h: "", v: "", a: "" },
                })
              }
            />
          }
          label="Motor Vibration - NDE"
          disabled={!value.enableAll}
        />

        <Grid container>
          <Grid item xs={3} padding={1}>
            <TextField
              variant="outlined"
              label="dBm"
              size="small"
              disabled={!value.enableMotorVibrationNDE}
              value={value.motorVibrationNDE.dbm}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value.motorVibrationNDE,
                    dbm: e.target.value,
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
              disabled={!value.enableMotorVibrationNDE}
              value={value.motorVibrationNDE.dbc}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value.motorVibrationNDE,
                    dbc: e.target.value,
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
              disabled={!value.enableMotorVibrationNDE}
              value={value.motorVibrationNDE.h}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value.motorVibrationNDE,
                    h: e.target.value,
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
              disabled={!value.enableMotorVibrationNDE}
              value={value.motorVibrationNDE.v}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value.motorVibrationNDE,
                    v: e.target.value,
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
              disabled={!value.enableMotorVibrationNDE}
              value={value.motorVibrationNDE.a}
              onChange={(e) =>
                setValue({
                  ...value,
                  motorVibrationNDE: {
                    ...value.motorVibrationNDE,
                    a: e.target.value,
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
              value={value.action}
              onChange={(e) => setValue({ ...value, action: e.target.value })}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
            value={value.actionDate}
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
