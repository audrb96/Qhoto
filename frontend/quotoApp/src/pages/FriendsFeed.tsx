import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-paper';

function Orders() {
  const [selectedId, setSelectedId] = useState(null);

  const DATA = [
    {
      id: '1',
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
    },
    {
      id: '2',
      title: 'First',
      profile: '사진 url2',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이2',
      profileId: 'hyungjin2',
      feedtime: '오후02:14',
      questtag: 'hobby',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
    },
    {
      id: '3',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'green',
      nickname: '코린이3',
      profileId: 'hyungjin3',
      feedtime: '오후03:51',
      questtag: 'sleep',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
    },
    {
      id: '4',
      title: 'First',
      profile: '사진 url4',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이4',
      profileId: 'hyungjin4.',
      feedtime: '오후06:12',
      questtag: 'check',
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
    },
  ];
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <View style={[styles.item, backgroundColor]}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.2}}>
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
        <View style={{flex: 0.1, backgroundColor: 'red'}}>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: item.questtag,
            }}
          />
        </View>
      </View>
      <View>
        <Image
          style={{width: '100%', height: 200}}
          source={{uri: item.feedImage}}
        />
        {/* <Image
          style={{width: '100%', height: 200}}
          source={{
            uri: 'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
          }}
        /> */}
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>heart icon</Text>
        <Text>icon</Text>
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', flex: 0.15}}>
        <Text style={{fontSize: 45, color: 'purple'}}>quoto</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 0.1,
          alignItems: 'center',
        }}>
        <Text style={{width: 80, textAlign: 'center'}}>DAY</Text>
        <Text style={{width: 80, textAlign: 'center'}}>WEEK</Text>
        <Text style={{width: 80, textAlign: 'center'}}>MONTH</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {},
  title: {
    fontSize: 20,
  },
});

export default Orders;
