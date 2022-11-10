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
import {getUserInfoApi} from '../api/mypage';

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
          async (res: any) => {
            if (!res.data.isJoined) {
              console.log('가입하지 않았어');
              return navigation.navigate('SignUp', {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              }); // 가입하지 않았어
            }
            if (res.data.isJoined && !res.data.isModified) {
              console.log('가입은 했는데, 정보입력을 안했어');

              return navigation.navigate('SignUp', {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              }); // 가입은 했는데, 정보입력을 안했어
            }
            if (!res.data.isJoined) {
              // 서비스 이용해~
            }

            await AsyncStorage.setItem(
              'accessToken',
              res.data.accessToken,
              () => {
                console.log('accessToken : ' + res.data.accessToken);
              },
            );

            await AsyncStorage.setItem(
              'refreshToken',
              res.data.refreshToken,
              () => {
                console.log('refreshToken : ' + res.data.refreshToken);
              },
            );

            getUserInfoApi(
              (response: any) => {
                let {
                  nickname,
                  // NOTICE: 로그인 했는데, 마이페이지 들리기 전에
                  // 필요한 정보있으면 여기서 dispatch 해줘야함.
                  // 그런데 SignUp 에서도 dispatch 해줘야 함

                  // email,
                  // joinDate,
                  // phone,
                  // profileOpen,
                  // description,
                  // userImage,
                  // contactAgreeDate,
                } = response.data;

                dispatch(
                  userSlice.actions.setUser({
                    nickname: nickname,
                    // email: email,
                    // joinDate: joinDate,
                    // userImage: userImage,
                    // phone: phone,
                    // description: description,
                    // contactAgreeDate: contactAgreeDate,
                    // profileOpen: profileOpen,
                    loggedIn: true,
                  }),
                );
              },
              (err: any) => console.log(err),
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
                async (res: any) => {
                  if (!res.data.isJoined) {
                    console.log('가입하지 않았어');
                    return navigation.navigate('SignUp', {
                      accessToken: res.data.accessToken,
                      refreshToken: res.data.refreshToken,
                    }); // 가입하지 않았어
                  }
                  if (res.data.isJoined && !res.data.isModified) {
                    console.log('가입은 했는데, 정보입력을 안했어');

                    return navigation.navigate('SignUp', {
                      accessToken: res.data.accessToken,
                      refreshToken: res.data.refreshToken,
                    }); // 가입은 했는데, 정보입력을 안했어
                  }
                  if (!res.data.isJoined) {
                    // 서비스 이용해~
                  }
                  await AsyncStorage.setItem(
                    'accessToken',
                    res.data.accessToken,
                    () => {
                      console.log('accessToken : ' + res.data.accessToken);
                    },
                  );
                  await AsyncStorage.setItem(
                    'refreshToken',
                    res.data.refreshToken,
                    () => {
                      console.log('refreshToken : ' + res.data.refreshToken);
                    },
                  );

                  getUserInfoApi(
                    (response: any) => {
                      let {
                        nickname,
                        // email,
                        // joinDate,
                        // phone,
                        // profileOpen,
                        // description,
                        // userImage,
                        // contactAgreeDate,
                      } = response.data;

                      dispatch(
                        userSlice.actions.setUser({
                          nickname: nickname,
                          // email: email,
                          // joinDate: joinDate,
                          // userImage: userImage,
                          // phone: phone,
                          // description: description,
                          // contactAgreeDate: contactAgreeDate,
                          // profileOpen: profileOpen,
                          loggedIn: true,
                        }),
                      );
                    },
                    (err: any) => console.log(err),
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
            <Image
              source={KAKAO_LOGIN_BUTTON}
              style={styles.kakaoLoginButton}
            />
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
  kakaoLoginButton: {
    elevation: 5,
  },
});

export default SignIn;
