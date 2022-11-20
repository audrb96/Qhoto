import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  quest: {},
};
const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setQuest(state, action) {
      state.quest = action.payload.quest;
    },
  },
  extraReducers: builder => {},
});

export default questSlice;
