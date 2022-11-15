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

import Fontisto from 'react-native-vector-icons/Fontisto';

import {getOtherInfoApi, getOtherLogApi} from '../api/other';
import {addFriendApi, findFriendApi} from '../api/friend';
import QhotoHeader from '../components/QhotoHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LevelBox from './../components/mypage/LevelBox';
import LogItem from './../components/mypage/LogItem';
import {ScrollView} from 'react-native-gesture-handler';
interface OtherLog {
  feedId: number;
  feedImage: string;
  feedTime: string;
  questName: string;
  typeCode: string;
  feedType: string;
}

function OtherPage({route}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const goToLevel = () => {
    navigation.navigate('QhotoLevel');
  };
  const goToQuestLog = () => {
    navigation.navigate('QhotoLog', {logs: otherLogs});
  };

  const [otherInfo, setOtherInfo] = useState({
    email: '',
    image: '',
    description: '',
    nickname: '',
    point: 0,
    profileOpen: '',
    expGrade: '',
  });

  const [otherLogs, setOtherLogs] = useState<OtherLog[]>();

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
          profileOpen: res.data.profileOpen,
          expGrade: res.data.expGrade,
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
    getOtherLogApi(
      userId,
      (res: any) => {
        console.log('getOtherLogApi - res', res.data);
        setOtherLogs(res.data);
      },
      (err: any) => {
        console.log('getOtherLogApi - err', err);
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
      iconOrder = '친구 요청';
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

  return otherInfo === undefined || otherLogs === undefined ? null : (
    <ScrollView>
      <QhotoHeader leftIcon={leftIcon} rightIcon={false} />
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
        <View>
          <TouchableOpacity
            onPress={() => {
              addFriend();
            }}>
            <View style={styles.ifFriendIcon}>
              {isFriendIcon()}
              <Text style={{color: 'black', fontSize: 20}}>{iconOrder}</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Fontisto name="locked" size={30} color={'#3B28B1'} />
            <Text style={{color: 'black', fontSize: 30}}>비공개 유저다</Text>
          </View>
        </View>
      ) : (
        <View>
          <View>
            <View>
              <View style={styles.ifFriendIcon}>
                {isFriendIcon()}
                <Text style={{color: 'black', fontSize: 20}}>{iconOrder}</Text>
              </View>
              <View style={{marginVertical: 10, paddingHorizontal: 30}}>
                <View>
                  <TouchableOpacity>
                    <Text onPress={goToLevel} style={styles.subjectText}>
                      qhoto 레벨 &nbsp;
                      <FontAwesome5
                        name="angle-right"
                        size={20}
                        color={'#3B28B1'}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', paddingVertical: 20}}>
                  <LevelBox
                    userGrade={otherInfo.expGrade}
                    userPoint={otherInfo.point}
                  />
                </View>
              </View>
              <View style={{marginVertical: 10, paddingHorizontal: 30}}>
                <TouchableOpacity>
                  <Text onPress={goToQuestLog} style={styles.subjectText}>
                    qhoto 로그 &nbsp;
                    <FontAwesome5
                      name="angle-right"
                      size={20}
                      color={'#3B28B1'}
                    />
                  </Text>
                </TouchableOpacity>
                <View>
                  {otherLogs.map((log, index) => (
                    <LogItem key={index} log={log} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ifFriendIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  leftIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
  subjectText: {
    color: '#3B28B1',
    fontSize: 20,
    fontFamily: 'MICEGothic-Bold',
    marginBottom: 3,
  },
});

export default OtherPage;
