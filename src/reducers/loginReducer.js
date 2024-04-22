// loginReducer.js
const initialState = {
  isLoggedIn: false,
  user: {
    email: "",
    password: "",
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "LOGIN":
      return { ...state, isLoggedIn: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
