import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const apiUrl = "https://moneyfulpublicpolicy.co.kr";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem("nickname", "avatar", "userId");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    loginSuccess: (state, action) => {
      const { userId, avatar, nickname } = action.payload.user;
      state.isLoggedIn = true;
      state.user = { userId, avatar, nickname };
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, avatar, nickname })
      );
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { userId, avatar, nickname } = action.payload.user;
        state.isLoggedIn = true;
        state.user = { userId, avatar, nickname };
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        console.log("Token check fulfilled. User data:", action.payload);
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(checkToken.rejected, (state) => {
        console.log("Token check rejected.");
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    try {
      const response = await axios.post(
        apiUrl + "/login?expiresIn=3m",
        credentials
      );
      const { accessToken, userId, avatar, nickname } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, avatar, nickname })
      );
      return { user: { userId, avatar, nickname }, accessToken };
    } catch (error) {
      console.error("login failed", error);
      throw error;
    }
  }
);

export const signUpThunk = createAsyncThunk("auth/signUp", async (userData) => {
  const response = await axios.post(apiUrl + "/register", userData);
  return response.data;
});

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, thunkAPI) => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      try {
        const response = await axios.get(apiUrl + "/user", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log("error", error);
        throw error;
      }
    }
    throw new Error("Token Not Found");
  }
);

export const logout = () => async (dispatch) => {
  try {
    await dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
