import { loginThunk, signUpThunk } from "./authSlice";

export const login = (credentials) => async (dispatch) => {
  try {
    await dispatch(loginThunk(credentials));
    const accessToken = localStorage.getItem("accessToken");
    console.log("saveToken", accessToken);
    console.log("로그인");
  } catch (error) {
    console.log("login failed", error);
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    await dispatch(signUpThunk(userData));
    if (response.status === 201) {
      dispatch(signUpThunk(userData));
    } else {
      console.log("sign up failed");
    }
  } catch (error) {
    console.log("sign up failed", error);
  }
};
