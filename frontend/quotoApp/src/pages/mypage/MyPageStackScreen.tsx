import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from './MyPage';
import QhotoLevel from './QhotoLevel';
import QhotoHeader from '../../components/QhotoHeader';
import EditMyProfile from './EditMyProfile';
import QhotoLog from './QhotoLog';

const MyPageStack = createStackNavigator();
function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPage"
        component={MyPage}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="QhotoLevel"
        component={QhotoLevel}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="QuestLog"
        component={QhotoLog}
        options={{
          header: () => <QhotoHeader leftIcon={false} rightIcon={false} />,
        }}
      />
      <MyPageStack.Screen
        name="EditMyProfile"
        component={EditMyProfile}
        options={{headerShown: false}}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageStackScreen;
