import {statusCodes} from '@react-native-google-signin/google-signin';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  activeId: '',
  conditions: [],
  duration: [],
};
const userSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed(state, action) {
      state.activeId = action.payload.activeId;
      state.conditions = action.payload.conditions;
      state.duration = action.payload.duration;
    },
    setUser(state, action) {
      // state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
