import React, {useState} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  launchImageLibrary,
  launchCamera,
  ImagePicker,
} from 'react-native-image-picker';
import {useAppDispatch} from '../../store';
import userSlice from '../../slices/user';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import sticker0 from '../../assets/sticker0.png';

function UploadModeModal({visible, onClose, setImageUri, imageUri}) {
  const dispatch = useAppDispatch();

  // const imagePickerOption = {
  //   mediaType: 'photo',
  //   maxWidth: 768,
  //   maxHeight: 768,
  //   includeBase64: Platform.OS === 'android',
  //   includeExtra: true,
  //   // presentationStyle,
  // };

  // const launchCameraOption = {
  //   mediaType: 'mixed',
  //   maxWidth: 768,
  //   maxHeight: 768,
  //   includeBase64: Platform.OS === 'android',
  //   saveToPhotos: true,
  //   includeExtra: true, // If true, will include extra data which requires library permissions to be requested (i.e. exif data)
  //   // storageOptions: {
  //   //   path: '/images', //카메라로 캡쳐시에 저장될 폴더명 [ Pictures/[path] 경로]
  //   // },
  // };

  // // 선택 사진 또는 촬영된 사진 정보
  // const onPickImage = res => {
  //   if (res.didCancel || !res) {
  //     return;
  //   }
  //   console.log('PickImage', res);
  //   setImageUri(res.assets[0].uri);
  //   dispatch(
  //     userSlice.actions.setUser({
  //       userImage: res.assets[0].uri, // Todo: 나중에 axios 로 back 으로 보내고 다시 유저 받아서 dispatch 해주고 store 에 저장해야함
  //       loggedIn: true,
  //     }),
  //   );
  //   PhotoEditor.Edit({
  //     path: 'https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg',
  //     stickers: [
  //       sticker0,
  //       // 'sticker1',
  //       // 'sticker2',
  //       // 'sticker3',
  //       // 'sticker4',
  //       // 'sticker5',
  //       // 'sticker6',
  //       // 'sticker7',
  //       // 'sticker8',
  //       // 'sticker9',
  //       // 'sticker10',
  //     ],
  //     hiddenControls: [
  //       'clear',
  //       'crop',
  //       'draw',
  //       'save',
  //       'share',
  //       'sticker',
  //       'text',
  //     ],
  //     colors: undefined,
  //     onDone: () => {
  //       console.log('on done');
  //     },
  //     onCancel: () => {
  //       console.log('on cancel');
  //     },
  //   });
  // };

  // // 카메라 촬영
  // const onLaunchCamera = () => {
  //   launchCamera(launchCameraOption, onPickImage);
  // };

  // // 갤러리에서 사진 선택
  // const onLaunchImageLibrary = () => {
  //   launchImageLibrary(imagePickerOption, onPickImage);
  // };
  return (
    <Modal
      visible={visible} // modal 나타나는 조건
      transparent={true} // false 로 하면 버튼을 눌렀던 page 가 안보임
      animationType="fade" // 트랜지션 효과 유형(slide - 위로 슬라이드,  fade - 서서히 나타남, none - 없음)
      onRequestClose={onClose} // 안드로이드에서 뒤로가기 버튼을 눌렀을 때 호출되는 함수
    >
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}} // press 시, 물결효과(TouchableOpacity 에선 안됨)
            onPress={() => {
              onLaunchCamera();
              onClose();
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
              onClose();
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
});
export default UploadModeModal;
