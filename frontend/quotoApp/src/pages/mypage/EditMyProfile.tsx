import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import QhotoHeader from '../../components/QhotoHeader';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {duplicateTestApi, editMyProfileApi} from '../../api/mypage';
import {ScrollView} from 'react-native-gesture-handler';
import {BackgroundImage} from '@rneui/base';

function EditMyProfile({navigation, route}) {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    console.log('route', route.params.userInfo);
  }, []);

  const editMyProfile = () => {
    editMyProfileApi(
      {
        phone: newPhone,
        name: newName,
        nickname: newNickname,
        profileOpen: newProfileOpen,
        description: newDescription,
      },
      res => {
        console.log('editMyProfileApi - res', res);
      },
      err => {
        console.log('editMyProfileApi - err', err);
        console.log('editMyProfileApi - err', err.response);
      },
    );
  };

  const [newName, setNewName] = useState(route.params.userInfo.name);
  const [newPhone, setNewPhone] = useState(route.params.userInfo.phone);
  const [newNickname, setNewNickname] = useState(
    route.params.userInfo.nickname,
  );
  const [newProfileOpen, setNewProfileOpen] = useState(
    route.params.userInfo.profileOpen,
  );
  const [newDescription, setNewDescription] = useState(
    route.params.userInfo.description,
  );
  // const [newPhone, setNewPhone] = useState(route.params.userInfo.phone);

  let {
    email,
    joinDate,
    nickname,
    phone,
    name,
    profileOpen,
    description,
    userImage,
    contactAgreeDate,
  } = route.params.userInfo;

  const [duplicated, setDuplicated] = useState(false);

  const testNickname = async text => {
    // Todo 유효성 검사
    await setNewNickname(text);

    // 중복검사Api
    await duplicateTestApi(
      text,
      (res: any) => {
        console.log('duplicateTestApi - res', res);
        setDuplicated(res.data); // Boolean
      },
      (err: any) => console.log('duplicateTestApi - err', err),
    );
  };

  let message = '';
  let messageType = 'able';

  // const [message, setMessage] = useState('');
  // const [messageType, setMessageType] = useState('able');
  if (!editable) {
    message = '';
    // setMessage('');
  } else if (newNickname === nickname) {
    message = '사용가능합니다';
    messageType = 'able';
    // setMessage('사용가능합니다');
    // setMessageType('able');
  } else if (!duplicated) {
    message = '사용가능합니다';
    messageType = 'able';
    // setMessage('사용가능합니다');
    // setMessageType('able');
  } else if (duplicated) {
    message = '중복된 닉네임입니다';
    messageType = 'disable';
    // setMessage('중복된 닉네임입니다');
    // setMessageType('disable');
  } else if (newNickname === '') {
    message = '사용할 수 없는 닉네임입니다';
    messageType = 'disable';
  }

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

  const handleLogoutClick = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };

  const rightIcon = editable ? (
    <TouchableOpacity
      onPress={() => {
        setEditable(false);
        editMyProfile();
      }}
      style={styles.rightIcon}>
      <Text
        style={{
          color: '#3B28B1',
          fontFamily: 'MICEGothic-Bold',
          justifyContent: 'center',
          fontSize: 15,
          textAlign: 'center',
        }}>
        완료
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => setEditable(true)}
      style={styles.rightIcon}>
      <Text
        style={{
          color: '#3B28B1',
          fontFamily: 'MICEGothic-Bold',
          justifyContent: 'center',
          fontSize: 15,
          textAlign: 'center',
        }}>
        편집
      </Text>
    </TouchableOpacity>
    // <Ionicons
    //   name="settings-outline"
    //   size={30}
    //   color="#3B28B1"
    //   // onPress={() => setEditable(true)}
    //   onPress={() => setEditable(true)}
    //   style={styles.rightIcon} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    // />
  );

  return (
    <ScrollView>
      <QhotoHeader leftIcon={leftIcon} rightIcon={rightIcon} />
      <Text
        style={{
          color: '#3B28B1',
          fontFamily: 'MICEGothic-Bold',
          fontSize: 25,
          marginLeft: 10,
          marginVertical: 15,
        }}>
        프로필
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>이름</Text>
        <TextInput
          value={newName}
          defaultValue={description}
          onChangeText={text => setNewName(text)}
          editable={editable}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>
          닉네임 &nbsp;&nbsp;
          <Text
            style={[
              styles.checkNicknameDuplicateText,
              messageType === 'disable' ? {color: 'red'} : {color: 'blue'},
            ]}>
            {message}
          </Text>
        </Text>
        <TextInput
          value={newNickname}
          defaultValue={nickname}
          onChangeText={text => testNickname(text)}
          editable={editable}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>자기소개</Text>
        <TextInput
          value={newDescription}
          defaultValue={description}
          onChangeText={text => setNewDescription(text)}
          editable={editable}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>전화번호</Text>
        <TextInput
          value={newPhone}
          defaultValue={phone}
          onChangeText={text => setNewPhone(text)}
          editable={editable}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>이메일</Text>
        <TextInput
          value={email}
          editable={false}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>가입일자</Text>
        <TextInput
          value={joinDate}
          editable={false}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>정보제공동의일자</Text>
        <TextInput
          value={contactAgreeDate}
          editable={false}
          style={[styles.inputBox, editable ? styles.editable : null]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>프로필공개여부</Text>
        {/* <Text
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}>
        {profileOpen ? 'true' : 'false'}
      </Text> */}
        {editable ? (
          <SwitchToggle
            switchOn={newProfileOpen}
            onPress={() => setNewProfileOpen(!newProfileOpen)}
            circleColorOn={'#3B28B1'} //
            backgroundColorOn={'#937DC2'}
            circleColorOff={'gray'}
            backgroundColorOff={'silver'}
            // duration={2} // 움직이는 속도
            containerStyle={styles.toggleContainer}
            circleStyle={styles.circle}
          />
        ) : (
          <SwitchToggle
            switchOn={newProfileOpen}
            onPress={() => console.log()}
            circleColorOn={'#3B28B1'} //
            backgroundColorOn={'#937DC2'}
            circleColorOff={'gray'}
            backgroundColorOff={'silver'}
            duration={1} // 움직이는 속도
            containerStyle={styles.toggleContainer}
            circleStyle={styles.circle}
          />
        )}
      </View>
      <Button title="로그아웃" onPress={handleLogoutClick} />
    </ScrollView>
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
    padding: 3,
    top: -5,
    // left: 20,
    right: -15,
    width: 40,
    height: 40,
    // backgroundColor: 'black',
  },
  titleText: {
    color: '#3B28B1',
    fontFamily: 'MICEGothic-Bold',
    fontSize: 17,
    marginLeft: 10,
    paddingLeft: 8,
  },
  inputContainer: {
    marginVertical: 8,
  },
  inputBox: {
    margin: 10,
    padding: 10,
    color: '#262626',
    marginVertical: 10,
    fontSize: 14,
    fontFamily: 'MICEGothic-Bold',
  },
  editable: {borderBottomColor: '#7954C8', borderBottomWidth: 1},
  toggleContainer: {
    // marginTop: 16,
    width: 50,
    height: 25,
    borderRadius: 25,
    marginVertical: 10,
    marginLeft: 10,
    // padding: 5,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  checkNicknameDuplicateText: {
    color: 'red',
    fontFamily: 'MICEGothic-Medium',
    fontSize: 13,
    marginLeft: 10,
  },
});

export default EditMyProfile;
