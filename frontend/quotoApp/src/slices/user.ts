import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user_id: '',
  email: '',
  user_name: '',
  logged_in: true,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.user_name = action.payload.user_name;
      state.logged_in = action.payload.logged_in;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;