import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
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
import {ScrollView} from 'react-native-gesture-handler';
// import {styles} from 'react-native-gifted-charts/src/BarChart/styles';

function LevelInfo({route}) {
  const navigation = useNavigation();
  const userInfo = useSelector((state: RootState) => state.user);
  const isScrollEnabled = true;
  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };

  const userPoint = userInfo.totalExp;
  const expGrade = userInfo.expGrade;

  const levelKey = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'navy',
    'purple',
  ];

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
  console.log(levelKey.indexOf(expGrade));
  const renderItem = ({item, index}) => {
    return (
      // <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={levelInfo[item].badge}
          style={{maxWidth: 100, maxHeight: 100}}
        />
        <View style={{flexDirection: 'column', marginBottom: 5}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 20,
              fontFamily: 'MICEGothic-Bold',
            }}>
            {levelInfo[item].colorName}
          </Text>
          <Text style={{color: '#000000'}}>
            {levelInfo[item].minPoint}~{levelInfo[item].maxPoint} Point
          </Text>
        </View>
      </View>

      // </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QhotoHeader leftIcon={leftIcon} />
        <View>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                source={levelInfo[expGrade].badge}
                style={{maxWidth: 200, maxHeight: 200, marginRight: 5}}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View style={{width: 330, height: 35, alignItems: 'flex-end'}}>
                <Image
                  source={
                    levelInfo[levelKey[levelKey.indexOf(expGrade) + 1]].badge
                  }
                  style={{
                    flex: 1,
                    maxWidth: 35,
                    maxHeight: 35,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 3,
                }}>
                <View
                  style={{
                    width: 300,
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: 'silver',
                  }}
                />
                <View
                  style={{
                    width:
                      300 *
                      ((userPoint - levelInfo[expGrade].minPoint) /
                        (levelInfo[expGrade].maxPoint -
                          levelInfo[expGrade].minPoint)),
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: 'black',
                    position: 'absolute',
                  }}
                />
              </View>
              <Text style={{color: '#000000', textAlign: 'center'}}>
                {levelInfo[expGrade].nextColor}
                레벨까지{' '}
                {levelInfo[levelKey[levelKey.indexOf(expGrade) + 1]].minPoint -
                  userPoint}
                point 남음
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={levelKey}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={{marginLeft: 30, marginTop: 10}}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  badgeForm: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    maxHeight: 10,
    maxWidth: 10,
  },
});

export default LevelInfo;
