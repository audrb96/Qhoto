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
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';

import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';

import info from '../../components/info';

import {setFeedMission, getAllFeeds} from '../../api/feed';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeedDetail from '../../components/feed/FeedDetail';
import AllFeedStackScreen from './AllFeedStackScreen';

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

const tabMenu = ['DAY', 'WEEK', 'MONTH'];
const {width, height} = Dimensions.get('window');
const columnNum = 3;

function AllFeed({navigation}) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [allFeeds, setAllFeeds] = useState<Feed[]>();
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedQuests, setSelectedQuests] = useState([true, true, true]);
  const [questLists, setQuestLists] = useState<{[key: string]: Quest[]}>();

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
        {allFeeds?.length === 0 ? (
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
                onPress={() => setDetailModalVisible(!detailModalVisible)}>
                {item.feedType === 'IMAGE' ? (
                  <Image
                    style={[
                      {width: '100%', height: '100%', resizeMode: 'cover'},
                    ]}
                    source={{
                      uri: item.feedImage,
                    }}
                  />
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
        onBackdropPress={() => setDetailModalVisible(!detailModalVisible)}
        onBackButtonPress={() => setDetailModalVisible(!detailModalVisible)}
        backdropOpacity={0.1}
        deviceWidth={width}
        deviceHeight={height}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
        animationIn="bounceIn"
        animationOut="bounceOut"
        style={{margin: 15}}>
        <View style={styles.detailContainer}>
          <View style={{}}>
            <FontAwesome name="close" />
          </View>
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
  detailContainer: {flex: 1, backgroundColor: 'red'},
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
