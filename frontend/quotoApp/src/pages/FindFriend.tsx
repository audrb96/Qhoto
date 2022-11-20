import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Avatar, List} from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QhotoHeader from './../components/QhotoHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootState} from '../store/reducer';

import {
  findFriendApi,
  friendListApi,
  addFriendApi,
  receiveListApi,
} from '../api/friend';
import {useSelector} from 'react-redux';
import {Button} from '@rneui/base';

const {width, height} = Dimensions.get('window');

function FindFriend({route}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const myNickname = useSelector((state: RootState) => state.user.nickname);
  const [selectedId, setSelectedId] = useState(null);

  const [targetId, setTargetId] = useState('');
  const [searchResult, setSearchResult] = useState({
    userId: 0,
    isFriend: '',
    nickName: '',
    email: '',
    profileImg: '',
    point: 0,
  });
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);

  const [receiveList, setReceiveList] = useState('');
  const [openFriend, setOpenFriend] = useState(false);

  const goToOtherPage = searchResult => {
    if (searchResult.nickName === myNickname) {
      navigation.navigate('MyPage');
    } else {
      navigation.navigate('OtherPage', {
        userId: searchResult.userId,
      });
    }
  };

  // 친구요청 받은 리스트
  useEffect(() => {
    receiveListApi(
      (res: any) => {
        console.log('receiveListApi - res', res);
        setReceiveList(res.data);
      },
      (err: any) => {
        console.log('receiveListApi - err', err);
        console.log('receiveListApi - err', err.response);
      },
    );
    findFriend(targetId);
  }, [isFocused]);

  let iconName = '';
  let iconOrder = '';
  const relationIcon = () => {
    // 검색한 유저가 나인경우
    if (searchResult.nickName === myNickname) {
      return (
        <Button
          icon={
            <FontAwesome
              name="user"
              size={20}
              color="#FFFFFF"
              // style={{
              //   position: 'absolute',
              //   width: 40,
              //   height: 40,
              //   top: -10,
              //   left: 20,
              // }}
            />
          }
          buttonStyle={styles.buttonPurple}
          title="  Me"
          titleStyle={{fontFamily: 'MICEGothic-Bold'}}
          onPress={() => addFriend(searchResult)}></Button>
      );
    } else if (searchResult.isFriend === 'GET') {
      // 내가 받음
      iconName = 'user-check';
      iconOrder = '친구 수락';
      return (
        <Button
          buttonStyle={styles.button}
          title="친구요청 수락"
          titleStyle={{fontFamily: 'MICEGothic-Bold'}}
          onPress={() => addFriend(searchResult)}></Button>
      );
    } else if (searchResult.isFriend === 'REQUEST') {
      // 내가 보낸(아직 받지않은)
      iconName = 'user-check';
      iconOrder = '친구수락 대기중';
      return (
        <Button
          buttonStyle={styles.buttonSilver}
          title="친구수락 대기중"
          titleStyle={{fontFamily: 'MICEGothic-Bold'}}
          onPress={() => addFriend(searchResult)}></Button>
      );
    } else if (searchResult.isFriend === 'FRIEND') {
      iconName = 'user-friends';
      iconOrder = '친구';
      return (
        <Button
          buttonStyle={styles.buttonPurple}
          title="친구"
          titleStyle={{fontFamily: 'MICEGothic-Bold'}}
          onPress={() => addFriend(searchResult)}></Button>
      );
    } else if (
      searchResult.isFriend === 'DISCONNECTED' ||
      searchResult.isFriend === null
    ) {
      iconName = 'user-plus';
      iconOrder = '친구 요청';
      return (
        <Button
          buttonStyle={styles.button}
          title="친구요청"
          titleStyle={{fontFamily: 'MICEGothic-Bold'}}
          onPress={() => addFriend(searchResult)}></Button>
      );
    }
    // return <FontAwesome5 name={iconName} size={20} color="white" />;
    return;
  };

  // 친구검색
  const findFriend = (nickname: any) => {
    findFriendApi(
      nickname,
      (res: any) => {
        console.log('findFriendApi - res', res);
        setSearchResult(res.data);
      },
      (err: any) => {
        console.log('findFriendApi - err', err.response);
        console.log('findFriendApi - err', err.response.data.code);
        if (err.response.data.code === 'U005') {
          Alert.alert('알림', '해당 닉네임을 가진 유저가 없어');
        }
      },
    );
  };

  // 친구 요청 + 수락
  // Todo: back api 완성시 resUserId 붙여야함
  const addFriend = (searchResult: any) => {
    if (searchResult.nickName === myNickname) {
      return;
    }
    if (iconOrder === '친구 수락 대기중') {
      return Alert.alert('알림', '친구 수락 대기중입니다.');
    }
    if (iconOrder === '친구') {
      return Alert.alert('알림', '이미 친구입니다.');
    }
    console.log('resUserId', searchResult.userId);
    addFriendApi(
      searchResult.userId,
      (res: any) => {
        console.log('addFriendApi - res', res);
        // 친구 요청or수락 후 받은 친구목록 재요청
        // => 이미 addFriendApi 를 보냈으니 친구요청은 처리가 되었고,
        // receiveListApi 를 또 받을 필요없이 그냥 프론트에서만 filter 를 통해 없애줌.
        setReceiveList(
          receiveList.filter(item => {
            return item.userId !== searchResult.userId;
          }),
        );
        // 친구 요청or수락 후 친구 리스트 재요청
        // => friendList.tsx 의 useEffect(func, [isFocused]) 로 대체함.
        // 굳이 friendListAPI 또 쓸 필요 없음.

        // 친구요청 or 수락 후 isFriend 를 업데이트
        findFriend(targetId);
      },
      (err: any) => {
        console.log('addFriendApi - err', err);
        console.log('addFriendApi - err', err.response);
      },
    );
  };

  const onChangeTargetId = useCallback(targetId => {
    let reg =
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\{\}\[\]\/?,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

    setTargetId(targetId.trim());
    if (reg.test(targetId.slice(-1))) {
      setTargetId(targetId.replace(targetId.slice(-1), ''));
    }
  }, []);

  const Item = ({
    item,
    // onPress, backgroundColor, textColor,
    iconType,
  }) => (
    <TouchableOpacity
      style={{
        padding: 15,
      }}
      onPress={() => navigation.navigate('OtherPage', {userId: item.userId})}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image size={50} source={{uri: item.userImage}} />
          <Text
            style={{
              marginLeft: 20,
              color: '#535353',
              fontFamily: 'esamanru-Medium',
              fontSize: 20,
            }}>
            {item.nickname}
          </Text>
        </View>
        <View>
          {iconType ? (
            <TouchableOpacity
              onPress={() => addFriend(item.userId)}
              style={{backgroundColor: '#3B28B1', borderRadius: 10}}>
              <Text style={{color: 'white'}}>
                <FontAwesome5 name="user-plus" color="white" />
                요청 수락
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderReceiveList = ({item}: any) => {
    // const backgroundColor = item.userId === selectedId ? 'green' : 'orange';
    // const color = item.userId === selectedId ? 'white' : 'black';
    const recieve = true;
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.userId)}
        // backgroundColor={{backgroundColor}} .
        // textColor={{color}}
        iconType={recieve}
      />
    );
  };

  // 아코디언 오픈 / 클로즈
  const [openSearchFriend, setOpenSearchFriend] = useState(true);
  const [openReceiveList, setOpenReceiveList] = useState(true);
  const [openFriendList, setOpenFriendList] = useState(true);

  const leftIcon = (
    <FontAwesome5
      name="angle-left"
      size={35}
      color="#3B28B1"
      onPress={() => navigation.goBack()}
      style={styles.leftIcon}
    />
  );

  //
  return (
    // Todo: ScrollView 와 FlatList 를 같이 사용해서 발생한 에러로 추정;
    // Todo: View - FlatList 로 스크롤이 되게 하든지
    // Todo: ScrollView 와 다른 반복문으로 사용하든지
    <View style={{flex: 1}}>
      <QhotoHeader leftIcon={leftIcon} rightIcon={false} />
      <View style={{marginVertical: 5}}>
        <List.Accordion
          // Todo: 각자 스마트폰 설정 폰트로 보이는지 확인
          // Todo: Customizing
          // theme={{colors: {background: 'red'}}}
          // style={{backgroundColor: 'red', marginBottom: 20}}
          title="친구검색" // Todo: 친구목록 개수
          expanded={openSearchFriend}
          onPress={() => setOpenSearchFriend(!openSearchFriend)}
          titleStyle={{
            fontSize: 25,
            fontFamily: 'esamanru-Medium',
            marginVertical: 3,
          }}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeTargetId}
              // autoFocus={true}
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#6A6A6A"
              value={targetId}
              ref={emailRef}
              returnKeyType="send"
              onSubmitEditing={() => findFriend(targetId)}
            />
            <TouchableOpacity
              onPress={() => {
                console.log('targetId', targetId);
                findFriend(targetId);
                setOpenFriend(true);
              }}
              style={{
                backgroundColor: '#3B28B1',
                borderRadius: 5,
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'esamanru-Medium',
                  fontSize: 18,
                }}>
                검색
              </Text>
            </TouchableOpacity>
          </View>

          {searchResult.nickName === '' ? null : (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  elevation: 10,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  paddingVertical: 20,
                  paddingHorizontal: 40,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('OtherPage', {
                      userId: searchResult.userId,
                    })
                  }
                  style={{alignItems: 'center'}}>
                  <Avatar.Image
                    // badge
                    size={110}
                    source={{uri: searchResult.profileImg}} // Todo
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'esamanru-Medium',
                      fontSize: 20,
                      marginVertical: 12,
                    }}>
                    {searchResult.nickName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => addFriend(searchResult.userId)}
                  style={{
                    backgroundColor: '#3B28B1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'esamanru-Medium',
                    }}>
                    {relationIcon()}
                    &nbsp;&nbsp;
                    {iconOrder}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </List.Accordion>
      </View>

      <View style={{marginVertical: 5, flex: 1}}>
        <List.Accordion
          // Todo: Customizing
          // Todo: 각자 스마트폰 설정 폰트로 보이는지 확인
          // theme={{colors: {background: 'red'}}}
          // style={{backgroundColor: 'red', marginBottom: 20}}
          title="친구요청" // Todo: 친구요청 개수
          expanded={openReceiveList}
          // style={{flex: 1}}
          onPress={() => setOpenReceiveList(!openReceiveList)}
          titleStyle={{
            fontSize: 25,
            fontFamily: 'esamanru-Medium',
            marginVertical: 3,
          }}>
          <FlatList
            data={receiveList}
            renderItem={renderReceiveList}
            keyExtractor={item => item.userId}
            extraData={selectedId}
          />
        </List.Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: '#353535',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexGrow: 1,
    fontSize: 18,
    fontFamily: 'esamanru-Medium',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#3B28B1',
  },
  leftIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
  button: {
    width: width * 0.3,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
  },
  buttonUndefined: {
    // width: width * 0.4,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
    backgroundColor: 'white',
  },

  buttonSilver: {
    // width: width * 0.3,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
    backgroundColor: 'silver',
  },
  buttonPurple: {
    width: width * 0.3,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
    backgroundColor: '#592CB8',
  },
});
export default FindFriend;
