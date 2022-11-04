import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';

import QuestCard from '../components/main/QuestCard';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questTypes = ['DAILY', 'WEEKLY', 'MONTHLY'];

interface Quest {
  questId: number;
  questName: string;
  questType: string;
  questScore: number;
  questDifficulty: number;
  questImage: string;
}

const {width, height} = Dimensions.get('window');
console.log(RNFS.DocumentDirectoryPath);

function Settings() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [photo, setPhoto] = React.useState('');

  const questLists: Quest[][] = [
    [
      {
        questId: 1,
        questName: '일회용기 쓰지 않기',
        questType: '환경',
        questScore: 100,
        questDifficulty: 1,
        questImage: '',
      },
      {
        questId: 2,
        questName: '하루 3km 뛰기',
        questType: '건강',
        questScore: 200,
        questDifficulty: 2,
        questImage: '',
      },
      {
        questId: 3,
        questName: '보라색이 들어간 옷 입기',
        questType: '색깔',
        questScore: 300,
        questDifficulty: 3,
        questImage: '',
      },
    ],
    [
      {
        questId: 4,
        questName: '고양이 사진찍기',
        questType: '일상',
        questScore: 200,
        questDifficulty: 1,
        questImage: '',
      },
      {
        questId: 5,
        questName: '하루 한끼 비건식단으로 먹어보기',
        questType: '건강',
        questScore: 400,
        questDifficulty: 2,
        questImage: '',
      },
      {
        questId: 6,
        questName: '친구에게 꽃 선물해주기',
        questType: '이색',
        questScore: 600,
        questDifficulty: 3,
        questImage: '',
      },
    ],
    [
      {
        questId: 7,
        questName: '다같이 단풍산 등산하기',
        questType: '건강',
        questScore: 300,
        questDifficulty: 1,
        questImage: '',
      },
      {
        questId: 8,
        questName: '할로윈 페스티벌 참여해보기',
        questType: '이색',
        questScore: 600,
        questDifficulty: 2,
        questImage: '',
      },
      {
        questId: 9,
        questName: '브라질리언 왁싱 받아보기',
        questType: '일상',
        questScore: 900,
        questDifficulty: 3,
        questImage: '',
      },
    ],
  ];

  const savePhoto = (uri: string) => {
    let photoPath = RNFS.DocumentDirectoryPath + '/photo.jpg';
    console.log(RNFS.DocumentDirectoryPath + '/photo.jpg');
    RNFS.moveFile(uri, photoPath)
      .then(() => {
        PhotoEditor.Edit({
          path: RNFS.DocumentDirectoryPath + '/photo.jpg',
          // stickers: [
          //   'sticker0',
          //   'sticker1',
          //   'sticker2',
          //   'sticker3',
          //   'sticker4',
          //   'sticker5',
          //   'sticker6',
          //   'sticker7',
          //   'sticker8',
          //   'sticker9',
          //   'sticker10',
          // ],
          // hiddenControls: [
          //   'clear',
          //   'crop',
          //   'draw',
          //   'save',
          //   'share',
          //   'sticker',
          //   'text',
          // ],
          colors: undefined,
          onDone: async res => {
            // const response = await RNFS.readFile(
            //   RNFS.DocumentDirectoryPath + '/photo.jpg',
            // );
            console.log(res);
            // setPhoto(response);
            setModalVisible(false);
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

  const handlePhotoClick = () => {
    launchCamera({...options, mediaType: 'photo'}, onPickImage);
  };

  const handleVideoClick = () => {
    launchCamera({...options, mediaType: 'video'}, onPickImage);
  };

  const options = {
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 768,
    maxHeight: 768,
    saveToPhotos: true,
    includeBase64: Platform.OS === 'android',
  };

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    savePhoto(res.assets[0].uri);
  };

  AsyncStorage.getItem('accessToken', (err, result) => {
    console.log(result);
  });

  return (
    <View style={styles.body}>
      <View style={styles.questCardContainer}>
        <Carousel
          loop
          width={width}
          height={(height * 4) / 7}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 160,
          }}
          data={questTypes}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <QuestCard
              questType={questTypes[index]}
              questList={questLists[index]}
            />
          )}
        />
      </View>
      <View style={styles.questButtonContainer}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={styles.questButton}
            onPress={() => {
              setModalVisible(!modalVisible);
              // const result = launchCamera(options, onPickImage);
            }}>
            <Icon name="camera" color="white" size={50} />
          </Pressable>
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
        backdropOpacity={0.1}
        deviceWidth={width}
        deviceHeight={height}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        style={{margin: 0}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.modal}>
            <Pressable style={styles.modalButton} onPress={handlePhotoClick}>
              <Text style={styles.modalButtonText}>
                <Icon name="camera-retro" size={18} /> &nbsp;&nbsp; 사진 촬영
              </Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleVideoClick}>
              <Text style={styles.modalButtonText}>
                <Icon name="video-camera" size={18} /> &nbsp;&nbsp; 동영상 촬영
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  questCardContainer: {
    flex: 3,
  },
  questButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 45,
    backgroundColor: '#4B179F',
  },
  modal: {
    backgroundColor: 'white',
  },
  modalButton: {
    width: '100%',
    padding: 20,
  },
  modalButtonText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 18,
    color: '#595959',
  },
});

export default Settings;
