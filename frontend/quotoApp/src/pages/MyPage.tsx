import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Platform,
  SafeAreaView,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import ImageModal from 'react-native-image-modal';

import QhotoHeader from '../components/QhotoHeader';
import UploadModeModal from '../components/mypage/UploadModeModal';
import ProfileImageModal from '../components/mypage/ProfileImageModal';
import ImageModal from 'react-native-image-modal';

function MyPage({navigation}: null) {
  const goToLevel = () => {
    navigation.navigate('QhotoLevel', {userPoint: userPoint});
  };
  const goToQuestLog = () => {
    navigation.navigate('QuestLog');
  };
  const userImage = useSelector((state: RootState) => state.user.userImage);
  // const userName = useSelector((state: RootState) => state.user.userName);
  const email = useSelector((state: RootState) => state.user.email);
  const emailId = email.split('@');
  const userPoint = 80;
  // Todo: 왜 userPoint 만 못가져옴?? 숫자라서 그런가??
  // const userPoint = useSelector((state: RootState) => state.user.userPoint);
  let backgroundColor = 'red';
  let colorName = '';
  let nextColorName = '';
  let minPoint = 0;
  let maxPoint = 0;

  // Todo: 이것도 컴포넌트화 가능??
  // Todo: 타입스크립트방식으로 해도 지저분하긴함..
  if (userPoint < 50) {
    backgroundColor = '#F94720';
    colorName = '레드';
    nextColorName = '오렌지';
    minPoint = 0;
    maxPoint = 50;
  } else if (userPoint < 200) {
    backgroundColor = '#FEAD0F';
    colorName = '오렌지';
    nextColorName = '옐로우';
    minPoint = 50;
    maxPoint = 200;
  } else if (userPoint < 500) {
    backgroundColor = '#FFEB3B';
    colorName = '옐로우';
    nextColorName = '그린';
    minPoint = 200;
    maxPoint = 500;
  } else if (userPoint < 1000) {
    backgroundColor = '#72D200';
    colorName = '그린';
    nextColorName = '블루';
    minPoint = 500;
    maxPoint = 1000;
  } else if (userPoint < 2500) {
    backgroundColor = '#30C1FF';
    colorName = '블루';
    nextColorName = '네이비';
    minPoint = 1000;
    maxPoint = 2500;
  } else if (userPoint < 5000) {
    backgroundColor = '#3CA1FF';
    colorName = '네이비';
    nextColorName = '퍼플';
    minPoint = 2500;
    maxPoint = 5000;
  } else {
    backgroundColor = '#8343E8';
    colorName = '퍼플';
    minPoint = 5000;
  }

  const [editable, setEditable] = useState(false);
  const [introduction, setIntroduction] = useState('Qhoto 짱이에요~~');

  // 안드로이드를 위한 모달 visible 상태값
  const [changeModalVisible, setChangeModalVisible] = useState(false);

  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      // 안드로이드
      setChangeModalVisible(true); // visible = true
    } else {
      // iOS
    }
  };

  return (
    <SafeAreaView>
      <View // 로그아웃 ~ 수정버튼
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <TouchableOpacity style={{width: 40, height: 60}}>
          <Text>임시logout</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {editable === false ? (
            <FontAwesome5
              name="edit"
              size={18}
              color={'#3B28B1'}
              onPress={() => setEditable(true)}
            />
          ) : (
            <Text onPress={() => setEditable(false)}>완료</Text>
          )}
        </TouchableOpacity>
      </View>
      <View // 프로필
      >
        <UploadModeModal
          visible={changeModalVisible}
          onClose={() => setChangeModalVisible(false)}
        />
        <View style={{flexDirection: 'row', paddingTop: 10, marginVertical: 0}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View>
              <ImageModal
                source={{uri: userImage}}
                resizeMode="contain"
                modalImageResizeMode="contain"
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 37.5,
                }}
                swipeToDismiss={true} // 스와이프하여 창을 닫을지 여부를 결정합니다.(default: true)
                overlayBackgroundColor="#000000" // 전체 사이즈 모달의 배경색을 지정합니다.(default: #000000)
              />

              <TouchableOpacity
                style={{position: 'absolute', top: 55, left: 55}}
                onPress={modalOpen}>
                <AntDesign name="camerao" size={18} color={'#3B28B1'} />
              </TouchableOpacity>
            </View>

            <Text style={{fontSize: 16}}>{emailId[0]}</Text>
            {editable === false ? (
              <Text style={{fontSize: 12}}>{introduction}</Text>
            ) : (
              <TextInput
                value={introduction}
                onChangeText={text => setIntroduction(text)}
              />
            )}
          </View>
        </View>
      </View>
      <View // qhoto 레벨
      >
        <View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              //
            }}>
            <Text
              onPress={goToLevel}
              style={{fontWeight: 'bold', color: '#3B28B1'}}>
              qhoto 레벨{' '}
            </Text>
            <FontAwesome5 name="angle-right" size={18} color={'#3B28B1'} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: 300,
              height: 130,
              backgroundColor,
              borderRadius: 10,
            }}>
            <Text style={{marginHorizontal: 15}}>{colorName}</Text>
            <Text
              style={{fontSize: 30, fontWeight: '600', marginHorizontal: 15}}>
              {userPoint}
            </Text>
            <Text style={{marginHorizontal: 15}}>총퀘스트점수</Text>
            <View style={{marginHorizontal: 15, marginVertical: 5}}>
              <View
                style={{
                  width: 270,
                  height: 5,
                  backgroundColor: 'silver',
                }}
              />
              <View
                style={{
                  width: 270 * ((userPoint - minPoint) / (maxPoint - minPoint)),
                  height: 5,
                  backgroundColor: 'black',
                  position: 'absolute',
                }}
              />
            </View>
            {userPoint < 5000 ? (
              <Text style={{marginHorizontal: 15}}>
                {nextColorName} 레벨까지 {maxPoint - userPoint} Points 남음
              </Text>
            ) : (
              <Text />
            )}
          </View>
        </View>
      </View>
      <View // quest 로그
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            //
          }}>
          <Text
            onPress={goToQuestLog}
            style={{fontWeight: 'bold', color: '#3B28B1'}}>
            퀘스트 로그{' '}
          </Text>
          <FontAwesome5 name="angle-right" size={18} color={'#3B28B1'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MyPage;
