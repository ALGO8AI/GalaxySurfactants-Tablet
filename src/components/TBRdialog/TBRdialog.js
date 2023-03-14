/* eslint-disable no-unused-vars */
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
import React, { useEffect } from "react";
import { GREY } from "../../constant/color";

function TBRdialog({ open, handleClose }) {
  const [lubricationDetails, setLubricationDetails] = React.useState({
    lastLubricationDate: "",
    lubricationIntervalHrs: "",
    actualRunningFromLastLubricationHrs: "",
    lubricationDueDate: "",
    lubricant: "",
    deQuantity: "",
    ndeQuantity: "",
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
          <Typography variant="h2">TBR</Typography>
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
          <MotorLubricationDetails
            value={lubricationDetails}
            setValue={setLubricationDetails}
          />

          {/* ACTION FORM */}
          <Action value={action} setValue={setAction} />

          {/* REMARKS FORM */}
          <Remarks value={remarks} setValue={setRemarks} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log({
              lubricationDetails,
              action,
              remarks,
            });
          }}
          autoFocus
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TBRdialog;

function MotorLubricationDetails({ value, setValue }) {
  return (
    <Grid
      marginBottom={2}
      sx={{
        borderBottom: `1px solid ${GREY}`,
        width: "100%",
      }}
    >
      <Typography variant="h4" color="primary" marginBottom={1}>
        1. Motor Lubrication Details
      </Typography>
      <Grid
        container
        sx={{
          width: "100%",
        }}
      >
        <Grid item xs={12} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Lubrication interval hours at 40°C"
            size="small"
            value={value.lubricationIntervalHrs}
            onChange={(e) =>
              setValue({
                ...value,
                lubricationIntervalHrs: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Actual running hour from last lubrication"
            size="small"
            value={value.actualRunningFromLastLubricationHrs}
            onChange={(e) =>
              setValue({
                ...value,
                actualRunningFromLastLubricationHrs: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={6} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Last lubrication date"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={value.lastLubricationDate}
            onChange={(e) =>
              setValue({ ...value, lastLubricationDate: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Lubrication due date"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={value.lubricationDueDate}
            onChange={(e) =>
              setValue({ ...value, lubricationDueDate: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={4} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Lubricant"
            size="small"
            value={value.lubricant}
            onChange={(e) => setValue({ ...value, lubricant: e.target.value })}
          />
        </Grid>

        <Grid item xs={4} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="DE Quantity"
            size="small"
            value={value.deQuantity}
            onChange={(e) => setValue({ ...value, deQuantity: e.target.value })}
          />
        </Grid>

        <Grid item xs={4} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="NDE Quantity"
            size="small"
            value={value.ndeQuantity}
            onChange={(e) =>
              setValue({ ...value, ndeQuantity: e.target.value })
            }
          />
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
        2. Action
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
        3. Remarks
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
