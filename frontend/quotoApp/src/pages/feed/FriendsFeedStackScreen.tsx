import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import QhotoHeader from '../../components/QhotoHeader';
import FriendsFeed from './FriendsFeed';
import CommentPage from './CommentPage';

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
        }}
      />
    </FriendsFeedStack.Navigator>
  );
}

export default FriendsFeedStackScreen;
