import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import QhotoHeader from '../../components/QhotoHeader';
import FriendsFeed from './FriendsFeed';
import CommentPage from './CommentPage';
import OtherPage from './../OtherPage';
import LevelInfo from '../../components/mypage/LevelInfo';
import QhotoLevel from '../mypage/QhotoLevel';
import QhotoLog from '../mypage/QhotoLog';
import MyPage from '../mypage/MyPage';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const FriendsFeedStack = createStackNavigator();

function FriendsFeedStackScreen() {
  return (
    <FriendsFeedStack.Navigator screenOptions={TransitionScreenOptions}>
      <FriendsFeedStack.Screen
        name="FriendsFeed"
        component={FriendsFeed}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
      <FriendsFeedStack.Screen
        name="CommentPage"
        component={CommentPage}
        options={{
          title: '댓글',
          headerTitleStyle: {fontFamily: 'esamanru-Medium'},
        }}
      />
      <FriendsFeedStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          headerShown: false,
        }}
      />
      <FriendsFeedStack.Screen
        name="LevelInfo"
        component={LevelInfo}
        options={{headerShown: false}}
      />
      <FriendsFeedStack.Screen
        name="QhotoLevel"
        component={QhotoLevel}
        options={{headerShown: false}}
      />
      <FriendsFeedStack.Screen
        name="QhotoLog"
        component={QhotoLog}
        options={{
          header: () => <QhotoHeader leftIcon={false} rightIcon={false} />,
        }}
      />
      {/* <FriendsFeedStack.Screen
        name="MyPage"
        component={MyPage}
        options={{headerShown: false}}
      /> */}
    </FriendsFeedStack.Navigator>
  );
}

export default FriendsFeedStackScreen;
