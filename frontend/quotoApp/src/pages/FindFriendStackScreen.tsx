import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AllFeed from './AllFeed';
import SelectedFeed from './SelectedFeed';
import QhotoHeader from '../components/QhotoHeader';
import FriendsFeed from './feed/FriendsFeed';
import OtherPage from './OtherPage';
import FindFriend from './FindFriend';

const FindFriendStack = createStackNavigator();
function FindFriendStackScreen() {
  return (
    <FindFriendStack.Navigator>
      <FindFriendStack.Screen
        name="FindFriend"
        component={FindFriend}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
      <FindFriendStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
    </FindFriendStack.Navigator>
  );
}

export default FindFriendStackScreen;
