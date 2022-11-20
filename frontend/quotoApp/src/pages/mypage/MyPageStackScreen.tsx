import React, {useEffect, useCallback} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MyPage from './MyPage';
import QhotoLevel from './QhotoLevel';
import QhotoHeader from '../../components/QhotoHeader';
import EditMyProfile from './EditMyProfile';
import QhotoLog from './QhotoLog';
import MyLoader from './../../components/MyLoader';

import ContactsPage from '../ContactsPage';
import LevelInfo from '../../components/mypage/LevelInfo';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const MyPageStack = createStackNavigator();
function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator screenOptions={TransitionScreenOptions}>
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
        name="QhotoLog"
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
      <MyPageStack.Screen
        name="LevelInfo"
        component={LevelInfo}
        options={{headerShown: false}}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageStackScreen;
