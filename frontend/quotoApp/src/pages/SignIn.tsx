import React from 'react';
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

import {LOGIN_LOGO} from '../image';

import {loginKakao, loginGoogle} from '../api/user';

import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const {height} = Dimensions.get('window');

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();

  const signInWithKakao = async (): Promise<void> => {
    await login().then((token: any) => {
      if (token) {
        loginKakao(
          token.accessToken,
          (res: any) => {
            AsyncStorage.setItem('accessToken', res.data.accessToken, () => {
              console.log('accessToken : ' + res.data.accessToken);
            });

            AsyncStorage.setItem('refreshToken', res.data.refreshToken, () => {
              console.log('refreshToken : ' + res.data.refreshToken);
            });
            dispatch(
              userSlice.actions.setUser({
                loggedIn: true,
              }),
            );
          },
          (err: any) => {
            console.log(err.response);
          },
        );
      }
    });
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
                (res: any) => {
                  AsyncStorage.setItem(
                    'accessToken',
                    res.data.accessToken,
                    () => {
                      console.log('accessToken : ' + res.data.accessToken);
                    },
                  );
                  AsyncStorage.setItem(
                    'refreshToken',
                    res.data.refreshToken,
                    () => {
                      console.log('refreshToken : ' + res.data.refreshToken);
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
          <View style={{elevation: 5}}>
            <Image source={KAKAO_LOGIN_BUTTON} />
          </View>
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
