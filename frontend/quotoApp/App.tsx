import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import MyQuest from './src/pages/MyQuest';
import MyPage from './src/pages/MyPage';
import FriendsFeed from './src/pages/FriendsFeed';
import AllFeed from './src/pages/AllFeed';
import FindFriend from './src/pages/FindFriend';

export type LoggedInParamList = {
  FriendsFeed: undefined;
  AllFeed: undefined;
  MyQuest: undefined;
  Settings: undefined;
  FindFriend: undefined;
  Delivery: undefined;
  MyPage: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="FriendsFeed"
            component={FriendsFeed}
            options={{title: '친구 피드 목록'}}
          />
          <Tab.Screen
            name="AllFeed"
            component={AllFeed}
            options={{title: '모든 피드 목록'}}
          />
          <Tab.Screen
            name="MyQuest"
            component={MyQuest}
            options={{title: '퀘스트'}}
          />
          <Tab.Screen
            name="FindFriend"
            component={FindFriend}
            options={{title: '친구찾기'}}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{title: '내 정보'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
