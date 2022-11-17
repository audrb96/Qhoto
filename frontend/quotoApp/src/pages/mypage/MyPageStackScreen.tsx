import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MyPage from './MyPage';
import QhotoLevel from './QhotoLevel';
import QhotoHeader from '../../components/QhotoHeader';
import EditMyProfile from './EditMyProfile';
import QhotoLog from './QhotoLog';
import MyLoader from './../../components/MyLoader';

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
        name="MyLoader"
        component={MyLoader}
        options={{headerShown: false}}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageStackScreen;
