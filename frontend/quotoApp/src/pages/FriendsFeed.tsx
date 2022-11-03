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

function FriendsFeed() {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [isLike, setLike] = useState([true, false, true, false]);
  const [isSuccess, setSuccess] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
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

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', flex: 0.5}}>
        <View style={{flex: 0.15}}>
          <Avatar.Image size={30} source={{uri: item.profile}} />
        </View>
        <View style={{flex: 0.7}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar.Image size={15} source={{uri: item.badge}} />
            <Text>{item.nickname}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.profileId}</Text>
            <Text>{item.feedtime}</Text>
          </View>
        </View>
        <View style={{flex: 0.15}}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
            source={{
              uri: item.questtag,
            }}
          />
        </View>
      </View>
      <View style={{height: 200, width: '100%'}}>
        {isSuccess ? (
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
              source={{uri: item.feedImage}}
            />
          </TouchableOpacity>
        ) : (
          <ImageBackground
            source={{uri: item.feedImage}}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              setLike([
                ...isLike.slice(0, item.id),
                !isLike[item.id],
                ...isLike.slice(item.id + 1),
              ]);
            }}>
            <AntDesign
              name={item.like ? 'heart' : 'hearto'}
              size={30}
              color={item.like ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Ionicons name="chatbubble-outline" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', flex: 1, marginVertical: 12}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Avatar.Image size={30} source={{uri: item.profile}} />
        </View>
        <View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text>{item.profileId}</Text>
            <Text>{item.feedtime}</Text>
          </View>
          <View>
            <Text>댓글을 써주세요</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'green' : 'orange';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
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
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          style={{flex: 1}}
        />
      </View>
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
            console.log(111);
            setModalVisible(!modalVisible);
          }}>
          <Pressable style={styles.modalView}>
            <SelectedFeed parentFunction={parentFunction} />
          </Pressable>
        </Pressable>
      </Modal>
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
