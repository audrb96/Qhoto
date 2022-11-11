import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  Modal,
  Pressable,
  StyleSheet,
  NativeModules,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
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
}

function MyPage({navigation}: any) {
  const dispatch = useAppDispatch();

  const goToLevel = () => {
    navigation.navigate('QhotoLevel');
  };
  const goToQuestLog = () => {
    navigation.navigate('QhotoLog');
  };
  const goToEditMyProfile = () => {
    navigation.navigate('EditMyProfile', {userInfo: userInfo});
  };

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [userLog, setUserLog] = useState<UserLog[]>();

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
            email: email,
            joinDate: joinDate,
            userImage: userImage,
            phone: phone,
            nickname: nickname,
            description: description,
            contactAgreeDate: contactAgreeDate,
            profileOpen: profileOpen,
            loggedIn: true,
          }),
        );
      },
      (err: any) => console.log(err.response.data),
    );

    getUserLog(
      (res: any) => {
        console.log(res.data);
        setUserLog(res.data);
      },
      (err: any) => {
        console.log(err.data);
      },
    );
  }, []);

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

  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
    includeExtra: true,
    // presentationStyle,
  };

  const launchCameraOption = {
    mediaType: 'mixed',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
    saveToPhotos: true,
    includeExtra: true, // If true, will include extra data which requires library permissions to be requested (i.e. exif data)
  };

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res.assets[0].uri);
    setImageUri(res.assets[0].uri);

    // dispatch(
    //   userSlice.actions.setUser({
    //     userImage: res.assets[0].uri, // Todo: 나중에 axios 로 back 으로 보내고 다시 유저 받아서 dispatch 해주고 store 에 저장해야함
    //     loggedIn: true,
    //   }),
    // );

    savePhoto(res.assets[0].uri);
  };

  const savePhoto = (uri: string) => {
    let DocumentDirectoryPath = RNFS.DocumentDirectoryPath + '/photo.jpg';

    RNFS.moveFile(uri, DocumentDirectoryPath)
      .then(() => {
        PhotoEditor.Edit({
          path: DocumentDirectoryPath,
          colors: undefined,
          // hiddenControls: ['save'],
          onDone: RRRES => {
            console.log('on done', RRRES);
          },
          onCancel: () => {
            console.log('on cancel');
          },
        });
      })

      .catch(err => {
        console.log(err);
        console.log(err.message);
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

  const [imageUri, setImageUri] = useState('');

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
      // onPress={() => setEditable(true)}
      onPress={() => goToEditMyProfile()}
      style={styles.rightIcon} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    />
  );

  return userInfo === undefined || userLog === undefined ? null : (
    <ScrollView>
      <SafeAreaView>
        <QhotoHeader leftIcon={false} rightIcon={rightIcon} />
        <View // 로그아웃 ~ 수정버튼
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity style={{width: 40, height: 60}}>
            <Text>임시logout</Text>
          </TouchableOpacity>
        </View>
        <View // 프로필
        >
          <View style={{alignItems: 'center'}}>
            <View style={styles.profileImageContainer}>
              <Image source={{uri: userInfo.userImage}} resizeMode="cover" />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  bottom: 10,
                  right: 10,
                  borderRadius: 50,
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
            <LevelBox userGrade="orange" userPoint={60} />
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
            {userLog.map((log, index) => (
              <LogItem key={index} log={log} />
            ))}
          </View>
        </View>

        <Modal
          ////////////////////////////////////////////////////////////////////////
          visible={changeModalVisible} // modal 나타나는 조건
          transparent={true} // false 로 하면 버튼을 눌렀던 page 가 안보임
          animationType="fade" // 트랜지션 효과 유형(slide - 위로 슬라이드,  fade - 서서히 나타남, none - 없음)
          onRequestClose={() => setChangeModalVisible(false)} // 안드로이드에서 뒤로가기 버튼을 눌렀을 때 호출되는 함수
        >
          <Pressable
            style={styles.background}
            onPress={() => setChangeModalVisible(false)}>
            <View style={styles.whiteBox}>
              <Pressable
                style={styles.actionButton}
                android_ripple={{color: '#eee'}} // press 시, 물결효과(TouchableOpacity 에선 안됨)
                onPress={() => {
                  onLaunchCamera();
                  () => setChangeModalVisible(false);
                }}>
                <MaterialIcons
                  name="camera-alt"
                  color="#757575"
                  size={24}
                  style={styles.icon}
                />
                <Text style={styles.actionText}>카메라로 촬영하기</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                android_ripple={{color: '#eee'}}
                onPress={() => {
                  onLaunchImageLibrary();
                  () => setChangeModalVisible(false);
                }}>
                <MaterialIcons
                  name="photo"
                  color="#757575"
                  size={24}
                  style={styles.icon}
                />
                <Text style={styles.actionText}>사진 선택하기</Text>
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
  profileImageContainer: {
    width: width * 0.3,
    height: width * 0.3,
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
    backgroundColor: 'black',
  },
  actionText: {
    color: 'black',
  },
});

export default MyPage;
