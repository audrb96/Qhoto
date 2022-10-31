import React from 'react';
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
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

function UploadModeModal({visible, onClose}) {
  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
  };

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };
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
