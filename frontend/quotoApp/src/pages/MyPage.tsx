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
import {RootState} from '../store/reducer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import ImageModal from 'react-native-image-modal';

import QhotoHeader from '../components/QhotoHeader';
import UploadModeModal from '../components/mypage/UploadModeModal';
import ProfileImageModal from '../components/mypage/ProfileImageModal';
import ImageModal from 'react-native-image-modal';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {getUserInfo} from '../api/mypage';

function MyPage({navigation}: null) {
  const dispatch = useAppDispatch();

  const goToLevel = () => {
    navigation.navigate('QhotoLevel', {userPoint: userPoint});
  };
  const goToQuestLog = () => {
    navigation.navigate('QuestLog');
  };

  // // Todo: 왜 userPoint 만 못가져옴?? 숫자라서 그런가??
  // // const userPoint = useSelector((state: RootState) => state.user.userPoint);
  let backgroundColor = 'red';
  let colorName = '';
  let nextColorName = '';
  let minPoint = 0;
  let maxPoint = 0;

  // Todo: 이것도 컴포넌트화 가능??
  // Todo: 타입스크립트방식으로 해도 지저분하긴함..
  if (userPoint < 50) {
    backgroundColor = '#F94720';
    colorName = '레드';
    nextColorName = '오렌지';
    minPoint = 0;
    maxPoint = 50;
  } else if (userPoint < 200) {
    backgroundColor = '#FEAD0F';
    colorName = '오렌지';
    nextColorName = '옐로우';
    minPoint = 50;
    maxPoint = 200;
  } else if (userPoint < 500) {
    backgroundColor = '#FFEB3B';
    colorName = '옐로우';
    nextColorName = '그린';
    minPoint = 200;
    maxPoint = 500;
  } else if (userPoint < 1000) {
    backgroundColor = '#72D200';
    colorName = '그린';
    nextColorName = '블루';
    minPoint = 500;
    maxPoint = 1000;
  } else if (userPoint < 2500) {
    backgroundColor = '#30C1FF';
    colorName = '블루';
    nextColorName = '네이비';
    minPoint = 1000;
    maxPoint = 2500;
  } else if (userPoint < 5000) {
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

  const [editable, setEditable] = useState(false);
  const [introduction, setIntroduction] = useState('Qhoto 짱이에요~~');

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
    <FontAwesome5
      name="edit"
      size={30}
      color="#3B28B1"
      onPress={() => setEditable(true)}
      style={styles.rightIcon} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    />
  );

  let [email, setEmail] = useState(
    useSelector((state: RootState) => state.user.email),
  );
  let [joinDate, setJoinDate] = useState(
    useSelector((state: RootState) => state.user.joinDate),
  );
  let [userImage, setUserImage] = useState(
    useSelector((state: RootState) => state.user.userImage),
  );
  let [nickname, setNickname] = useState(
    useSelector((state: RootState) => state.user.nickname),
  );
  let [phone, setPhone] = useState(
    useSelector((state: RootState) => state.user.phone),
  );
  let [profileOpen, setProfileOpen] = useState(
    useSelector((state: RootState) => state.user.profileOpen),
  );

  // const joinDate = useSelector((state: RootState) => state.user.joinDate);
  // const userImage = useSelector((state: RootState) => state.user.userImage);
  // const nickname = useSelector((state: RootState) => state.user.nickname);
  // const email = useSelector((state: RootState) => state.user.email);

  const userPoint = 1500;

  useEffect(() => {
    getUserInfo(
      // token,
      res => {
        let {email, joinDate, nickname, phone, profileOpen, userImage} =
          res.data;
        setEmail(email);
        setJoinDate(joinDate);
        setUserImage(userImage);
        setNickname(nickname);
        setPhone(phone);
        setProfileOpen(profileOpen);
        dispatch(
          userSlice.actions.setUser({
            email: email,
            joinDate: joinDate,
            nickname: nickname,
            phone: phone,
            profileOpen: profileOpen,
            userImage: userImage,
            loggedIn: true,
          }),
        );
        console.log('getUserInfo-res : ', res);
        console.log('');
        // Todo: back 에서 point 주면 redux 에 넣어야 함
        // Todo: 유저 point state 관리도 해줘야함
      },
      err => console.log('getUserInfo-err : ', err),
    );
  }, []);

  return (
    <SafeAreaView>
      <QhotoHeader rightIcon={rightIcon} />
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
        <View style={{flexDirection: 'row', paddingTop: 10, marginVertical: 0}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View>
              <ImageModal
                source={{uri: userImage}}
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

              <TouchableOpacity
                style={{position: 'absolute', top: 90, left: 90}}
                onPress={modalOpen}>
                <AntDesign name="camerao" size={20} color={'#3B28B1'} />
              </TouchableOpacity>
            </View>

            <Text style={{fontSize: 16, color: 'black'}}>{nickname}</Text>
            {editable === false ? (
              <Text style={{fontSize: 12, color: 'black'}}>{introduction}</Text>
            ) : (
              <TextInput
                style={{color: 'black'}}
                value={introduction}
                onChangeText={text => setIntroduction(text)}
              />
            )}
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
              onPress={goToLevel}
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
              {userPoint}
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
                  width: 270 * ((userPoint - minPoint) / (maxPoint - minPoint)),
                  height: 5,
                  backgroundColor: 'black',
                  position: 'absolute',
                }}
              />
            </View>
            {userPoint < 5000 ? (
              <Text style={{color: 'black', marginHorizontal: 15}}>
                {nextColorName} 레벨까지 {maxPoint - userPoint} Points 남음
              </Text>
            ) : (
              <Text />
            )}
          </View>
        </View>
      </View>
      <View // quest 로그
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
        <Text style={{color: 'black'}}> joinDate: {joinDate}</Text>
        <Text style={{color: 'black'}}> phone: {phone}</Text>
        <Text style={{color: 'black'}}>
          {' '}
          profileOpen: {profileOpen === true ? 'true' : 'false'}
        </Text>
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
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default MyPage;
