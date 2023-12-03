import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = fakeData;

export const fetchLetters = createAsyncThunk(
  "letters/fetchLetters",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/letters");
      return response.data;
    } catch (error) {
      console.error("error fetching letters:", error);
      throw error;
    }
  }
);

const letterSlice = createSlice({
  name: "letters",
  initialState: [],
  reducers: {
    addLetter: (state, action) => {
      return [action.payload, ...state];
    },
    deleteLetter: (state, action) => {
      return state.filter((letter) => letter.id !== action.payload);
    },
    editLetter: (state, action) => {
      return state.map((letter) => {
        if (letter.id === action.payload.id) {
          return { ...letter, content: action.payload.editingText };
        }
        return letter;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLetters.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default letterSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = letterSlice.actions;
