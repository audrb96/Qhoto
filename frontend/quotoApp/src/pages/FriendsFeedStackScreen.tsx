import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AllFeed from './AllFeed';
import SelectedFeed from './SelectedFeed';
import QhotoHeader from '../components/QhotoHeader';
import FriendsFeed from './feed/FriendsFeed';
import OtherPage from './OtherPage';

const FriendsFeedStack = createStackNavigator();
function FriendsFeedStackScreen() {
  return (
    <FriendsFeedStack.Navigator>
      <FriendsFeedStack.Screen
        name="FriendsFeed"
        component={FriendsFeed}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
      <FriendsFeedStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
    </FriendsFeedStack.Navigator>
  );
}

export default FriendsFeedStackScreen;
