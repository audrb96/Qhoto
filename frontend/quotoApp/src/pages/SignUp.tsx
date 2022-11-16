import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import QhotoHeader from '../components/QhotoHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {editMyProfileApi, getUserInfoApi} from '../api/mypage';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation, route}: SignInScreenProps) {
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const phoneRef = useRef<TextInput | null>(null); /////Todo
  const nameRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);

  // const accessToken = route.params.accessToken;
  // const refreshToken = route.params.refreshToken;
  // const email = route.params.email;
  // const joinDate = route.params.joinDate;
  // const profileOpen = route.params.profileOpen;
  // const description = route.params.description;
  // const userImage = route.params.userImage;
  // const contactAgreeDate = route.params.contactAgreeDate;
  // const expGrade = route.params.expGrade;
  // const totalExp = route.params.totalExp;

  // useEffect(() => {
  //   const accessToken = route.params.accessToken);
  //   console.log('토큰넘어왔다', route.params.refreshToken);
  // });

  const onChangePhone = useCallback(text => {
    setPhone(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangeNickname = useCallback(text => {
    setNickname(text.trim());
  }, []);

  const onSubmit = async () => {
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '닉네임를 입력해주세요.');
    }
    if (!phone || !phone.trim()) {
      return Alert.alert('알림', '전화번호를 입력해주세요.');
    }
    if (
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\{\}\[\]\/?,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/.test(
        nickname,
      )
    ) {
      return Alert.alert(
        '알림',
        '닉네임은 영어 대소문자와 언더바, 마침표만 가능해',
      );
    }
    if (nickname.length < 2 || nickname.length > 51) {
      return Alert.alert('알림', '닉네임은 2~50글자만 가능합니다.');
    }
    if (
      /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\{\}\[\]\/?,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/.test(
        phone,
      )
    ) {
      return Alert.alert('알림', '전화번호는 숫자만 입력해주세요.');
    }
    if (phone.substr(0, 3) !== '010') {
      return Alert.alert('알림', '전화번호는 010 으로 시작해야합니다.');
    }
    if (phone.length !== 10 && phone.length !== 11) {
      return Alert.alert('알림', '전화번호는 10~11자리만 가능합니다.');
    }

    await editMyProfileApi(
      {
        phone: phone,
        name: name,
        nickname: nickname,
        // profileOpen: newProfileOpen,
      },
      (res: any) => {
        getUserInfoApi((res: any) => {
          const {
            nickname,
            email,
            joinDate,
            phone,
            profileOpen,
            description,
            userImage,
            contactAgreeDate,
            expGrade,
            totalExp,
            name,
          } = res.data;

          dispatch(
            userSlice.actions.setUser({
              nickname: nickname,
              email: email,
              joinDate: joinDate,
              phone: phone,
              profileOpen: profileOpen,
              description: description,
              userImage: userImage,
              contactAgreeDate: contactAgreeDate,
              expGrade: expGrade,
              totalExp: totalExp,
              name: name,
            }),
          );
        });
      },
      (err: any) => {
        console.log('editMyProfileApi - err', err.response.data);
      },
    );
  };

  const canGoNext = phone && name && nickname;

  return (
    <DismissKeyboardView>
      <QhotoHeader leftIcon={false} rightIcon={false} />
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={name}
          textContentType="name"
          returnKeyType="next"
          // clearButtonMode="while-editing"  // IOS
          ref={nameRef}
          onSubmitEditing={() => nicknameRef.current?.focus()}
          blurOnSubmit={false} // 다음을 눌러도 키보드가 사라지지 않음
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.textInput}
          placeholder="닉네임를 입력해주세요(영문,숫자,특수문자(., _))"
          placeholderTextColor="#666"
          onChangeText={onChangeNickname}
          value={nickname}
          returnKeyType="next"
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="nickname"
          ref={nicknameRef}
          onSubmitEditing={() => phoneRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePhone}
          // defaultValue="010"
          placeholder="전화번호를 입력해주세요"
          placeholderTextColor="#666"
          textContentType="telephoneNumber" // Todo
          value={phone}
          returnKeyType="send"
          keyboardType="decimal-pad"
          ref={phoneRef}
          blurOnSubmit={false} // Todo
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext}
          onPress={onSubmit}>
          <Text style={styles.loginButtonText}>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: 'black',
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUp;
