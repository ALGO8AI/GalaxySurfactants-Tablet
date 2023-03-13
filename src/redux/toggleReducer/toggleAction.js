export const openToast = (msg, severity) => (dispatch) => {
  dispatch({
    type: "OPEN_TOAST",
    payload: {
      message: msg,
      severity: severity,
    },
  });
};
