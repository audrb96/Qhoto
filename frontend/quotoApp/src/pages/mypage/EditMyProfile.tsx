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
import {duplicateTestApi, editMyProfileApi} from '../../api/mypage';

function EditMyProfile({navigation, route}) {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    console.log('route', route.params.userInfo);
  }, []);

  const editMyProfile = () => {
    editMyProfileApi(
      {
        phone: newPhone,
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
    profileOpen,
    description,
    userImage,
    contactAgreeDate,
  } = route.params.userInfo;

  const [duplicated, setDuplicated] = useState(false);

  const testNickname = async text => {
    // Todo 유효성 검사
    await setNewNickname(text);

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
    message = '사용가능합니다.';
    messageType = 'able';
    // setMessage('사용가능합니다');
    // setMessageType('able');
  } else if (!duplicated) {
    message = '사용가능합니다.';
    messageType = 'able';
    // setMessage('사용가능합니다');
    // setMessageType('able');
  } else if (duplicated) {
    message = '중복된 닉네임입니다.';
    messageType = 'disable';
    // setMessage('중복된 닉네임입니다');
    // setMessageType('disable');
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

  const rightIcon = editable ? (
    <TouchableOpacity
      onPress={() => {
        setEditable(false);
        editMyProfile();
      }}
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
      <QhotoHeader leftIcon={leftIcon} rightIcon={rightIcon} />
      <TextInput editable={false} style={{color: 'black'}}>
        유저 정보 변경 화면
      </TextInput>
      <Text style={{color: 'black'}}>닉네임</Text>
      <TextInput
        value={newNickname}
        defaultValue={nickname}
        onChangeText={text => testNickname(text)}
        editable={editable}
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}
      />
      {messageType === 'disable' ? (
        <Text style={styles.duplicatedNickname}>{message}</Text>
      ) : (
        <Text style={styles.nonDuplicatedNickname}>{message}</Text>
      )}

      <Text style={{color: 'black'}}>자기소개</Text>
      <TextInput
        value={newDescription}
        defaultValue={description}
        onChangeText={text => setNewDescription(text)}
        editable={editable}
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}
      />
      <Text style={{color: 'black'}}>전화번호</Text>
      <TextInput
        value={newPhone}
        defaultValue={phone}
        onChangeText={text => setNewPhone(text)}
        editable={editable}
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}
      />
      <Text style={{color: 'black'}}>이메일</Text>
      <TextInput
        value={email}
        editable={false}
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}
      />
      <Text style={{color: 'black'}}>가입일자</Text>
      <TextInput
        value={joinDate}
        editable={false}
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}
      />
      <Text style={{color: 'black'}}>정보제공동의일자</Text>
      <TextInput
        value={contactAgreeDate}
        editable={false}
        style={{color: 'black', backgroundColor: 'silver', marginVertical: 10}}
      />
      <Text style={{color: 'black'}}>프로필공개여부</Text>
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
          circleColorOn={'#3B28B1'} //
          backgroundColorOn={'#937DC2'}
          circleColorOff={'gray'}
          backgroundColorOff={'silver'}
          // duration={2} // 움직이는 속도
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      )}
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
  toggleContainer: {
    // marginTop: 16,
    width: 50,
    height: 25,
    borderRadius: 25,
    // padding: 5,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  duplicatedNickname: {
    color: 'red',
  },
  nonDuplicatedNickname: {
    color: 'black',
  },
});

export default EditMyProfile;
