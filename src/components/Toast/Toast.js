import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Toast() {
  const { openToast, toastMessage, toastSeverity } = useSelector(
    (state) => state.toggle
  );

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "CLOSE_TOAST",
    });
  };

  return (
    <Snackbar open={openToast} autoHideDuration={2000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={toastSeverity}
        sx={{ width: "100%" }}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
