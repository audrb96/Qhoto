import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AllFeed from './AllFeed';
import SelectedFeed from './SelectedFeed';
import QhotoHeader from '../components/QhotoHeader';
import FriendsFeed from './feed/FriendsFeed';
import OtherPage from './OtherPage';
import FindFriend from './FindFriend';
import FriendList from './FriendList';
import ContactsPage from './ContactsPage';
import QhotoLevel from './mypage/QhotoLevel';
import QhotoLog from './mypage/QhotoLog';
import LevelInfo from '../components/mypage/LevelInfo';

const FriendListStack = createStackNavigator();
function FriendListStackScreen() {
  return (
    <FriendListStack.Navigator>
      <FriendListStack.Screen
        name="FriendList"
        component={FriendList}
        options={{
          headerShown: false,
        }}
      />
      <FriendListStack.Screen
        name="FindFriend"
        component={FindFriend}
        options={{
          headerShown: false,
        }}
      />
      <FriendListStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          headerShown: false,
        }}
      />
      <FriendListStack.Screen
        name="ContactsPage"
        component={ContactsPage}
        options={{headerShown: false}}
      />
      <FriendListStack.Screen
        name="QhotoLevel"
        component={QhotoLevel}
        options={{headerShown: false}}
      />
      <FriendListStack.Screen
        name="QhotoLog"
        component={QhotoLog}
        options={{
          header: () => <QhotoHeader leftIcon={false} rightIcon={false} />,
        }}
      />
      <FriendListStack.Screen
        name="LevelInfo"
        component={LevelInfo}
        options={{headerShown: false}}
      />
    </FriendListStack.Navigator>
  );
}

export default FriendListStackScreen;
