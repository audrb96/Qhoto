import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import QhotoHeader from '../../components/QhotoHeader';
import SwitchToggle from 'react-native-switch-toggle';

function EditMyProfile({navigation, route}) {
  const [editable, setEditable] = useState(false);

  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };

  useEffect(() => {
    console.log('route', route.params.userInfo);
  });

  const userInfo = route.params.userInfo;
  // {
  //   "email": "ygeum2@naver.com",
  //     "joinDate": "2022-11-04",
  //     "nickname": "경훈",
  //     "phone": "010-0000-0000",
  //     "profileOpen": true,
  //     "userImage": "https://k.kakaocdn.net/dn/doKQCZ/btrzzX9e14l/HqJLxmK4MZ9MVUOWB8tpxK/img_640x640.jpg"
  // }

  //Icon
  const leftIcon = (
    <FontAwesome5
      name="angle-left"
      size={30}
      color="#3B28B1"
      onPress={() => navigation.goBack()}
      style={styles.leftIcon}
    />
  );

  const rightIcon = editable ? (
    <TouchableOpacity
      onPress={() => setEditable(false)}
      style={styles.rightIcon}>
      <Text style={{color: 'black'}}>완료</Text>
    </TouchableOpacity>
  ) : (
    <Ionicons
      name="settings-outline"
      size={30}
      color="#3B28B1"
      // onPress={() => setEditable(true)}
      onPress={() => setEditable(true)}
      style={styles.rightIcon} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    />
  );

  return (
    <View>
      <QhotoHeader leftIcon={leftIcon} rightIcon={rightIcon}></QhotoHeader>
      <TextInput editable={false} style={{color: 'black'}}>
        유저 정보 변경 화면
      </TextInput>

      <Text style={{color: 'black'}}>이메일</Text>
      <TextInput editable={false} style={{color: 'black'}}>
        {userInfo.email}
      </TextInput>

      <Text style={{color: 'black'}}>가입일자</Text>
      <TextInput editable={false} style={{color: 'black'}}>
        {userInfo.joinDate}
      </TextInput>

      <Text style={{color: 'black'}}>닉네임</Text>
      <TextInput editable={editable} style={{color: 'black'}}>
        {userInfo.nickname}
      </TextInput>

      <Text style={{color: 'black'}}>전화번호</Text>
      <TextInput editable={editable} style={{color: 'black'}}>
        {userInfo.phone}
      </TextInput>

      <Text style={{color: 'black'}}>프로필공개여부</Text>
      <Text style={{color: 'black'}}>
        {userInfo.profileOpen ? 'true' : 'false'}
      </Text>

      <Text style={{color: 'black'}}>정보제공동의일자</Text>
      <TextInput style={{color: 'black'}}>
        {userInfo.contactAgreeDate}
      </TextInput>

      <SwitchToggle
        switchOn={userInfo.profileOpen}
        onPress={() => setEditable(!userInfo.profileOpen)} // 공개여부 변경함수로 바꿔야함
        circleColorOn={'#3B28B1'} //
        backgroundColorOn={'#937DC2'}
        circleColorOff={'gray'}
        backgroundColorOff={'silver'}
        // duration={2} // 움직이는 속도
        containerStyle={{
          // marginTop: 16,
          width: 100,
          height: 50,
          borderRadius: 25,
          // padding: 5,
        }}
        circleStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
      />
      {/* <Text style={{color: 'black'}}>프로필사진 {userInfo.userImage}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: -10,
    // backgroundColor: 'black',
    // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
  },
  rightIcon: {
    position: 'absolute',
    // padding: 10,
    // width: 40,
    // height: 40,
    // top: -10,
    // left: 20,
    backgroundColor: 'black',
  },
  actionText: {
    color: 'black',
  },
});

export default EditMyProfile;
