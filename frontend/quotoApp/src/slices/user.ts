import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userId: '',
  email: '',
  phone: '',
  userName: '',
  joinDate: '',
  userImage: '',
  userPoint: '',
  nickname: '',
  profileOpen: true,
  // loggedIn: true,
  loggedIn: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.userName = action.payload.userName;
      state.joinDate = action.payload.joinDate;
      state.userImage = action.payload.userImage;
      state.userPoint = action.payload.userPoint;
      state.nickname = action.payload.nickname;
      state.profileOpen = action.payload.profileOpen;
      state.loggedIn = action.payload.loggedIn;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
