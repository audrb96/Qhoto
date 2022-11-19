import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';

import FeedItem from '../../components/feed/FeedItem';
import info from '../../components/info';

import {getFriendsFeeds, setFeedMission} from '../../api/feed';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const tabMenu = ['DAY', 'WEEK', 'MONTH'];

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

const {width, height} = Dimensions.get('window');

function FriendsFeed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendFeeds, setFriendFeeds] = useState<Feed[]>();
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedQuests, setSelectedQuests] = useState([true, true, true]);
  const [questLists, setQuestLists] = useState<{[key: string]: Quest[]}>();
  const [callbackState, setCallbackState] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const {userDailyState, userWeeklyState, userMonthlyState} = useSelector(
    (state: RootState) => state.user,
  );

  const navigation = useNavigation();
  const pullDownScreen = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 10);
    setCallbackState(!callbackState);
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
    console.log('-------');
  }, [callbackState]);

  useEffect(() => {
    if (questLists !== undefined) {
      setSelectedTab('DAY');
    }
  }, [questLists]);

  useEffect(() => {
    if (selectedTab !== '') {
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
      getFriendsFeeds(
        selectedTab.charAt(0),
        condition,
        (res: any) => {
          console.log(res);
          setFriendFeeds(res.data.content);
        },
        (err: any) => {
          console.log(err.response.data);
        },
      );
    }
  }, [selectedQuests]);

  const handleCheckQuestClick = () => {};

  const handleCommentClick = (feedId: number) => {
    navigation.navigate('CommentPage', {feedId});
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
        {friendFeeds === undefined ? null : friendFeeds.length === 0 ? (
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
              onPress={handleCheckQuestClick}>
              <Text style={styles.noAccessButtonText}>
                퀘스트 완료하러 가기
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => pullDownScreen()}
              />
            }>
            {friendFeeds.map((feed, index) => (
              <FeedItem
                key={index}
                feed={feed}
                handleCommentClick={() => handleCommentClick(feed.feedId)}
                isAccessable={
                  selectedTab === 'DAY'
                    ? userDailyState
                    : selectedTab === 'WEEK'
                    ? userWeeklyState
                    : userMonthlyState
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(!modalVisible)}>
        <FontAwesome name="th-list" color="white" size={30} />
      </TouchableOpacity>
      {questLists === undefined || selectedTab === '' ? null : (
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
                  style={[
                    styles.filterOptionItem,
                    {
                      backgroundColor: selectedQuests[index]
                        ? 'white'
                        : 'white',
                    },
                  ]}
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
});

export default FriendsFeed;
