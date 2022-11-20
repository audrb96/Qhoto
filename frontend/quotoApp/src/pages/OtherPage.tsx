import {useAppDispatch} from './../store/index';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  Alert,
  TouchableOpacity,
  View,
  RefreshControl,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  NativeModules,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImageModal from 'react-native-image-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {getOtherInfoApi, getOtherLogApi} from '../api/other';
import {addFriendApi, disconnectFriendApi, findFriendApi} from '../api/friend';
import QhotoHeader from '../components/QhotoHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LevelBox from './../components/mypage/LevelBox';
import LogItem from './../components/mypage/LogItem';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from '@rneui/base';
interface OtherLog {
  feedId: number;
  feedImage: string;
  feedTime: string;
  questName: string;
  typeCode: string;
  feedType: string;
}

const {width, height} = Dimensions.get('window');

function OtherPage({route}) {
  const navigation = useNavigation();
  const [callbackState, setCallbackState] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const pullDownScreen = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 10);
    setCallbackState(!callbackState);
  };

  const goToLevel = () => {
    // 여기에 userId 넘겨주면 되긴 함. userId넘겨준 후, QhotoLevelPage에서 요청 보낼때 userId 같이 보내는 걸로.
    navigation.navigate('QhotoLevel', {friendId: userId, otherInfo: otherInfo});
  };
  const goToQuestLog = () => {
    navigation.navigate('QhotoLog', {logs: otherLogs});
  };

  const [otherInfo, setOtherInfo] = useState({
    email: '',
    image: '',
    description: '',
    nickname: '',
    totalExp: 0,
    profileOpen: '',
    expGrade: '',
  });
  const [otherLogs, setOtherLogs] = useState<OtherLog[]>();

  const userId = route.params.userId;

  const [isFriend, setIsFriend] = useState();

  useEffect(() => {
    getOtherInfoApi(
      userId,
      (res: any) => {
        console.log('getOtherInfoApi - res', res.data);
        setOtherInfo({
          email: res.data.email,
          image: res.data.image,
          description: res.data.description,
          nickname: res.data.nickname,
          totalExp: res.data.totalExp,
          profileOpen: res.data.profileOpen,
          expGrade: res.data.expGrade,
        });
        findFriendApi(
          res.data.nickname,
          (res: any) => {
            console.log('findFriendApi - res', res.data);
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
  }, [isFriend, callbackState]);

  // let iconName = '';
  // let iconOrder = '';
  const isFriendIcon = () => {
    // let buttonTitle = '';
    // isFriend 로딩 전 초기값
    if (isFriend === undefined) {
      return (
        <Button
          buttonStyle={styles.buttonUndefined}
          title="     "
          onPress={() => {}}
        />
      );
    }
    // 아무 관계없는 or 친구관계가 삭제된
    else if (isFriend === null || isFriend === 'DISCONNECTED') {
      return (
        <Button
          buttonStyle={styles.button}
          title="친구요청"
          titleStyle={{fontFamily: 'esamanru-Medium', fontSize: 18}}
          onPress={() => addFriend()}></Button>
      );
    }
    // 내가 보낸(아직 받지않은)
    else if (isFriend === 'REQUEST') {
      return (
        <Button
          buttonStyle={styles.buttonSilver}
          title="친구수락 대기중"
          titleStyle={{fontFamily: 'esamanru-Medium', fontSize: 18}}
          onPress={() => {
            disconnect();
          }}
        /> // Todo 완료: 친구요청 취소
      );
    }
    // 이미 친구인
    else if (isFriend === 'FRIEND') {
      return (
        <Button
          buttonStyle={styles.buttonPurple}
          title="친구"
          titleStyle={{fontFamily: 'esamanru-Medium', fontSize: 18}}
          onPress={() => {
            setDisconnectModalVisible(true);
          }}
        /> // Todo: 친구삭제
      );
    }
    // 친구 요청을 받은
    else if (isFriend === 'GET') {
      return (
        <Button
          buttonStyle={styles.button}
          title="친구요청 수락"
          titleStyle={{fontFamily: 'esamanru-Medium', fontSize: 18}}
          onPress={() => addFriend()}></Button> // Todo 완료: 친구수락
      );
    }
    return;
  };

  const addFriend = () => {
    // if (iconOrder === '친구 수락 대기중') {
    //   return Alert.alert('알림', '친구 수락 대기중입니다.');
    // }
    // if (iconOrder === '친구') {
    //   return Alert.alert('알림', '이미 친구입니다.');
    // }
    console.log('resUserId', userId);
    addFriendApi(
      {resUserId: userId},
      (res: any) => {
        console.log('addFriendApi - res', res.data);

        // 친구요청 or 수락 후 isFriend 를 업데이트
        updateIsFriend();
      },
      (err: any) => {
        console.log('addFriendApi - err', err);
        console.log('addFriendApi - err', err.response);
      },
    );
  };

  const disconnect = async () => {
    console.log('resUserId', userId);
    disconnectFriendApi(
      userId,
      (res: any) => {
        console.log('disconnectFriendApi - res', res);
        // 친구단절 혹은 수락요청취소 후 isFriend 를 업데이트
        updateIsFriend();
      },
      (err: any) => {
        console.log('disconnectFriendApi - err', err);
        console.log('disconnectFriendApi - err', err.response);
      },
    );
  };

  // 친구삭제를 위한 모달 visible 상태값
  const [disconnectModalVisivle, setDisconnectModalVisible] = useState(false);

  const updateIsFriend = () => {
    findFriendApi(
      otherInfo.nickname,
      (res: any) => {
        console.log('findFriendApi - res', res.data);
        setIsFriend(res.data.isFriend);
      },
      (err: any) => console.log('findFriendApi - err', err),
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

  return otherInfo === undefined ||
    otherLogs === undefined ||
    isFriend === undefined ? null : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => pullDownScreen()}
        />
      }>
      <QhotoHeader leftIcon={leftIcon} rightIcon={false} />

      <View style={styles.profileContainer}>
        <Avatar.Image
          // badge
          size={170}
          source={{uri: otherInfo.image}} // Todo
        />
        <Text
          style={{
            fontSize: 24,
            color: '#424242',
            fontFamily: 'esamanru-Medium',
            marginTop: 15,
          }}>
          {otherInfo.nickname}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#666666',
            fontFamily: 'esamanru-Medium',
          }}>
          {otherInfo.description}
        </Text>
        {/* <TouchableOpacity
          onPress={() => {
            addFriend();
          }}
          style={{
            // backgroundColor: '#3B28B1',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'esamanru-Medium',
              fontSize: 21,
            }}>
            {isFriendIcon()}
          </Text>
        </TouchableOpacity> */}
      </View>

      {!otherInfo.profileOpen && isFriend !== 'FRIEND' ? (
        <View>
          {isFriendIcon()}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height / 10,
              // backgroundColor: 'red',
            }}>
            <Fontisto name="locked" size={110} color="#3B28B1" />
            <Text
              style={{
                color: '#3B28B1',
                fontFamily: 'esamanru-Medium',
                fontSize: 22,
                marginTop: height * 0.025,
              }}>
              비공개 계정입니다
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View>
            <View>
              {isFriendIcon()}
              <View
                style={{
                  marginVertical: height * 0.0125,
                  paddingHorizontal: width * 0.073,
                }}>
                <View>
                  <TouchableOpacity>
                    {/* onPress={goToLevel} 삭제 해놨지만 추가 할 수도? 추가 하게 된다면 위에 goToLevel참조*/}
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
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: height * 0.025,
                  }}>
                  <LevelBox
                    userGrade={otherInfo.expGrade}
                    userPoint={otherInfo.totalExp}
                  />
                </View>
              </View>
              <View
                style={{
                  marginVertical: height * 0.0125,
                  paddingHorizontal: width * 0.073,
                }}>
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
      <Modal
        ////////////////////////////////////////////////////////////////////////
        isVisible={disconnectModalVisivle} // modal 나타나는 조건
        animationIn="fadeIn" // 트랜지션 효과 유형(slide - 위로 슬라이드,  fade - 서서히 나타남, none - 없음)
        animationOut="fadeOut" // 트랜지션 효과 유형(slide - 위로 슬라이드,  fade - 서서히 나타남, none - 없음)
        animationOutTiming={10}
        backdropOpacity={0.2}
        onBackdropPress={() => setDisconnectModalVisible(false)}
        onBackButtonPress={() => setDisconnectModalVisible(false)}>
        <Pressable
          style={styles.background}
          onPress={() => setDisconnectModalVisible(false)}>
          <View style={styles.whiteBox}>
            <View style={styles.question}>
              <Text style={styles.modalText}>친구를 끊으시겠어요?</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Pressable
                style={styles.actionButton}
                android_ripple={{color: '#eee'}} // press 시, 물결효과(TouchableOpacity 에선 안됨)
                onPress={() => {
                  disconnect();
                  setDisconnectModalVisible(false);
                }}>
                <Text style={styles.modalText}>예</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                android_ripple={{color: '#eee'}} // press 시, 물결효과(TouchableOpacity 에선 안됨)
                onPress={() => setDisconnectModalVisible(false)}>
                <Text style={styles.modalText}>아니요</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
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
  profileContainer: {marginVertical: 20, alignItems: 'center'},
  profileImageContainer: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.015,
  },
  button: {
    width: width * 0.4,
    alignSelf: 'center',
    marginBottom: height * 0.0125,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonUndefined: {
    width: width * 0.4,
    alignSelf: 'center',
    marginBottom: height * 0.0125,
    backgroundColor: 'white',
    // backgroundColor: '#3B28B1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  buttonSilver: {
    width: width * 0.4,
    alignSelf: 'center',
    marginBottom: height * 0.0125,
    backgroundColor: 'silver',
    // backgroundColor: '#3B28B1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonPurple: {
    width: width * 0.4,
    alignSelf: 'center',
    marginBottom: height * 0.0125,
    backgroundColor: '#3B28B1',
    // backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 100,
  },
  whiteBox: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  question: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.0125,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.0125,
  },
  icon: {
    marginRight: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'MICEGothic-Bold',
    color: 'black',
  },
});

export default OtherPage;
