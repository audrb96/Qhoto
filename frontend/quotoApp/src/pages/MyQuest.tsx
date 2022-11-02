import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Platform,
  View,
  Text,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {launchCamera} from 'react-native-image-picker';

import QuestCard from '../components/main/QuestCard';

import Icon from 'react-native-vector-icons/FontAwesome';

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

function Settings() {
  const [modalVisible, setModalVisible] = React.useState(false);
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

  const options = {
    mediaType: 'mixed',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
  };

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
  };

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
            <Icon name="camera" color="white" size={50}></Icon>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default Settings;