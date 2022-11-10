import {useAppDispatch} from './../store/index';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  Alert,
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
import ImageModal from 'react-native-image-modal';

import {getOtherInfoApi} from '../api/other';
import {addFriendApi, findFriendApi} from '../api/friend';

function OtherPage({navigation, route}) {
  const dispatch = useAppDispatch();

  const [otherInfo, setOtherInfo] = useState({
    email: '',
    image: '',
    description: '',
    nickname: '',
    point: 0,
    profileOpen: '',
  });

  const userId = route.params.userId;

  const [isFriend, setIsFriend] = useState(null);

  useEffect(() => {
    getOtherInfoApi(
      userId,
      async (res: any) => {
        console.log('getOtherInfoApi - res', res);
        await setOtherInfo({
          email: res.data.email,
          image: res.data.image,
          description: res.data.description,
          nickname: res.data.nickname,
          point: res.data.point,
          // profileOpen: res.data.profileOpen,
          profileOpen: false,
        });
        await findFriendApi(
          res.data.nickname,
          (res: any) => {
            console.log('findFriendApi - res', res);
            setIsFriend(res.data.isFriend);
          },
          (err: any) => console.log('findFriendApi - err', err),
        );
      },
      (err: any) => {
        console.log('getOtherInfoApi - err', err);
        console.log('getOtherInfoApi - err', err.response);
      },
    );
  }, [isFriend]);

  let iconName = '';
  let iconOrder = '';
  const isFriendIcon = () => {
    if (isFriend === 'GET') {
      iconName = 'user-check';
      iconOrder = '친구 수락';
    } else if (isFriend === 'REQUEST') {
      // 내가 보낸(아직 받지않은)
      iconName = 'user-check';
      iconOrder = '친구 수락 대기중';
    } else if (isFriend === 'FRIEND') {
      iconName = 'user-friends';
      iconOrder = '친구';
    } else if (isFriend === 'DISCONNECTED') {
      iconName = 'user-plus';
      iconOrder = '친구 요청';
    } else if (isFriend === null) {
      iconName = 'user-plus';
      iconOrder = '         ';
    }
    return (
      <FontAwesome5
        name={iconName}
        size={30}
        color="#3B28B1"
        // style={{
        //   position: 'absolute',
        //   width: 40,
        //   height: 40,
        //   top: -10,
        //   left: 20,
        // }}
      />
    );
  };

  const addFriend = () => {
    if (iconOrder === '친구 수락 대기중') {
      return Alert.alert('알림', '친구 수락 대기중입니다.');
    }
    if (iconOrder === '친구') {
      return Alert.alert('알림', '이미 친구입니다.');
    }
    console.log('resUserId', userId);
    addFriendApi(
      {resUserId: userId},
      async (res: any) => {
        console.log('addFriendApi - res', res);

        // 친구요청 or 수락 후 isFriend 를 업데이트
        await findFriendApi(
          otherInfo.nickname,
          (res: any) => {
            console.log('findFriendApi - res', res);
            setIsFriend(res.data.isFriend);
          },
          (err: any) => console.log('findFriendApi - err', err),
        );
      },
      (err: any) => {
        console.log('addFriendApi - err', err);
        console.log('addFriendApi - err', err.response);
      },
    );
  };

  let backgroundColor = 'red';
  let colorName = '';
  let nextColorName = '';
  let minPoint = 0;
  let maxPoint = 0;

  // Todo: 이것도 컴포넌트화 가능??
  // 타입스크립트방식으로 해도 지저분하긴함..
  if (otherInfo.point < 50) {
    backgroundColor = '#F94720';
    colorName = '레드';
    nextColorName = '오렌지';
    minPoint = 0;
    maxPoint = 50;
  } else if (otherInfo.point < 200) {
    backgroundColor = '#FEAD0F';
    colorName = '오렌지';
    nextColorName = '옐로우';
    minPoint = 50;
    maxPoint = 200;
  } else if (otherInfo.point < 500) {
    backgroundColor = '#FFEB3B';
    colorName = '옐로우';
    nextColorName = '그린';
    minPoint = 200;
    maxPoint = 500;
  } else if (otherInfo.point < 1000) {
    backgroundColor = '#72D200';
    colorName = '그린';
    nextColorName = '블루';
    minPoint = 500;
    maxPoint = 1000;
  } else if (otherInfo.point < 2500) {
    backgroundColor = '#30C1FF';
    colorName = '블루';
    nextColorName = '네이비';
    minPoint = 1000;
    maxPoint = 2500;
  } else if (otherInfo.point < 5000) {
    backgroundColor = '#3CA1FF';
    colorName = '네이비';
    nextColorName = '퍼플';
    minPoint = 2500;
    maxPoint = 5000;
  } else {
    backgroundColor = '#8343E8';
    colorName = '퍼플';
    minPoint = 5000;
  }

  return (
    <View>
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

      {/* 
      비공개 && !친구 -> 비공개
      공개           -> 공개
      비공개 && 친구  -> 공개
 */}

      {!otherInfo.profileOpen && isFriend !== 'FRIEND' ? (
        <TouchableOpacity
          onPress={() => {
            addFriend();
          }}>
          <View style={styles.ifFriendIcon}>
            {isFriendIcon()}
            <Text style={{color: 'black', fontSize: 20}}>{iconOrder}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <View>
            <View>
              <View style={styles.ifFriendIcon}>
                {isFriendIcon()}
                <Text style={{color: 'black', fontSize: 20}}>{iconOrder}</Text>
              </View>
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
                    {nextColorName} 레벨까지 {maxPoint - otherInfo.point} Points
                    남음
                  </Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              //
            }}>
            <Text
              // onPress={goToQuestLog}
              style={{fontWeight: 'bold', color: '#3B28B1'}}>
              퀘스트 로그{' '}
            </Text>
            <FontAwesome5 name="angle-right" size={18} color={'#3B28B1'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ifFriendIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});

export default OtherPage;
