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
import {RootState} from '../../store/reducer';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import info from '../info';

// Todo: 사진교체(tmp 파일은 크기가 제각각)
import {
  RED_BADGE,
  ORANGE_BADGE,
  YELLOW_BADGE,
  GREEN_BADGE,
  BLUE_BADGE,
  NAVY_BADGE,
  PURPLE_BADGE,
} from '../../image';
import QhotoHeader from '../QhotoHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useIsFocused, useNavigation} from '@react-navigation/native';

function LevelInfo({route}) {
  const navigation = useNavigation();
  const userInfo = useSelector((state: RootState) => state.user);

  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };

  const userPoint = parseInt(userInfo.userPoint);
  let id = '';
  const levelInfo: {
    [key: string]: {
      gradeColorCode: string;
      colorName: string;
      nextColor: string;
      minPoint: number;
      maxPoint: number;
      badge: any;
    };
  } = info.levelInfo;

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
      <QhotoHeader />

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
