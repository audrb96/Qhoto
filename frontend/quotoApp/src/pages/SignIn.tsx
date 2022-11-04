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
  getAccessToken,
} from '@react-native-seoul/kakao-login';
import {KAKAO_LOGIN_BUTTON} from '../image';
import axios from 'axios';

import {LOGIN_LOGO} from '../image';

import {loginKakao, loginGoogle} from '../api/user';

import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const {width, height} = Dimensions.get('window');

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();

  const signInWithKakao = async (): Promise<void> => {
    await login().then((token: any) => {
      console.log(11, token);
      if (token) {
        loginKakao(
          token.accessToken,
          (res: any) => {
            console.log(1111, res);
            AsyncStorage.setItem('accessToken', res.data.accessToken, () => {
              console.log('유저 닉네임 저장 완료');
            });
            const accessToken = res.data.accessToken;
            dispatch(
              userSlice.actions.setUser({
                token: accessToken,
                loggedIn: true,
              }),
            );
          },
          (err: any) => {
            console.log(err);
          },
        );
      }
    });
  };

  AsyncStorage.getItem('accessToken', (err, result) => {
    console.log(result);
  });

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
                (res: any) => {
                  console.log('구글로그인', res);
                  AsyncStorage.setItem(
                    'accessToken',
                    res.data.accessToken,
                    () => {
                      console.log('유저 닉네임 저장 완료');
                    },
                  );
                  const accessToken = res.data.accessToken;
                  dispatch(
                    userSlice.actions.setUser({
                      token: accessToken,
                      loggedIn: true,
                    }),
                  );
                },
                (err: any) => {
                  console.log(err);
                },
              );
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
          <Image source={KAKAO_LOGIN_BUTTON} />
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
