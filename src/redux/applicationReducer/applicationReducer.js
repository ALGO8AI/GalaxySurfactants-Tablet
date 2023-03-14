const initialState = {
  sectionList: [],
  selectedMonth: "",
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SECTION_LIST":
      return {
        ...state,
        sectionList: action.payload,
      };
    case "SET_SELECTED_MONTH":
      return {
        ...state,
        selectedMonth: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
