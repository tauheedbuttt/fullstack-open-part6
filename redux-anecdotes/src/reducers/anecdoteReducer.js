import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { setNotification } from "../reducers/notificationReducer";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id;
      return [...state]
        .map((n) => (n.id !== id ? n : action.payload))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.update(anecdote);
  dispatch(updateAnecdote(updatedAnecdote));
  dispatch(
    setNotification({ message: `you voted '${anecdote.content}'` }, 5000)
  );
};

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  noteSlice.actions;
export default noteSlice.reducer;
