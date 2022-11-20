import * as React from 'react';

import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';

import SignIn from './src/pages/SignIn';
import MyQuest from './src/pages/MyQuest';
import AllFeedStackScreen from './src/pages/feed/AllFeedStackScreen';
import FindFriend from './src/pages/FindFriend';
import MyPageStackScreen from './src/pages/mypage/MyPageStackScreen';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// https://oblador.github.io/react-native-vector-icons/
import {HEADER_LOGO} from './src/image';
import QhotoHeader from './src/components/QhotoHeader';
import SignUp from './src/pages/SignUp';
import LocationAgree from './src/pages/LocationAgree';
import StateAgree from './src/pages/StateAgree';
import FriendsFeedStackScreen from './src/pages/feed/FriendsFeedStackScreen';
import FriendListStackScreen from './src/pages/FriendListStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfoApi} from './src/api/mypage';
import {useAppDispatch} from './src/store';
import userSlice from './src/slices/user';
import {RootState} from './src/store/reducer';

export type LoggedInParamList = {
  FriendsFeed: undefined;
  AllFeedStackScreen: undefined;
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
  LocationAgree: undefined;
  StateAgree: undefined;
};

const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const appTheme = DefaultTheme;
appTheme.colors.background = 'white';

function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.email);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          return;
        }

        await getUserInfoApi(
          (response: any) => {
            let {
              nickname,
              email,
              joinDate,
              phone,
              profileOpen,
              description,
              userImage,
              contactAgreeDate,
              expGrade,
              totalExp,
              name,
            } = response.data;

            dispatch(
              userSlice.actions.setUser({
                nickname: nickname,
                email: email,
                joinDate: joinDate,
                phone: phone,
                profileOpen: profileOpen,
                description: description,
                userImage: userImage,
                contactAgreeDate: contactAgreeDate,
                expGrade: expGrade,
                totalExp: totalExp,
                name: name,
              }),
            );
          },
          (err: any) => {
            console.log(err.response);
          },
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    };

    getTokenAndRefresh();
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{flex: 1, maxWidth: 420}}>
      {isReady ? (
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
                  } else if (route.name === 'FriendsFeedStackScreen') {
                    iconName = 'house-user';
                  } else if (route.name === 'AllFeedStackScreen') {
                    iconName = 'search';
                  } else if (route.name === 'FriendListStackScreen') {
                    iconName = 'users';
                  } else if (route.name === 'MyPageStackScreen') {
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
                tabBarHideOnKeyboard: true,
              })}>
              <Tab.Screen
                name="FriendsFeedStackScreen"
                component={FriendsFeedStackScreen}
                options={{
                  title: '친구 피드',
                  headerShown: false,
                  unmountOnBlur: true,
                }}
              />
              <Tab.Screen
                name="AllFeedStackScreen"
                component={AllFeedStackScreen}
                options={{
                  title: '전체 피드',
                  headerShown: false,
                  unmountOnBlur: true,
                }}
              />
              <Tab.Screen
                name="MyQuest"
                component={MyQuest}
                options={{
                  title: '퀘스트',
                  header: () => <QhotoHeader leftIcon={false} />,
                  unmountOnBlur: true,
                }}
              />
              <Tab.Screen
                name="FriendListStackScreen"
                component={FriendListStackScreen}
                options={{
                  title: '친구 목록',
                  headerShown: false,
                  unmountOnBlur: true,
                }}
              />
              <Tab.Screen
                name="MyPageStackScreen"
                component={MyPageStackScreen}
                options={{
                  title: '마이페이지',
                  header: () => <QhotoHeader leftIcon={false} />,
                  headerShown: false,
                  unmountOnBlur: true,
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{title: '로그인', headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{title: '회원가입', headerShown: false}}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      ) : null}
    </GestureHandlerRootView>
  );
}

export default AppInner;
