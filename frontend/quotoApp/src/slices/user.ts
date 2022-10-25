import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  email: '',
  userName: '',
  userImage: '',
  nickname: '',
  profileOpen: '',
  loggedIn: true,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userImage = action.payload.userImage;
      state.nickname = action.payload.nickname;
      state.profileOpen = action.payload.profileOpen;
      state.loggedIn = action.payload.loggedIn;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;