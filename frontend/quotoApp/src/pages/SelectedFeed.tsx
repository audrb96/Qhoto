import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

function SelectedFeed() {
  const [isLike, setLike] = useState(false);
  const category = {
    environment: 'https://cdn-icons-png.flaticon.com/128/259/259345.png',
    health: 'https://cdn-icons-png.flaticon.com/128/2262/2262878.png',
    daily: 'https://cdn-icons-png.flaticon.com/128/4397/4397734.png',
    special: 'https://cdn-icons-png.flaticon.com/128/2970/2970858.png',
  };
  const item = [
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
      like: true,
    },
  ];
  const comment_data = [
    {
      id: 'adsfadsfasdf',
      comment: '1번입니다',
    },
    {
      id: 'djfdfus',
      comment: '2번입니다',
    },
    {
      id: 'sdjfkalf4566',
      comment: '3번입니다',
    },
    {
      id: 'aasdfasdfasdf',
      comment: '5번입니다',
    },
    {
      id: 'adsjfkl;asdjflk;',
      comment: '6번입니다',
    },
    {
      id: 'asdfasdfasdf',
      comment: '7번입니다',
    },
  ];

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flex: 0.15}}>
        <View style={{flex: 0.15}}>
          <Avatar.Image size={30} source={{uri: item[0].profile}} />
        </View>
        <View style={{flex: 0.7}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image size={15} source={{uri: item[0].badge}} />
            <Text>{item[0].nickname}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{item[0].profileId}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          backgroundColor: 'red',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          style={{width: '10%', height: '50%', resizeMode: 'stretch'}}
          source={{
            uri: item[0].questtag,
          }}
        />
        <View style={{flex: 0.9}}>
          <Text>퀘스트내용</Text>
        </View>
      </View>
      <View style={{flex: 0.8}}>
        <Image
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'stretch',
          }}
          source={{
            uri: item[0].feedImage,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex: 0.12}}
            onPress={() => {
              setLike(!isLike);
            }}>
            <AntDesign
              name={isLike ? 'heart' : 'hearto'}
              size={20}
              color={isLike ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(1);
            }}>
            <Ionicons name="chatbubble-outline" size={20} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {comment_data.map((item, index) => (
          <View key={index}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 0.5}}>{item.id}</Text>
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default SelectedFeed;
