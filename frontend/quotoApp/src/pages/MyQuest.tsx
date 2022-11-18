import React, {useEffect, useState} from 'react';
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

import {useAppDispatch} from '../store';
import questSlice from '../slices/quest';
import userSlice from '../slices/user';

import QuestCard from '../components/main/QuestCard';

import Icon from 'react-native-vector-icons/FontAwesome';
import {getQuestList, uploadVideo, uploadPhoto} from '../api/quest';
import {getUserInfoApi} from '../api/mypage';

import AsyncStorage from '@react-native-async-storage/async-storage';

const questTypes = ['DAILY', 'WEEKLY', 'MONTHLY'];
// const questTypes = ['MONTHLY', 'DAILY', 'WEEKLY'];

interface Quest {
  activeId: number;
  questId: number;
  questName: string;
  questType: string;
  questScore: number;
  questDifficulty: number;
  questImage: string;
}

const {width, height} = Dimensions.get('window');

function MyQuest() {
  const [modalVisible, setModalVisible] = useState(false);
  const [questTypeIdx, setQuestTypeIdx] = useState(0);
  const [dailyQuestIdx, setDailyQuestIdx] = useState(0);
  const [weeklyQuestIdx, setWeeklyQuestIdx] = useState(0);
  const [monthlyQuestIdx, setMonthlyQuestIdx] = useState(0);
  const [dailyQuestList, setDailyQuestList] = useState<Quest[]>();
  const [weeklyQuestList, setWeeklyQuestList] = useState<Quest[]>();
  const [monthlyQuestList, setMonthlyQuestList] = useState<Quest[]>();
  const [callbackState, setCallbackState] = useState(true);

  const dispatch = useAppDispatch();

  const functions = [setDailyQuestIdx, setWeeklyQuestIdx, setMonthlyQuestIdx];

  useEffect(() => {
    getUserInfoApi(
      (response: any) => {
        let {
          nickname,
          email,
          joinDate,
          phone,
          profileOpen,
          description,
          userImage,
          contactAgreeDate,
          expGrade,
          totalExp,
          name,
        } = response.data;
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
      (err: any) => {
        console.log('실패');
        console.log(err);
      },
    );

    getQuestList(
      (res: any) => {
        const {daily, weekly, monthly} = res.data.questList;
        console.log(daily);
        setDailyQuestList(daily);
        setWeeklyQuestList(weekly);
        setMonthlyQuestList(monthly);
        dispatch(
          questSlice.actions.setQuest({
            quest: res.data.questList,
          }),
        );
        const dayState = daily.length === 1 ? true : false;
        const weekState = weekly.length === 1 ? true : false;
        const monthState = monthly.length === 1 ? true : false;

        dispatch(
          userSlice.actions.setQuestState({
            userDailyState: dayState,
            userWeeklyState: weekState,
            userMonthlyState: monthState,
          }),
        );
      },
      (err: any) => {
        console.log(err.response);
      },
    );
  }, [callbackState]);

  const selectQuestList = (index: number) => {
    if (index === 0) {
      return dailyQuestList;
    } else if (index === 1) {
      return weeklyQuestList;
    } else if (index === 2) {
      return monthlyQuestList;
    }
  };

  const handlePhotoClick = () => {
    launchCamera({...options, mediaType: 'photo'}, onPickImage);
    setModalVisible(false);
  };

  const handleVideoClick = () => {
    launchCamera({...options, mediaType: 'video'}, onPickImage);
    setModalVisible(false);
  };

  const options = {
    mediaType: 'video',
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
    if (res.assets[0].type == 'image/jpeg') {
      savePhoto(res.assets[0].uri);
    } else if (res.assets[0].type == 'video/mp4') {
      saveVideo(res.assets[0].uri);
    }
  };

  const saveVideo = (uri: string) => {
    if (
      dailyQuestList === undefined ||
      weeklyQuestList === undefined ||
      monthlyQuestList === undefined
    ) {
      return;
    }

    const uriPath = uri.split('//').pop();
    const videoName = uri.split('/').pop();

    const data = new FormData();
    data.append('feedImage', {
      name: videoName,
      type: 'video/mp4',
      uri: 'file://' + uriPath,
    });
    data.append('location', '멀티캠퍼스');

    if (questTypeIdx === 0) {
      data.append('activeDailyId', dailyQuestList[dailyQuestIdx].activeId);
      data.append('questId', dailyQuestList[dailyQuestIdx].questId);
    } else if (questTypeIdx === 1) {
      data.append('activeWeeklyId', weeklyQuestList[weeklyQuestIdx].activeId);
      data.append('questId', weeklyQuestList[weeklyQuestIdx].questId);
    } else if (questTypeIdx === 2) {
      data.append(
        'activeMonthlyId',
        monthlyQuestList[monthlyQuestIdx].activeId,
      );
      data.append('questId', monthlyQuestList[monthlyQuestIdx].questId);
    }

    uploadVideo(
      data,
      (res: any) => {
        setCallbackState(!callbackState);
      },
      (err: any) => console.log(err.response.data),
    );
  };

  const savePhoto = (uri: string) => {
    if (
      dailyQuestList === undefined ||
      weeklyQuestList === undefined ||
      monthlyQuestList === undefined
    ) {
      return;
    }

    const uriPath = uri.split('//').pop();
    const imageName = uri.split('/').pop();

    PhotoEditor.Edit({
      path: uriPath,
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
        const data = new FormData();
        data.append('feedImage', {
          name: imageName,
          type: 'image/jpeg',
          uri: 'file://' + uriPath,
        });
        data.append('location', '멀티캠퍼스');

        if (questTypeIdx === 0) {
          data.append('activeDailyId', dailyQuestList[dailyQuestIdx].activeId);
          data.append('questId', dailyQuestList[dailyQuestIdx].questId);
        } else if (questTypeIdx === 1) {
          data.append(
            'activeWeeklyId',
            weeklyQuestList[weeklyQuestIdx].activeId,
          );
          data.append('questId', weeklyQuestList[weeklyQuestIdx].questId);
        } else if (questTypeIdx === 2) {
          data.append(
            'activeMonthlyId',
            monthlyQuestList[monthlyQuestIdx].activeId,
          );
          data.append('questId', monthlyQuestList[monthlyQuestIdx].questId);
        }

        await uploadPhoto(
          data,
          (res: any) => {
            setCallbackState(!callbackState);
          },
          (err: any) => console.log(err.response.data),
        );
      },
      onCancel: () => {
        console.log('on cancel');
      },
    });
  };

  return dailyQuestList === undefined ||
    weeklyQuestList === undefined ||
    monthlyQuestList === undefined ? null : (
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
          scrollAnimationDuration={500}
          onSnapToItem={index => setQuestTypeIdx(index)}
          renderItem={({index}) => (
            <QuestCard
              questType={questTypes[index]}
              questList={selectQuestList(index)}
              questIdx={
                index === 0
                  ? dailyQuestIdx
                  : index === 1
                  ? weeklyQuestIdx
                  : monthlyQuestIdx
              }
              setQuestIdx={functions[index]}
              isComplete={selectQuestList(index)?.length === 1 ? true : false}
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
            disabled={selectQuestList(questTypeIdx).length === 1 ? true : false}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Icon
              name={
                selectQuestList(questTypeIdx).length === 1 ? 'check' : 'camera'
              }
              color="white"
              size={50}
            />
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

export default MyQuest;
