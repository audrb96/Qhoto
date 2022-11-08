import React, {useCallback, useRef, useState} from 'react';
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

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const phoneRef = useRef<TextInput | null>(null); /////Todo
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangePhone = useCallback(text => {
    setPhone(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangeNickname = useCallback(text => {
    setNickname(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
    if (!phone || !phone.trim()) {
      return Alert.alert('알림', '전화번호를 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '닉네임를 입력해주세요.');
    }
    if (!/[\{\}\[\]\/?,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/.test(nickname)) {
      return Alert.alert(
        '알림',
        '닉네임은 영어 대소문자와 언더바, 마침표만 가능해',
      );
    }
    // if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
    //   return Alert.alert(
    //     '알림',
    //     '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
    //   );
    // }

    // async function editMyProfileApi(newUserInfo, success, fail) {
    //   console.log('newUserInfo', newUserInfo);
    //   await fileApi
    //     // Body
    //     .put('/api/user', newUserInfo, {headers: await createHeaders()})
    //     .then(success)
    //     .catch(fail);
    // }

    console.log(phone, name, nickname);
    Alert.alert('알림', '회원가입 되었습니다.');
  }, [phone, name, nickname]);

  const canGoNext = phone && name && nickname;
  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePhone}
          placeholder="전화번호를 입력해주세요"
          placeholderTextColor="#666"
          textContentType="telephoneNumber" // Todo
          value={phone}
          returnKeyType="next"
          clearButtonMode="while-editing" // Todo
          ref={phoneRef} // Todo
          onSubmitEditing={() => nameRef.current?.focus()} // Todo
          blurOnSubmit={false} // Todo
        />
      </View>
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
          clearButtonMode="while-editing"
          ref={nameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="닉네임를 입력해주세요(영문,숫자,특수문자(., _))"
          placeholderTextColor="#666"
          onChangeText={onChangeNickname}
          value={nickname}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="nickname"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
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
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
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
