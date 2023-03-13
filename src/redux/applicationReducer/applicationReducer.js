const initialState = {
  sectionList: [],
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SECTION_LIST":
      return {
        ...state,
        sectionList: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
