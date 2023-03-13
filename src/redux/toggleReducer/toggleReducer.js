const initialState = {
  openToast: false,
  toastMessage: "",
  toastSeverity: "",
};

const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_TOAST":
      return {
        ...state,
        openToast: true,
        toastMessage: action.payload.message,
        toastSeverity: action.payload.severity,
      };
    case "CLOSE_TOAST":
      return {
        ...state,
        openToast: false,
        toastMessage: "",
        toastSeverity: "",
      };
    default:
      return state;
  }
};

export default toggleReducer;
