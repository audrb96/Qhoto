import React, {useEffect, useCallback} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

// type SignInScreenProps = NativeStackScreenProps<LoggedInParamList, 'QhotoLevel'>;
// {navigation}: SignInScreenProps)
function MyPage() {
  //   const toSignUp = useCallback(() => {
  //     navigation.navigate('QhotoLevel');
  //   }, [navigation]);

  const userImage = useSelector((state: RootState) => state.user.userImage);
  // const userName = useSelector((state: RootState) => state.user.userName);
  const email = useSelector((state: RootState) => state.user.email);
  const emailId = email.split('@');
  const userPoint = 493;
  let backgroundColor = 'red';
  let colorName = '';
  let nextColorName = '';
  if (userPoint < 50) {
    backgroundColor = '#F94720';
    colorName = '레드';
    nextColorName = '오렌지';
  } else if (userPoint < 200) {
    backgroundColor = '#FEAD0F';
    colorName = '오렌지';
    nextColorName = '옐로우';
  } else if (userPoint < 500) {
    backgroundColor = '#FFEB3B';
    colorName = '옐로우';
    nextColorName = '그린';
  } else if (userPoint < 1000) {
    backgroundColor = '#72D200';
    colorName = '그린';
    nextColorName = '블루';
  } else if (userPoint < 2500) {
    backgroundColor = '#30C1FF';
    colorName = '블루';
    nextColorName = '네이비';
  } else if (userPoint < 5000) {
    backgroundColor = '#3CA1FF';
    colorName = '네이비';
    nextColorName = '퍼플';
  } else {
    backgroundColor = '#8343E8';
    colorName = '퍼플';
    nextColorName = '퍼플';
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text>마이페이지 화면</Text>
        <TouchableOpacity style={{width: 40, height: 60}}>
          <Text>임시logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{flexDirection: 'row', paddingTop: 10, marginVertical: 0}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={{uri: userImage}}
              style={{width: 75, height: 75, borderRadius: 37.5}}
            />
            <Text style={{fontSize: 16}}>{emailId[0]}</Text>
            <Text style={{fontSize: 12}}>Qhoto 짱이에요</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              //
            }}>
            <Text style={{fontWeight: 'bold', color: '#3B28B1'}}>
              qhoto 레벨{' '}
            </Text>
            <FontAwesome5 name="angle-right" size={18} color={'#3B28B1'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            width: 300,
            height: 130,
            backgroundColor,
            borderRadius: 10,
          }}>
          <Text>{colorName}</Text>
          <Text style={{fontSize: 30, fontWeight: '600'}}>{userPoint}</Text>
          <Text>총퀘스트점수</Text>
          <Text>{nextColorName} 레벨까지 몇 포인트 남음??</Text>
        </View>
      </View>
    </View>
  );
}

export default MyPage;
