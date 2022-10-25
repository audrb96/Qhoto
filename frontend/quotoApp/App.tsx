import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {useState} from 'react';
// import SignIn from './src/pages/SignIn';
// import SignUp from './src/pages/SignUp';
// import MyQuest from './src/pages/MyQuest';
// import MyPage from './src/pages/MyPage';
// import FriendsFeed from './src/pages/FriendsFeed';
// import AllFeed from './src/pages/AllFeed';
// import FindFriend from './src/pages/FindFriend';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  // const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
