import {combineReducers} from 'redux';
import userSlice from '../slices/user';
import feedSlice from '../slices/quest';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  quest: feedSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
