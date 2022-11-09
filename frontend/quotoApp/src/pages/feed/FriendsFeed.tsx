import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import SelectedFeed from './SelectedFeed';
import {getFriendsFeeds, getSelectedFeed, setFeedMission} from '../../api/feed';
import {ScrollView} from 'react-native-gesture-handler';

function FriendsFeed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLike, setLike] = useState([true, false, true, false]);
  const [isSuccess, setSuccess] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [condition, setCondition] = useState([4, 8, 12]);
  const [duration, setDuration] = useState('D');
  const [FriendsFeeds, setFeeds] = useState([]);
  const [commentList, setComment] = useState([]);

  useEffect(() => {
    let change_condition = '';
    condition.forEach(elem => {
      change_condition += elem + ',';
    });
    const curcondtion = change_condition.substring(
      0,
      change_condition.length - 1,
    );
    const params = [duration, curcondtion];
    async function SetFriendsFeeds() {
      await getFriendsFeeds(
        params,
        res => {
          setFeeds(res.data.content);
        },
        err => {
          console.log(err);
        },
      );
    }
    SetFriendsFeeds();
  }, [duration, condition]);

  const category = {
    environment: 'https://cdn-icons-png.flaticon.com/128/259/259345.png',
    health: 'https://cdn-icons-png.flaticon.com/128/2262/2262878.png',
    daily: 'https://cdn-icons-png.flaticon.com/128/4397/4397734.png',
    special: 'https://cdn-icons-png.flaticon.com/128/2970/2970858.png',
  };

  const DATA = [
    {
      id: '0',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이1',
      profileId: 'hyungjin1asdfasdfasdf',
      feedtime: '오후02:00',
      questtag: category.health,
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[0],
    },
    {
      id: '1',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이2',
      profileId: 'hyungjin2',
      feedtime: '오후02:14',
      questtag: category.daily,
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[1],
    },
    {
      id: '2',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이3',
      profileId: 'hyungjin3',
      feedtime: '오후03:51',
      questtag: category.environment,
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[2],
    },
    {
      id: '3',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이4',
      profileId: 'hyungjin4.',
      feedtime: '오후06:12',
      questtag: category.special,
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[3],
    },
  ];
  const parentFunction = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 0.1,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(0);
            setDuration('D');
          }}>
          <Text
            style={
              selectedIdx === 0
                ? {width: 80, textAlign: 'center', color: 'purple'}
                : {width: 80, textAlign: 'center'}
            }>
            DAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(1);
            setDuration('W');
          }}>
          <Text
            style={
              selectedIdx === 1
                ? {width: 80, textAlign: 'center', color: 'purple'}
                : {width: 80, textAlign: 'center'}
            }>
            WEEK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(2);
            setDuration('M');
          }}>
          <Text
            style={
              selectedIdx === 2
                ? {width: 80, textAlign: 'center', color: 'purple'}
                : {width: 80, textAlign: 'center'}
            }>
            MONTH
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          {FriendsFeeds.map((feed, index) => (
            <View key={index} style={{flex: 1}}>
              <View style={{flexDirection: 'row', flex: 0.5}}>
                <View style={{flex: 0.15}}>
                  <Avatar.Image size={30} source={{uri: feed.userImage}} />
                </View>
                <View style={{flex: 0.7}}>
                  <View style={{flexDirection: 'row'}}>
                    <Avatar.Image size={15} source={{uri: feed.badge}} />
                    <Text>{feed.nickname}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>userId : {feed.userId}</Text>
                    <Text>시간 : {feed.time}</Text>
                  </View>
                </View>
                <View style={{flex: 0.15}}>
                  {/* <Image
                  style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
                  source={{
                    uri: feed.questtag,
                  }}
                /> */}
                  <Text>{feed.questType}</Text>
                </View>
              </View>
              <View style={{height: 200, width: '100%'}}>
                {isSuccess ? (
                  <TouchableOpacity
                    onPress={() => {
                      getSelectedFeed(
                        feed.feedId,
                        res => {
                          setComment(res.data);
                          console.log('설정');
                        },
                        err => {
                          console.log(err);
                        },
                      );
                      setModalVisible(true);
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'stretch',
                      }}
                      source={{uri: feed.feedImage}}
                    />
                  </TouchableOpacity>
                ) : (
                  <ImageBackground
                    source={{uri: feed.feedImage}}
                    style={{flex: 1}}
                    resizeMode="stretch"
                    blurRadius={10}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </ImageBackground>
                )}
              </View>
              <View style={{width: 70}}>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setLike([
                        ...isLike.slice(0, feed.id),
                        !isLike[feed.id],
                        ...isLike.slice(feed.id + 1),
                      ]);
                    }}>
                    <AntDesign
                      name={feed.like ? 'heart' : 'hearto'}
                      size={30}
                      color={feed.like ? 'red' : 'black'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={30}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
              <View style={{flexDirection: 'row', flex: 1, marginVertical: 12}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Avatar.Image
                    size={30}
                    source={{uri: feed.commentUserImage}}
                  />
                </View>
                <View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text>{feed.nickname}</Text>
                    <Text>{feed.feedTime}</Text>
                  </View>
                  <View>
                    <Text>{feed.context}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={styles.centeredView}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Pressable style={styles.modalView}>
              <SelectedFeed
                parentFunction={parentFunction}
                props={commentList}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
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
});

export default FriendsFeed;
