import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from './MyPage';
import QhotoLevel from './QhotoLevel';
import QuestLog from './QuestLog';
import QhotoHeader from '../components/QhotoHeader';

const MyPageStack = createStackNavigator();
function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPage"
        component={MyPage}
        options={{header: () => <QhotoHeader leftIcon={false}></QhotoHeader>}}
      />
      <MyPageStack.Screen
        name="QhotoLevel"
        component={QhotoLevel}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="QuestLog"
        component={QuestLog}
        options={{header: () => <QhotoHeader leftIcon={false}></QhotoHeader>}}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageStackScreen;
