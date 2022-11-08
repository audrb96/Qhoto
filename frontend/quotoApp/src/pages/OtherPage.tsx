import {useAppDispatch} from './../store/index';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  SafeAreaView,
  Modal,
  Pressable,
  StyleSheet,
  NativeModules,
} from 'react-native';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ImageModal} from 'react-native-image-modal';
import {getOtherInfoApi} from '../api/other';

function OtherPage() {
  const dispatch = useAppDispatch();

  const [otherInfo, setOtherInfo] = useState({
    email: '',
    // joinDate: '',
    image: '',
    // phone: '',
    description: '',
    nickname: '',
    point: 0,
    // contactAgreeDate: '',
    profileOpen: true,
  });

  useEffect(userId => {
    getOtherInfoApi(
      userId,
      res => {
        console.log('getOtherInfoApi - res', res);
        setOtherInfo({
          email: res.data.email,
          image: res.data.image,
          description: res.data.description,
          nickname: res.data.nickname,
          point: res.data.point,
          profileOpen: res.data.profileOpen,
        });
      },
      err => {
        console.log('getOtherInfoApi - err', err);
        console.log('getOtherInfoApi - err', err.response);
      },
    );
    //   (res: any) => {
    //     let {
    //       email,
    //       joinDate,
    //       nickname,
    //       phone,
    //       profileOpen,
    //       description,
    //       userImage,
    //       contactAgreeDate,
    //     } = res.data;

    //     setUserInfo({
    //       email,
    //       joinDate,
    //       nickname,
    //       phone,
    //       profileOpen,
    //       description,
    //       userImage,
    //       contactAgreeDate,
    //     });

    //     dispatch(
    //       userSlice.actions.setUser({
    //         email: userInfo.email,
    //         joinDate: userInfo.joinDate,
    //         userImage: userInfo.userImage,
    //         phone: userInfo.phone,
    //         nickname: userInfo.nickname,
    //         description: userInfo.description,
    //         contactAgreeDate: userInfo.contactAgreeDate,
    //         profileOpen: userInfo.profileOpen,
    //         loggedIn: true,
    //       }),
    //     );
    //     console.log('getUserInfo-res : ', res);
    //     // Todo: back 에서 point 주면 redux 에 넣어야 함
    //     // Todo: 유저 point state 관리도 해줘야함
    //   },
    //   (err: any) => console.log('getUserInfo-err : ', err),
    // );
  }, []);

  return (
    <SafeAreaView>
      <View // 프로필
      >
        <View style={{flexDirection: 'row', paddingTop: 10, marginVertical: 0}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View>
              <ImageModal
                source={{uri: otherInfo.image}}
                resizeMode="cover"
                modalImageResizeMode="contain"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                }}
                swipeToDismiss={true} // 스와이프하여 창을 닫을지 여부를 결정합니다.(default: true)
                overlayBackgroundColor="#000000" // 전체 사이즈 모달의 배경색을 지정합니다.(default: #000000)
              />
            </View>

            <Text style={{fontSize: 16, color: 'black'}}>
              {otherInfo.nickname}
            </Text>
            <Text style={{fontSize: 12, color: 'black'}}>
              {otherInfo.description}
            </Text>
          </View>
        </View>
      </View>
      <View // qhoto 레벨
      >
        <View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              //
            }}>
            <Text
              // onPress={goToLevel}
              style={{fontWeight: 'bold', color: '#3B28B1'}}>
              qhoto 레벨{' '}
            </Text>
            <FontAwesome5 name="angle-right" size={18} color={'#3B28B1'} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: 300,
              height: 130,
              backgroundColor,
              borderRadius: 10,
            }}>
            <Text style={{marginHorizontal: 15, color: 'black'}}>
              {colorName}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: '600',
                marginHorizontal: 15,
              }}>
              {otherInfo.point}
            </Text>
            <Text style={{color: 'black', marginHorizontal: 15}}>
              총퀘스트점수
            </Text>
            <View style={{marginHorizontal: 15, marginVertical: 5}}>
              <View
                style={{
                  width: 270,
                  height: 5,
                  backgroundColor: 'silver',
                }}
              />
              <View
                style={{
                  width:
                    270 *
                    ((otherInfo.point - minPoint) / (maxPoint - minPoint)),
                  height: 5,
                  backgroundColor: 'black',
                  position: 'absolute',
                }}
              />
            </View>
            {otherInfo.point < 5000 ? (
              <Text style={{color: 'black', marginHorizontal: 15}}>
                {nextColorName} 레벨까지 {maxPoint - userPoint} Points 남음
              </Text>
            ) : (
              <Text />
            )}
          </View>
        </View>
      </View>
      {/* <View // quest 로그
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            //
          }}>
          <Text
            onPress={goToQuestLog}
            style={{fontWeight: 'bold', color: '#3B28B1'}}>
            퀘스트 로그{' '}
          </Text>
          <FontAwesome5 name="angle-right" size={18} color={'#3B28B1'} />
        </TouchableOpacity>
        <Text style={{color: 'black'}}> URI: {imageUri}</Text>
        <Text style={{color: 'black'}}> joinDate: {userInfo.joinDate}</Text>
        <Text style={{color: 'black'}}> phone: {userInfo.phone}</Text>
        <Text style={{color: 'black'}}>
          {' '}
          profileOpen: {userInfo.profileOpen === true ? 'true' : 'false'}
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default OtherPage;
