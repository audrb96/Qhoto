import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nickname: '',
  email: '',
  joinDate: '',
  phone: '',
  profileOpen: true,
  description: '',
  userImage: '',
  contactAgreeDate: '',
  expGrade: '',
  totalExp: 0,
  name: '',
  userPoint: '',
  userDailyState: false,
  userWeeklyState: false,
  userMonthlyState: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.nickname = action.payload.nickname;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.joinDate = action.payload.joinDate;
      state.phone = action.payload.phone;
      state.profileOpen = action.payload.profileOpen;
      state.description = action.payload.description;
      state.userImage = action.payload.userImage;
      state.contactAgreeDate = action.payload.contactAgreeDate;
      state.expGrade = action.payload.expGrade;
      state.totalExp = action.payload.totalExp;
      state.name = action.payload.name;
    },
    setQuestState(state, action) {
      state.userDailyState = action.payload.userDailyState;
      state.userWeeklyState = action.payload.userWeeklyState;
      state.userMonthlyState = action.payload.userMonthlyState;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
