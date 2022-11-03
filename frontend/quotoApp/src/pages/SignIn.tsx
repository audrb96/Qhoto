import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Button,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import kakao from '../assets/kakao_login_medium_wide.png';
import axios from 'axios';

import {LOGIN_LOGO} from '../image';

import {loginKakao, loginGoogle} from '../api/user';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const {width, height} = Dimensions.get('window');

function SignIn({navigation}: SignInScreenProps) {
  //////////////////////////////
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const toSignUp = () => {
    navigation.navigate('SignUp');
  };

  const canGoNext = email && password;

  const [user, setUser] = useState({});

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login().then(token => {
      console.log(11, token);
      if (token) {
        loginKakao(
          token.accessToken,
          res => {
            console.log(res.data);
            const {id, email, name, image, nickname, profileOpen} =
              res.data.user;

            dispatch(
              userSlice.actions.setUser({
                email: email,
                userName: name,
                userImage: image,
                loggedIn: true,
              }),
            );
          },
          err => {
            console.log(err);
          },
        );
      }
    });
    setUser(token);
  };

  const signInWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        '1091823482731-f0375q139gm9me0a4v7cg50jiamjkcq4.apps.googleusercontent.com',
      //     offlineAccess: true,
      //     forceCodeForRefreshToken: true,
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              loginGoogle(
                userInfo.idToken,
                res => {
                  const {
                    userId,
                    email,
                    name,
                    image,
                    userPoint,
                    nickname,
                    profileOpen,
                  } = res.data;

                  dispatch(
                    userSlice.actions.setUser({
                      email: email,
                      userName: name,
                      userImage: image,
                      loggedIn: true,
                    }),
                  );
                },
                err => {
                  console.log(err);
                },
              );
              setUser(userInfo);
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  return (
    <View style={styles.container}>
      <Image source={LOGIN_LOGO} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide} // Standart or Wide
          onPress={signInWithGoogle}
        />
        <Pressable style={{marginTop: 10}} onPress={signInWithKakao}>
          <Image source={kakao} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: (height * 2) / 7,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
