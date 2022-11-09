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
import info from '../../components/info';
import Icon from 'react-native-vector-icons/FontAwesome5';

function FriendsFeed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState(null);
  const [isLike, setLike] = useState([true, false, true, false]);
  const [isSuccess, setSuccess] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [condition, setCondition] = useState([4, 8, 12]);
  const [duration, setDuration] = useState('D');
  const [FriendsFeeds, setFeeds] = useState([]);
  const [commentList, setComment] = useState([]);
  console.log(FriendsFeeds, '찍습니다.');

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

  const parentFunction = () => {
    setModalVisible(!modalVisible);
  };
  const questTypes: {
    [key: string]: {typeName: string; iconName: string; colorCode: string};
  } = info.questTypes;

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
                <View style={{flex: 0.75}}>
                  <View style={{flexDirection: 'row'}}>
                    <Avatar.Image size={15} source={{uri: feed.badge}} />
                    <Text>{feed.nickname}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {/* <Text>{feed.nickname}!!!!!!!!!!!!</Text> */}
                    <Text>{feed.feedTime.slice()}!!!!</Text>
                    <Text>
                      {(() => {
                        if (duration === 'D') {
                          if (parseInt(feed.feedTime.slice(11, 13)) >= 12) {
                            return (
                              '오후' +
                              (
                                '0' +
                                (parseInt(feed.feedTime.slice(11, 13)) - 12)
                              ).slice(-2) +
                              ':' +
                              parseInt(feed.feedTime.slice(14, 16))
                            );
                          } else {
                            return (
                              '오전' +
                              feed.feedTime.slice(11, 13) +
                              ':' +
                              parseInt(feed.feedTime.slice(14, 16))
                            );
                          }
                        } else if (duration === 'W') {
                          return feed.feedTime;
                        } else {
                          return feed.feedTime;
                        }
                      })()}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 0.1}}>
                  <Icon
                    name={questTypes[feed.questType].iconName}
                    color={questTypes[feed.questType].colorCode}
                    style={{fontSize: 30}}
                  />
                </View>
              </View>
              <View style={{height: 200, width: '100%'}}>
                {isSuccess ? (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedFeedId(feed.feedId);
                      getSelectedFeed(
                        feed.feedId,
                        res => {
                          setComment(res.data);
                        },
                        err => {
                          console.log(err.response.data);
                          console.log('getSelectedFeed에러입니다.');
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
                props={[commentList, selectedFeedId]}
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
