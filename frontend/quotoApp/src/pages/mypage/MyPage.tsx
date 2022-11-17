import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  Pressable,
  StyleSheet,
  NativeModules,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import QhotoHeader from '../../components/QhotoHeader';
// import UploadModeModal from '../../components/mypage/UploadModeModal';
// import ProfileImageModal from '../../components/mypage/ProfileImageModal';
import ImageModal from 'react-native-image-modal';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch} from '../../store';
import userSlice from '../../slices/user';
import {editMyProfileApi, getUserInfoApi, getUserLog} from '../../api/mypage';
import LevelBox from '../../components/mypage/LevelBox';
import LogItem from '../../components/mypage/LogItem';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

interface UserInfo {
  email: string;
  joinDate: string;
  userImage: string;
  phone: string;
  description: string;
  nickname: string;
  name: string;
  contactAgreeDate: string;
  profileOpen: boolean;
  expGrade: string;
  totalExp: number;
}

interface UserLog {
  feedId: number;
  feedImage: string;
  feedTime: string;
  questName: string;
  typeCode: string;
  feedType: string;
}

function MyPage() {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  const [refresh, setRefresh] = useState(false);
  const pullDownScreen = async () => {
    await setRefresh(true);
    await setTimeout(() => {
      setRefresh(false);
    }, 10);
    await setCallbackState(!callbackState);
  };

  const goToLevel = () => {
    navigation.navigate('QhotoLevel');
  };
  const goToQuestLog = () => {
    navigation.navigate('QhotoLog', {logs: userLogs});
  };
  const goToEditMyProfile = () => {
    navigation.navigate('EditMyProfile', {userInfo: userInfo});
  };

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [userLogs, setUserLogs] = useState<UserLog[]>();
  const [callbackState, setCallbackState] = useState(true);

  useEffect(() => {
    getUserInfoApi(
      (res: any) => {
        console.log(res.data);
        let {
          email,
          joinDate,
          nickname,
          name,
          phone,
          profileOpen,
          description,
          userImage,
          contactAgreeDate,
          totalExp,
          expGrade,
        } = res.data;

        setUserInfo({
          email,
          joinDate,
          nickname,
          name,
          phone,
          profileOpen,
          description,
          userImage,
          contactAgreeDate,
          totalExp,
          expGrade,
        });

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
      },
      (err: any) => console.log(err.response.data),
    );

    getUserLog(
      (res: any) => {
        console.log(res.data);
        setUserLogs(res.data);
      },
      (err: any) => {
        console.log(err.data);
      },
    );
  }, [callbackState, isFocused]);

  const [editable, setEditable] = useState(false);

  // 안드로이드를 위한 모달 visible 상태값
  const [changeModalVisible, setChangeModalVisible] = useState(false);

  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      // 안드로이드
      setChangeModalVisible(true); // visible = true
    } else {
      // iOS
    }
  };

  const launchCameraOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
    saveToPhotos: true,
    includeExtra: true, // If true, will include extra data which requires library permissions to be requested (i.e. exif data)
  };

  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
    includeExtra: true,
    // presentationStyle,
  };

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    if (res.assets[0].type == 'image/jpeg') {
      savePhoto(res.assets[0].uri);
    }
  };

  const savePhoto = (uri: string) => {
    const uriPath = uri.split('//').pop();
    const imageName = uri.split('/').pop();

    PhotoEditor.Edit({
      path: uriPath,
      colors: undefined,
      // hiddenControls: ['save'],
      onDone: async res => {
        const data = new FormData();
        data.append('file', {
          name: imageName,
          type: 'image/jpeg',
          uri: 'file://' + uriPath,
        });
        await editMyProfileApi(
          data,
          res => {
            console.log('editMyProfileApi - res', res);
            setCallbackState(!callbackState);
          },
          (err: any) => {
            console.log('editMyProfileApi - err', err.response);
          },
        );
      },
      onCancel: () => {
        console.log('on cancel');
      },
    });
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(launchCameraOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  //Icon
  let rightIcon = editable ? (
    <TouchableOpacity
      onPress={() => setEditable(false)}
      style={styles.rightIcon}>
      <Text style={{color: 'black'}}>완료</Text>
    </TouchableOpacity>
  ) : (
    <Ionicons
      name="settings-outline"
      size={30}
      color="#3B28B1"
      onPress={() => goToEditMyProfile()}
      style={styles.rightIcon} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    />
  );

  return userInfo === undefined || userLogs === undefined ? null : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => pullDownScreen()}
        />
      }>
      <SafeAreaView>
        <QhotoHeader leftIcon={false} rightIcon={rightIcon} />
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{uri: userInfo.userImage}}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                bottom: 5,
                right: 5,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#E0E0E0',
              }}
              onPress={modalOpen}>
              <AntDesign name="camerao" size={20} color={'#3B28B1'} />
            </TouchableOpacity>
          </View>

          <Text style={{fontSize: 16, color: 'black'}}>
            {userInfo.nickname}
          </Text>
          <Text style={{fontSize: 12, color: 'black'}}>
            {userInfo.description}
          </Text>
        </View>
        <View style={{marginVertical: 10, paddingHorizontal: 30}}>
          <View>
            <TouchableOpacity>
              <Text onPress={goToLevel} style={styles.subjectText}>
                qhoto 레벨 &nbsp;
                <FontAwesome5 name="angle-right" size={20} color={'#3B28B1'} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <LevelBox
              userGrade={userInfo.expGrade}
              userPoint={userInfo.totalExp}
            />
          </View>
        </View>
        <View style={{marginVertical: 10, paddingHorizontal: 30}}>
          <TouchableOpacity>
            <Text onPress={goToQuestLog} style={styles.subjectText}>
              qhoto 로그 &nbsp;
              <FontAwesome5 name="angle-right" size={20} color={'#3B28B1'} />
            </Text>
          </TouchableOpacity>
          <View>
            {userLogs.map((log, index) => (
              <LogItem key={index} log={log} />
            ))}
          </View>
        </View>

        <Modal
          ////////////////////////////////////////////////////////////////////////
          isVisible={changeModalVisible} // modal 나타나는 조건
          animationIn="fadeIn" // 트랜지션 효과 유형(slide - 위로 슬라이드,  fade - 서서히 나타남, none - 없음)
          animationOut="fadeOut" // 트랜지션 효과 유형(slide - 위로 슬라이드,  fade - 서서히 나타남, none - 없음)
          animationOutTiming={10}
          backdropOpacity={0.1}
          onBackdropPress={() => setChangeModalVisible(false)}
          onBackButtonPress={() => setChangeModalVisible(false)}>
          <Pressable
            style={styles.background}
            onPress={() => setChangeModalVisible(false)}>
            <View style={styles.whiteBox}>
              <Pressable
                style={styles.actionButton}
                android_ripple={{color: '#eee'}} // press 시, 물결효과(TouchableOpacity 에선 안됨)
                onPress={() => {
                  onLaunchCamera();
                  setChangeModalVisible(false);
                }}>
                <MaterialIcons
                  name="camera-alt"
                  color="#757575"
                  size={24}
                  style={styles.icon}
                />
                <Text style={styles.modalButtonText}>카메라로 촬영하기</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                android_ripple={{color: '#eee'}}
                onPress={() => {
                  onLaunchImageLibrary();
                  setChangeModalVisible(false);
                }}>
                <MaterialIcons
                  name="photo"
                  color="#757575"
                  size={24}
                  style={styles.icon}
                />
                <Text style={styles.modalButtonText}>사진 선택하기</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectText: {
    color: '#3B28B1',
    fontSize: 20,
    fontFamily: 'MICEGothic-Bold',
    marginBottom: 3,
  },
  profileContainer: {marginTop: 30, alignItems: 'center'},
  profileImageContainer: {
    width: width * 0.3,
    height: width * 0.3,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 100,
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
  rightIcon: {
    position: 'absolute',
    // padding: 10,
    // width: 40,
    // height: 40,
    // top: -10,
    // left: 20,
  },
  actionText: {
    color: 'black',
  },
  modalButtonText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 18,
    color: '#595959',
    marginVertical: height * 0.005,
  },
});

export default MyPage;
