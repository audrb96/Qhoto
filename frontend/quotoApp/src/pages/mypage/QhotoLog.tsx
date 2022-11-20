import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Avatar} from 'react-native-paper';
import Video from 'react-native-video';
import Modal from 'react-native-modal';

import info from '../../components/info';

import {getFeedsByDate} from '../../api/feed';
import FeedDetail from '../../components/feed/FeedDetail';

import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/reducer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

const questTypes: {
  [key: string]: {iconName: string; questColorCode: string; typeName: string};
} = info.questTypes;

const timeToString = (time: string) => {
  let strArr = time.split('-');
  return `${strArr[0]}년 ${strArr[1]}월 ${strArr[2]}일`;
};

interface marker {
  selected: boolean;
  customStyles: {
    container: {
      backgroundColor: string;
    };
    text: {color: string};
  };
  questName: string;
  typeCode: string;
  feedTime: string;
  feedImage: string;
}

interface Log {
  feedId: number;
  feedImage: string;
  feedTime: string;
  questName: string;
  typeCode: string;
  feedType: string;
}

interface Feed {
  feedId: number;
  userId: number;
  userImage: string;
  nickname: string;
  feedImage: string;
  feedTime: string;
  questName: string;
  questType: string;
  questPoint: number;
  expPoint: number;
  expGrade: string;
  likeStatus: string;
  likeCount: number;
  feedType: string;
  commentList: Comment[];
  duration: string;
}

interface Comment {
  userId: number;
  nickname: string;
  commentContext: string;
  commentTime: string;
}

const levelInfo: {
  [key: string]: {
    gradeColorCode: string;
    colorName: string;
    nextColor: string;
    minPoint: number;
    maxPoint: number;
  };
} = info.levelInfo;

const {width, height} = Dimensions.get('window');

function QhotoLog({route}) {
  const navigation = useNavigation();

  const data: {[key: string]: marker} = {};
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeeds, setSelectedFeeds] = useState<Feed[]>();
  const {nickname, userImage, expGrade} = useSelector(
    (state: RootState) => state.user,
  );

  const dummyData = {
    '2022-11-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-11': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-08': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-06': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-02': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-29': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-27': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-26': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-25': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-24': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-23': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-22': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-21': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-20': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-18': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-17': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-12': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-11': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-08': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-07': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-02': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-30': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-27': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-26': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-25': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-24': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-23': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-22': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-21': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-20': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-19': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-18': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-17': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-12': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-11': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-08': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-07': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-06': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-30': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-29': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-27': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-26': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-25': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-24': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-23': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-22': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-21': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-19': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-18': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-17': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-12': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-06': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-02': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-07-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-07-30': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
  };

  route.params.logs.forEach((item: Log) => {
    const key = item.feedTime.split(' ')[0];
    data[key] = {
      selected: true,
      customStyles: {
        container: {backgroundColor: questTypes[item.typeCode].questColorCode},
        text: {color: 'white'},
      },
      questName: item.questName,
      typeCode: item.typeCode,
      feedTime: item.feedTime,
      feedImage: item.feedImage,
    };
  });

  useEffect(() => {
    if (selectedFeeds === undefined) setModalVisible(false);
    else setModalVisible(true);
  }, [selectedFeeds]);

  const handleDayClick = (day: any) => {
    if (day.dateString in data) {
      getFeedsByDate(
        day.dateString,
        (res: any) => {
          console.log(res.data);
          setSelectedFeeds(res.data);
        },
        (err: any) => {
          console.log(err.response);
        },
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.subject}>
            <Icon name="angle-left" size={20} />
            &nbsp; qhoto 로그
          </Text>
        </TouchableOpacity>
      </View>
      <CalendarList
        pastScrollRange={10}
        futureScrollRange={10}
        scrollEnabled={true}
        showScrollIndicator={true}
        markedDates={data}
        markingType="custom"
        onDayPress={handleDayClick}
        theme={{
          textDayFontWeight: 'bold',
          monthTextColor: '#3B28B1',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 25,
          textMonthFontFamily: 'esamanru-Bold',
          selectedDayTextColor: 'black',
          selectedDayBackgroundColor: 'white',
        }}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setSelectedFeeds(undefined)}
        onBackButtonPress={() => setSelectedFeeds(undefined)}
        backdropOpacity={0.2}
        deviceWidth={width}
        deviceHeight={height}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={200}
        animationOutTiming={200}
        style={{margin: 15}}>
        <View style={styles.detailContainer}>
          {selectedFeeds === undefined ? null : (
            <>
              <View style={styles.detailTopBar}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Avatar.Image size={50} source={{uri: userImage}} />
                  </View>
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 12}}>
                    <Text
                      style={[
                        styles.gradeText,
                        {
                          color: levelInfo[expGrade].gradeColorCode,
                        },
                      ]}>
                      {levelInfo[expGrade].colorName}
                    </Text>
                    <Text style={styles.userNameText}>{nickname}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedFeeds(undefined)}>
                  <FontAwesome name="close" color="#BDBDBD" size={30} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{paddingHorizontal: 20}}>
                {selectedFeeds.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          backgroundColor: '#525252',
                          color: 'white',
                          paddingHorizontal: 10,
                          fontSize: 15,
                          marginRight: 10,
                        }}>
                        {item.duration}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'esamanru-Medium',
                          color: '#525252',
                        }}>
                        {timeToString(item.feedTime.split(' ')[0]) +
                          ' ' +
                          item.feedTime.slice(11)}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRadius: 12,
                        paddingVertical: 12,
                        marginBottom: 10,
                        backgroundColor:
                          questTypes[item.questType].questColorCode,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontFamily: 'esamanru-Medium',
                          textAlign: 'center',
                        }}>
                        <Icon
                          name={questTypes[item.questType].iconName}
                          color="white"
                          size={15}
                        />
                        &nbsp;&nbsp;
                        {questTypes[item.questType].typeName}퀘스트{' : '}
                        {item.questName.split('<br>').map(item => `${item} `)}
                      </Text>
                    </View>
                    {item.feedType === 'IMAGE' ? (
                      <Image
                        source={{uri: item.feedImage}}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                          borderRadius: 20,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Video
                        source={{
                          uri: item.feedImage,
                        }}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                          borderRadius: 20,
                        }}
                        resizeMode="cover"
                        repeat={true}
                      />
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 20,
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: 'MICEGothic-Bold',
                          color: questTypes[item.questType].questColorCode,
                          marginRight: 10,
                        }}>
                        <FontAwesome
                          name="heart"
                          size={20}
                          color={questTypes[item.questType].questColorCode}
                        />
                        &nbsp;
                        {item.likeCount}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: 'MICEGothic-Bold',
                          color: questTypes[item.questType].questColorCode,
                        }}>
                        <FontAwesome
                          name="comment"
                          size={20}
                          color={questTypes[item.questType].questColorCode}
                        />
                        &nbsp;
                        {item.commentList.content.length}
                      </Text>
                    </View>
                    <View style={{paddingHorizontal: 10, marginBottom: 30}}>
                      {item.commentList.content.map(comment => (
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 17,
                            }}>
                            {comment.nickname}
                          </Text>
                          &nbsp;&nbsp;
                          {comment.commentContext}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjectContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  subject: {
    color: '#3B28B1',
    fontSize: 20,
    fontFamily: 'esamanru-Medium',
  },
  gradeText: {fontFamily: 'esamanru-Bold', fontSize: 14},
  userNameText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  detailContainer: {flex: 0.8, borderRadius: 20, backgroundColor: 'white'},
  detailTopBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
});

export default QhotoLog;
