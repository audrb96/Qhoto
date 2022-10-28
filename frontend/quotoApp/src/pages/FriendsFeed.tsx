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
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

function Orders() {
  const [selectedId, setSelectedId] = useState(null);
  const [isLike, setLike] = useState([true, false, true, false]);
  const [isSuccess, setSuccess] = useState(false);
  const [isSelect, setSelect] = useState('DAY');

  const DATA = [
    {
      id: '0',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'red',
      nickname: '코린이1',
      profileId: 'hyungjin1asdfasdfasdf',
      feedtime: '오후02:00',
      questtag:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[0],
    },
    {
      id: '1',
      title: 'First',
      profile: '사진 url2',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이2',
      profileId: 'hyungjin2',
      feedtime: '오후02:14',
      questtag:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[1],
    },
    {
      id: '2',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'green',
      nickname: '코린이3',
      profileId: 'hyungjin3',
      feedtime: '오후03:51',
      questtag:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[2],
    },
    {
      id: '3',
      title: 'First',
      profile: '사진 url4',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이4',
      profileId: 'hyungjin4.',
      feedtime: '오후06:12',
      questtag:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: isLike[3],
    },
  ];
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
        <View style={{flex: 0.15, backgroundColor: 'blue'}}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
            source={{
              uri: item.questtag,
            }}
          />
        </View>
      </View>
      <View style={{backgroundColor: 'green', height: 200, width: '100%'}}>
        {isSuccess ? (
          <Image
            style={
              isSuccess
                ? {width: '100%', height: '100%', resizeMode: 'stretch'}
                : {width: '100%', height: '100%', resizeMode: 'stretch'}
            }
            source={{uri: item.feedImage}}
          />
        ) : (
          <ImageBackground
            source={{uri: item.feedImage}}
            style={{flex: 1, resizeMode: 'cover'}}
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
              console.log(1);
            }}>
            <Ionicons name="chatbubble-outline" size={30} color={'black'} />
          </TouchableOpacity>
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center', flex: 0.2}}>
        <Text style={{fontSize: 45, color: 'purple'}}>quoto</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 0.1,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            axios
              .get('https://picsum.photos/v2/list?page=2&limit=5')
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}>
          <Text style={{width: 80, textAlign: 'center'}}>DAY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{width: 80, textAlign: 'center'}}>WEEK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{width: 80, textAlign: 'center'}}>MONTH</Text>
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
    </SafeAreaView>
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
});

export default Orders;
