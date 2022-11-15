import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import FeedItem from '../../components/feed/FeedItem';

import {getFriendsFeeds, setFeedMission} from '../../api/feed';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

const {width, height} = Dimensions.get('window');

function FriendsFeed({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendFeeds, setFriendFeeds] = useState<Feed[]>();
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedQuests, setSelectedQuests] = useState([true, true, true]);
  const [questLists, setQuestLists] = useState<{[key: string]: Quest[]}>();
  const [selectedFeedId, setSelectedFeedId] = useState(null);

  useEffect(() => {
    setFeedMission(
      (res: any) => {
        const {dailyOptions, weeklyOptions, monthlyOptions} = res.data.options;
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
    if (questLists) {
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
          console.log(res.data.content);
          setFriendFeeds(res.data.content);
        },
        (err: any) => {
          console.log(err.response.data);
        },
      );
    }
  }, [selectedQuests]);

  const handleMediaClick = () => {
    setModalVisible(true);
  };

  const handleCommentClick = (feedId: number) => {
    navigation.navigate('CommentPage', {feedId});
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.tabMenuContainer}>
        {tabMenu.map((tab, index) => (
          <Pressable
            key={index}
            style={{padding: 5}}
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
            <FontAwesome name="times-circle" size={110} color="#3B28B1" />
            <Text
              style={{
                color: '#3B28B1',
                fontFamily: 'esamanru-Medium',
                fontSize: 22,
                marginTop: 20,
              }}>
              아직 퀘스트를 완료한 친구가 없습니다
            </Text>
          </View>
        ) : (
          <ScrollView>
            {friendFeeds.map((feed, index) => (
              <FeedItem
                key={index}
                feed={feed}
                handleCommentClick={() => handleCommentClick(feed.feedId)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  tabMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  tabMenuText: {
    fontSize: 15,
    marginHorizontal: 10,
    fontFamily: 'Comfortaa-Bold',
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default FriendsFeed;
