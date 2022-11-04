import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from './MyPage';
import QhotoLevel from './QhotoLevel';
import QhotoHeader from '../../components/QhotoHeader';
import EditMyProfile from './EditMyProfile';

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
        options={{header: () => <QhotoHeader leftIcon={false} />}}
      />
      <MyPageStack.Screen
        name="EditMyProfile"
        component={EditMyProfile}
        options={{header: () => <QhotoHeader leftIcon={false} />}}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageStackScreen;
