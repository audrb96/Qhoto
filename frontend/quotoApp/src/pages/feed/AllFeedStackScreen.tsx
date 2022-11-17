import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AllFeed from './AllFeed';
import SelectedFeed from './SelectedFeed';
import QhotoHeader from '../../components/QhotoHeader';
import OtherPage from './../OtherPage';
import CommentPage from './CommentPage';

const AllFeedStack = createStackNavigator();
function AllFeedStackScreen() {
  return (
    <AllFeedStack.Navigator>
      <AllFeedStack.Screen
        name="AllFeed"
        component={AllFeed}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
      <AllFeedStack.Screen
        name="SelectedFeed"
        component={SelectedFeed}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
      <AllFeedStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          header: () => <QhotoHeader leftIcon={false} />,
        }}
      />
    </AllFeedStack.Navigator>
  );
}

export default AllFeedStackScreen;
