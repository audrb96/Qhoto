import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import MyQuest from './src/pages/MyQuest';
import MyPage from './src/pages/MyPage';
import FriendsFeed from './src/pages/FriendsFeed';
import AllFeed from './src/pages/AllFeed';
import FindFriend from './src/pages/FindFriend';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// https://oblador.github.io/react-native-vector-icons/

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

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={() => ({
            tabBarStyle: {
              height: 70,
              backgroundColor: 'white',
              borderTopWidth: 2,
            },
          })}>
          <Tab.Screen
            name="FriendsFeed"
            component={FriendsFeed}
            options={{
              title: '친구 피드 목록', 
              tabBarIcon: () => <Ionicons name="home-outline" size={20} />,
            }}
          />
          <Tab.Screen
            name="AllFeed"
            component={AllFeed}
            options={{
              title: '모든 피드 목록',
              tabBarIcon: () => <Ionicons name="globe-outline" size={20} />,
          }}
          />
          <Tab.Screen
            name="MyQuest"
            component={MyQuest}
            options={{title: '퀘스트'}}
          />
          <Tab.Screen
            name="FindFriend"
            component={FindFriend}
            options={{
              title: '친구찾기',
              tabBarIcon: () => <Feather name="users" size={20} />,
            }}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{
              title: '내 정보',
              tabBarIcon: () => <Ionicons name="person-circle-outline" size={25} />,
            }}
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
  )
}

export default AppInner;
