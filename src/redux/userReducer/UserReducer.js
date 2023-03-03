const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
