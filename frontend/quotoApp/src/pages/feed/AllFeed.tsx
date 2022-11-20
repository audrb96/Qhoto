import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';

import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/reducer';

import info from '../../components/info';

import {setFeedMission, getAllFeeds, getSelectedFeed} from '../../api/feed';

import FeedDetail from '../../components/feed/FeedDetail';
import AllFeedStackScreen from './AllFeedStackScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Quest {
  questId: number;
  activeQuestId: number;
  questName: string;
  questType: string;
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
}

interface Comment {
  userId: number;
  nickname: string;
  commentContext: string;
  commentTime: string;
}

const questTypes: {
  [key: string]: {
    typeName: string;
    iconName: string;
    questColorCode: string;
    stamp: any;
  };
} = info.questTypes;

const levelInfo: {
  [key: string]: {
    gradeColorCode: string;
    colorName: string;
    nextColor: string;
    minPoint: number;
    maxPoint: number;
  };
} = info.levelInfo;

const timeToString = (time: string) => {
  let strArr = time.split('-');
  return `${strArr[0]}년 ${strArr[1]}월 ${strArr[2]}일`;
};

const tabMenu = ['DAY', 'WEEK', 'MONTH'];
const {width, height} = Dimensions.get('window');
const columnNum = 3;

function AllFeed() {
  const myNickname = useSelector((state: RootState) => state.user.nickname);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [allFeeds, setAllFeeds] = useState<Feed[]>();
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedQuests, setSelectedQuests] = useState([true, true, true]);
  const [selectedFeed, setSelectedFeed] = useState<Feed>();
  const [questLists, setQuestLists] = useState<{[key: string]: Quest[]}>();
  const [isAccessable, setIsAccessable] = useState(false);
  const navigation = useNavigation();
  const {userDailyState, userWeeklyState, userMonthlyState} = useSelector(
    (state: RootState) => state.user,
  );

  const accessState: {[key: string]: boolean} = {
    DAY: userDailyState,
    WEEK: userWeeklyState,
    MONTH: userMonthlyState,
  };

  const goToOtherPage = selectedFeed => {
    if (selectedFeed.nickname === myNickname) {
      navigation.navigate('MyPageStackScreen');
    } else {
      navigation.navigate('OtherPage', {userId: selectedFeed.userId});
    }
  };

  useEffect(() => {
    setFeedMission(
      (res: any) => {
        const {dailyOptions, weeklyOptions, monthlyOptions} = res.data.options;
        console.log(dailyOptions);
        const newQuestLists: {[key: string]: Quest[]} = {};
        newQuestLists.DAY = dailyOptions;
        newQuestLists.WEEK = weeklyOptions;
        newQuestLists.MONTH = monthlyOptions;
        setQuestLists(newQuestLists);
      },
      (err: any) => {
        console.log(err.response);
      },
    );
  }, []);

  useEffect(() => {
    if (questLists !== undefined) {
      setIsAccessable(userDailyState);
      setSelectedTab('DAY');
    }
  }, [questLists]);

  useEffect(() => {
    setAllFeeds(undefined);
    if (selectedTab !== '') {
      setIsAccessable(
        selectedTab === 'DAY'
          ? userDailyState
          : selectedTab === 'WEEK'
          ? userWeeklyState
          : userMonthlyState,
      );
      setSelectedQuests([true, true, true]);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (questLists !== undefined) {
      let condition = '';
      questLists[selectedTab].forEach((item, index) => {
        if (selectedQuests[index]) {
          condition += `${item.activeQuestId},`;
        }
      });
      getAllFeeds(
        selectedTab.charAt(0),
        condition,
        (res: any) => {
          console.log(res.data.content);
          setAllFeeds(res.data.content);
        },
        (err: any) => {
          console.log(err.response.data);
        },
      );
    }
  }, [selectedQuests]);

  useEffect(() => {
    if (selectedFeed === undefined) setDetailModalVisible(false);
    else setDetailModalVisible(true);
  }, [selectedFeed]);

  const handleItemClick = (feedId: number) => {
    getSelectedFeed(
      feedId,
      (res: any) => {
        console.log(res.data);
        setSelectedFeed(res.data);
      },
      (err: any) => {
        console.log(err.response);
      },
    );
  };

  const handleCheckQuestClick = () => {
    navigation.navigate('MyQuest');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.tabMenuContainer}>
        {tabMenu.map((tab, index) => (
          <Pressable
            key={index}
            style={{
              width: 90,
              paddingVertical: 10,
            }}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabMenuText,
                {color: selectedTab === tab ? '#3B28B1' : '#9A9A9A'},
              ]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{flex: 1}}>
        {!accessState[selectedTab] ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="eye-slash"
              size={50}
              color="#3B28B1"
              style={{marginBottom: 10}}
            />
            <Text style={styles.noAccessText}>퀘스트를 완료하고</Text>
            <Text style={styles.noAccessText}>
              다른 친구들의 피드를 확인하세요
            </Text>
            <TouchableOpacity
              style={styles.noAccessButton}
              onPress={() => handleCheckQuestClick()}>
              <Text style={styles.noAccessButtonText}>
                퀘스트 완료하러 가기
              </Text>
            </TouchableOpacity>
          </View>
        ) : allFeeds?.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name="times-circle" size={110} color="#3B28B1" />
            <Text
              style={{
                color: '#3B28B1',
                fontFamily: 'esamanru-Medium',
                fontSize: 22,
                marginTop: 20,
              }}>
              완료한 퀘스트가 없습니다
            </Text>
          </View>
        ) : (
          <FlatList
            data={allFeeds}
            onLayout={e => {}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.allFeedItem}
                onPress={() => handleItemClick(item.feedId)}>
                {item.feedType === 'IMAGE' ? (
                  <ImageBackground
                    style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                    source={{
                      uri: item.feedImage,
                    }}
                    blurRadius={isAccessable ? 0 : 30}></ImageBackground>
                ) : (
                  <Video
                    source={{
                      uri: item.feedImage,
                    }}
                    style={[{width: '100%', height: '100%'}]}
                    resizeMode={'cover'}
                    repeat={true}
                    paused={true}
                  />
                )}
              </TouchableOpacity>
            )}
            numColumns={columnNum}
          />
        )}
      </View>

      <Modal
        isVisible={detailModalVisible}
        onBackdropPress={() => setSelectedFeed(undefined)}
        onBackButtonPress={() => setSelectedFeed(undefined)}
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
          {selectedFeed === undefined ? null : (
            <>
              <View style={styles.detailTopBar}>
                <View style={styles.userInfo}>
                  <Pressable onPress={() => goToOtherPage(selectedFeed)}>
                    <Avatar.Image
                      size={50}
                      source={{uri: selectedFeed.userImage}}
                    />
                  </Pressable>
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 12}}>
                    <Text
                      style={[
                        styles.gradeText,
                        {
                          color:
                            levelInfo[selectedFeed.expGrade].gradeColorCode,
                        },
                      ]}>
                      {levelInfo[selectedFeed.expGrade].colorName}
                    </Text>
                    <Text style={styles.userNameText}>
                      {selectedFeed.nickname}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setDetailModalVisible(!detailModalVisible)}>
                  <FontAwesome name="close" color="#BDBDBD" size={30} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{paddingHorizontal: 20}}>
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
                    {selectedTab}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'esamanru-Medium',
                      color: '#525252',
                    }}>
                    {timeToString(selectedFeed.feedTime.split(' ')[0]) +
                      selectedFeed.feedTime.slice(10)}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 12,
                    paddingVertical: 12,
                    marginBottom: 10,
                    backgroundColor:
                      questTypes[selectedFeed.questType].questColorCode,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'esamanru-Medium',
                      textAlign: 'center',
                    }}>
                    <Icon
                      name={questTypes[selectedFeed.questType].iconName}
                      color="white"
                      size={15}
                    />
                    &nbsp;&nbsp;
                    {questTypes[selectedFeed.questType].typeName}퀘스트{' : '}
                    {selectedFeed.questName
                      .split('<br>')
                      .map(item => `${item} `)}
                  </Text>
                </View>
                {selectedFeed.feedType === 'IMAGE' ? (
                  <Image
                    source={{uri: selectedFeed.feedImage}}
                    style={{width: '100%', aspectRatio: 1, borderRadius: 20}}
                    resizeMode="cover"
                  />
                ) : (
                  <Video
                    source={{
                      uri: selectedFeed.feedImage,
                    }}
                    style={{width: '100%', aspectRatio: 1, borderRadius: 20}}
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
                      color: questTypes[selectedFeed.questType].questColorCode,
                      marginRight: 10,
                    }}>
                    <FontAwesome
                      name="heart"
                      size={20}
                      color={questTypes[selectedFeed.questType].questColorCode}
                    />
                    &nbsp;
                    {selectedFeed.likeCount}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'MICEGothic-Bold',
                      color: questTypes[selectedFeed.questType].questColorCode,
                    }}>
                    <FontAwesome
                      name="comment"
                      size={20}
                      color={questTypes[selectedFeed.questType].questColorCode}
                    />
                    &nbsp;
                    {selectedFeed.commentList.content.length}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 10, marginBottom: 30}}>
                  {selectedFeed.commentList.content.map((item, index) => (
                    <Text
                      key={index}
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
                        {item.nickname}
                      </Text>
                      &nbsp;&nbsp;
                      {item.commentContext}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(!filterModalVisible)}>
        <FontAwesome name="th-list" color="white" size={30} />
      </TouchableOpacity>
      {questLists === undefined || selectedTab === '' ? null : (
        <Modal
          isVisible={filterModalVisible}
          onBackdropPress={() => setFilterModalVisible(!filterModalVisible)}
          onBackButtonPress={() => setFilterModalVisible(!filterModalVisible)}
          backdropOpacity={0.1}
          deviceWidth={width}
          deviceHeight={height}
          backdropTransitionInTiming={200}
          backdropTransitionOutTiming={200}
          style={{margin: 0}}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                overflow: 'hidden',
                backgroundColor: 'white',
              }}>
              <View style={{backgroundColor: '#3B28B1', paddingVertical: 15}}>
                <Text
                  style={{
                    fontFamily: 'esamanru-Bold',
                    fontSize: 25,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  QUEST!
                </Text>
              </View>
              {questLists[selectedTab].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.filterOptionItem}
                  onPress={() => {
                    const newSelectBox = [...selectedQuests];
                    newSelectBox[index] = !newSelectBox[index];
                    setSelectedQuests(newSelectBox);
                  }}>
                  <CheckBox
                    value={selectedQuests[index]}
                    animationDuration={0.1}
                    onChange={() => {
                      const newSelectBox = [...selectedQuests];
                      newSelectBox[index] = !newSelectBox[index];
                      setSelectedQuests(newSelectBox);
                    }}
                    tintColors={{
                      true: questTypes[item.questType].questColorCode,
                      false: '#9A9A9A',
                    }}
                  />
                  <Text
                    style={[
                      styles.filterOptionText,
                      {
                        color: selectedQuests[index]
                          ? questTypes[item.questType].questColorCode
                          : '#9A9A9A',
                      },
                    ]}>
                    {item.questName.split('<br>').map(item => `${item} `)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  tabMenuText: {
    fontSize: 16,
    marginHorizontal: 0,
    fontFamily: 'Comfortaa-Bold',
    textAlign: 'center',
  },
  userInfo: {flexDirection: 'row'},
  gradeText: {fontFamily: 'esamanru-Bold', fontSize: 14},
  userNameText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  noAccessText: {
    color: '#3B28B1',
    fontSize: 22,
    fontFamily: 'esamanru-Medium',
    marginBottom: 9,
  },
  noAccessButton: {
    padding: 16,
    backgroundColor: '#3B28B1',
    elevation: 3,
    borderRadius: 15,
  },
  noAccessButtonText: {
    color: 'white',
    fontFamily: 'esamanru-Medium',
    fontSize: 16,
  },
  filterButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 20,
    borderRadius: 40,
    backgroundColor: '#3B28B1',
    elevation: 5,
  },
  filterOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingLeft: 15,
  },
  filterOptionText: {
    fontFamily: 'esamanru-Medium',
    fontSize: 20,
    marginLeft: 10,
  },
  allFeedItem: {
    width: width / columnNum,
    height: width / columnNum,
  },
  detailContainer: {flex: 0.8, borderRadius: 20, backgroundColor: 'white'},
  detailTopBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: 350,
    height: 650,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    borderWidth: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'black',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  onText: {
    width: 80,
    textAlign: 'center',
    color: 'purple',
  },
  offText: {
    width: 80,
    textAlign: 'center',
    color: 'black',
  },
});

export default AllFeed;
