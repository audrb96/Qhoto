import * as React from 'react';
import {useSelector} from 'react-redux';
import {View, Image} from 'react-native';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import MyQuest from './src/pages/MyQuest';
import MyPage from './src/pages/MyPage';
import FriendsFeed from './src/pages/FriendsFeed';
import AllFeed from './src/pages/AllFeed';
import FindFriend from './src/pages/FindFriend';
import QhotoLevel from './src/pages/QhotoLevel';
import {RootState} from './src/store/reducer';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// https://oblador.github.io/react-native-vector-icons/

import {HEADER_LOGO} from './src/image';

export type LoggedInParamList = {
  FriendsFeed: undefined;
  AllFeed: undefined;
  MyQuest: undefined;
  Settings: undefined;
  FindFriend: undefined;
  Delivery: undefined;
  MyPage: undefined;
  Complete: {orderId: string};
  QhotoLevel: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const appTheme = DefaultTheme;
appTheme.colors.background = 'white';

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationContainer theme={appTheme}>
        {isLoggedIn ? (
          <Tab.Navigator
            initialRouteName="MyQuest"
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color}) => {
                let iconName = '';
                let size = 25;

                if (route.name === 'MyQuest') {
                  iconName = 'exclamation-circle';
                  size = 30;
                } else if (route.name === 'FriendFeed') {
                  iconName = 'house-user';
                } else if (route.name === 'AllFeed') {
                  iconName = 'search';
                } else if (route.name === 'FindFriend') {
                  iconName = 'users';
                } else if (route.name === 'MyPage') {
                  iconName = 'user-circle';
                  size = 28;
                }

                // You can return any component that you like here!
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
              tabBarStyle: {
                height: 70,
                backgroundColor: 'white',
                borderTopWidth: 2,
                paddingTop: 5,
                paddingBottom: 10,
              },
              tabBarLabelStyle: {fontFamily: 'Happiness-Sans-Regular'},
              tabBarActiveTintColor: '#4B179F',
              tabBarInactiveTintColor: 'gray',
              headerShown: true,
              header: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      resizeMode: 'contain',
                      marginTop: 15,
                    }}
                    source={HEADER_LOGO}
                  />
                </View>
              ),
            })}>
            <Tab.Screen
              name="FriendFeed"
              component={FriendsFeed}
              options={{
                title: '친구 피드',
              }}
            />
            <Tab.Screen
              name="AllFeed"
              component={AllFeed}
              options={{
                title: '전체 피드',
              }}
            />
            <Tab.Screen
              name="MyQuest"
              component={MyQuest}
              options={{
                title: '퀘스트',
              }}
            />
            <Tab.Screen
              name="FindFriend"
              component={FindFriend}
              options={{
                title: '친구 찾기',
              }}
            />
            <Tab.Screen
              name="MyPage"
              component={MyPage}
              options={{
                title: '마이페이지',
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
    </GestureHandlerRootView>
  );
}

export default AppInner;
