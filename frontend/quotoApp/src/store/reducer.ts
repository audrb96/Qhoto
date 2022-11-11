import {combineReducers} from 'redux';
import userSlice from '../slices/user';
import feedSlice from '../slices/feed';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  feed: feedSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
