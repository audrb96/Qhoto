import React, {useEffect, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
// Todo: 사진교체(tmp 파일은 크기가 제각각)
import red_tmp from '../../assets/red_tmp.png';
import orange_tmp from '../../assets/orange_tmp.png';
import yellow_tmp from '../../assets/yellow_tmp.png';
import green_tmp from '../../assets/green_tmp.png';
import blue_tmp from '../../assets/blue_tmp.png';
import navy_tmp from '../../assets/navy_tmp.png';
import purple_tmp from '../../assets/purple_tmp.png';

import QhotoHeader from '../components/QhotoHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function LevelInfo({navigation, route}) {
  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };
  let backgroundColor = 'red';
  let colorName = '';
  let nextColorName = '';
  let minPoint = 0;
  let maxPoint = 0;
  let badge = '';
  const userPoint = route.params.userPoint;
  let id = '';

  // Todo: 이것도 컴포넌트화 가능??
  if (userPoint < 50) {
    backgroundColor = '#F94720';
    colorName = '레드';
    nextColorName = '오렌지';
    nextBadge = orange_tmp;
    minPoint = 0;
    maxPoint = 50;
    badge = red_tmp;
    id = '0';
  } else if (userPoint < 200) {
    backgroundColor = '#FEAD0F';
    colorName = '오렌지';
    nextColorName = '옐로우';
    nextBadge = yellow_tmp;
    minPoint = 50;
    maxPoint = 200;
    badge = orange_tmp;
    id = '1';
  } else if (userPoint < 500) {
    backgroundColor = '#FFEB3B';
    colorName = '옐로우';
    nextColorName = '그린';
    nextBadge = green_tmp;
    minPoint = 200;
    maxPoint = 500;
    badge = yellow_tmp;
    id = '2';
  } else if (userPoint < 1000) {
    backgroundColor = '#72D200';
    colorName = '그린';
    nextColorName = '블루';
    nextBadge = blue_tmp;
    minPoint = 500;
    maxPoint = 1000;
    badge = green_tmp;
    id = '3';
  } else if (userPoint < 2500) {
    backgroundColor = '#30C1FF';
    colorName = '블루';
    nextColorName = '네이비';
    nextBadge = navy_tmp;
    minPoint = 1000;
    maxPoint = 2500;
    badge = blue_tmp;
    id = '4';
  } else if (userPoint < 5000) {
    backgroundColor = '#3CA1FF';
    colorName = '네이비';
    nextColorName = '퍼플';
    nextBadge = purple_tmp;
    minPoint = 2500;
    maxPoint = 5000;
    badge = navy_tmp;
    id = '5';
  } else {
    backgroundColor = '#8343E8';
    colorName = '퍼플';
    minPoint = 5000;
    badge = purple_tmp;
    id = '6';
  }

  const leftIcon = (
    <FontAwesome5
      name="angle-left"
      size={30}
      color="#3B28B1"
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        width: 40,
        height: 40,
        top: -10,
        left: 20,
        // backgroundColor: 'black',
      }} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    />
  );

  const levelData = [
    {
      id: '0',
      color: '레드',
      description: '0 ~ 49 포인트',
      badge: red_tmp,
    },
    {
      id: '1',
      color: '오렌지',
      description: '50 ~ 199 포인트',
      badge: orange_tmp,
    },
    {
      id: '2',
      color: '옐로우',
      description: '200 ~ 499 포인트',
      badge: yellow_tmp,
    },
    {
      id: '3',
      color: '그린',
      description: '500 ~ 999 포인트',
      badge: green_tmp,
    },
    {
      id: '4',
      color: '블루',
      description: '1000 ~ 2499 포인트',
      badge: blue_tmp,
    },
    {
      id: '5',
      color: '네이비',
      description: '2500 ~ 5000 포인트',
      badge: navy_tmp,
    },
    {
      id: '6',
      color: '퍼플',
      description: '5000+ 포인트',
      badge: purple_tmp,
    },
  ];
  //   <View style={{flexDirection: 'row'}}>
  //   <Image source={red_tmp}></Image>
  //   <View style={{flexDirection: 'column'}}>
  //     <Text>레드</Text>
  //     <Text>0 ~ 49 포인트</Text>
  //   </View>
  // </View>

  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        {id !== item.id ? (
          <View
            style={{
              width: 300,
              height: 60,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              position: 'absolute',
              zIndex: 3,
            }}
          />
        ) : (
          <></>
        )}

        <Image source={item.badge} />
        <View style={{flexDirection: 'column', marginTop: 10}}>
          <Text style={{color: '#000000'}}>{item.color}</Text>
          <Text style={{color: '#000000'}}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <QhotoHeader leftIcon={leftIcon} />

      <View style={{alignItems: 'center', flex: 0.3}}>
        <TouchableOpacity>
          <Image
            source={badge}
            style={{width: 100, height: 100, resizeMode: 'cover'}} // Todo: 사진 큰거로 교체해야함, 이거는 화질깨짐
          />
        </TouchableOpacity>
        <View style={{alignSelf: 'flex-end', right: 35}}>
          <Image
            source={nextBadge}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{marginHorizontal: 15, marginVertical: 5}}>
          <View
            style={{
              width: 270,
              height: 3,
              backgroundColor: 'silver',
            }}
          />
          <View
            style={{
              width: 270 * ((userPoint - minPoint) / (maxPoint - minPoint)),
              height: 3,
              backgroundColor: 'black',
              position: 'absolute',
            }}
          />
        </View>
        {userPoint < 5000 ? (
          <Text style={{color: 'black', fontSize: 12, marginHorizontal: 15}}>
            {nextColorName} 레벨까지 {maxPoint - userPoint} Points 남음
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={{flexDirection: 'column', flex: 0.7}}>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <View
            style={{
              width: 320,
              height: 1,
              backgroundColor: 'black',
            }}
          />
        </View>
        <FlatList
          data={levelData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{marginLeft: 30, marginTop: 10}}
        />
      </View>
    </SafeAreaView>
  );
}

export default LevelInfo;
