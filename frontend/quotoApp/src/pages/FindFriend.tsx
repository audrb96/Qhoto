import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import {findFriendApi, friendListApi, receiveListApi} from '../api/friend';

const {width, height} = Dimensions.get('window');

function FindFriend() {
  const [text, onChangeText] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [targetId, setTargetId] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);

  const [friendList, setFriendList] = useState('');
  const [receiveList, setReceiveList] = useState('');

  const findFriend = () => {
    findFriendApi(
      res => {
        console.log('findFriendApi - res', res);
      },
      err => {
        console.log('findFriendApi - err', err);
      },
    );
  };

  // "data":[
  //   {
  //   "nickname":"정형진",
  //   "userId":3,
  //   "userImage":"https://k.kakaocdn.net/dn/IvnrU/btrNyFO2uNO/KxQurJAUpRjrTKYcNHu2wK/img_640x640.jpg"
  //   },
  //   {
  //   "nickname":"박영준",
  //   "userId":5,
  //   "userImage":"https://k.kakaocdn.net/dn/bCECfe/btrN5FBhmze/i3O26Z97Op0RkwkNSCChw0/img_640x640.jpg"
  //   }
  //   ],

  useEffect(() => {
    friendListApi(
      res => {
        console.log('friendListApi - res', res);
        setFriendList(res.data);
      },
      err => {
        console.log('friendListApi - err', err);
      },
    );
  }, []);

  useEffect(() => {
    receiveListApi(
      res => {
        console.log('receiveListApi - res', res);
        setReceiveList(res.data);
      },
      err => {
        console.log('receiveListApi - err', err);
      },
    );
  });

  const onChangeTargetId = useCallback(targetId => {
    let reg = /[\{\}\[\]\/?,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

    setTargetId(targetId.trim());
    if (reg.test(targetId.slice(-1))) {
      setTargetId(targetId.replace(targetId.slice(-1), ''));
    }
  }, []);

  const DATA = [
    {
      id: '0',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이1',
      profileId: 'hyungjin1@naver.com',
    },
    {
      id: '1',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이2',
      profileId: 'hyungjin2@naver.com',
    },
    {
      id: '2',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이3',
      profileId: 'hyungjin3@naver.com',
    },
    {
      id: '3',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이4',
      profileId: 'hyungjin4@naver.com',
    },
  ];

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'gray',
        borderRadius: 10,
        marginVertical: 1,
      }}>
      <View style={{flexDirection: 'row', flex: 0.5}}>
        <View style={{flex: 0.15}}>
          <ImageModal
            source={{uri: item.userImage}}
            resizeMode="cover"
            modalImageResizeMode="contain"
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
            swipeToDismiss={true} // 스와이프하여 창을 닫을지 여부를 결정합니다.(default: true)
            overlayBackgroundColor="#000000" // 전체 사이즈 모달의 배경색을 지정합니다.(default: #000000)
          />
        </View>
        <View style={{flex: 0.7}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar.Image size={15} source={{uri: item.badge}} />
            <Text style={{color: 'black'}}>{item.nickname}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black'}}>{item.profileId}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.userId === selectedId ? 'green' : 'orange';
    const color = item.userId === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.userId)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  //
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{color: 'black'}}>친구검색</Text>
      <View style={{flex: 0.4}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeTargetId}
            autoFocus={true}
            placeholder="닉네임을 입력해주세요"
            placeholderTextColor="#666666"
            value={targetId}
            ref={emailRef}
            onSubmitEditing={() => nameRef.current?.focus()}
          />
          <TouchableOpacity
            onPress={() => {
              console.log(targetId);
              findFriend();
            }}>
            <Text style={{color: 'black', backgroundColor: 'red', padding: 5}}>
              검색
            </Text>
          </TouchableOpacity>
        </View>

        <View // 프로필
        >
          <View
            style={{flexDirection: 'row', paddingTop: 10, marginVertical: 0}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View>
                <ImageModal
                  source={{uri: 'http://placeimg.com/480/480/any'}}
                  resizeMode="cover"
                  modalImageResizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  swipeToDismiss={true} // 스와이프하여 창을 닫을지 여부를 결정합니다.(default: true)
                  overlayBackgroundColor="#000000" // 전체 사이즈 모달의 배경색을 지정합니다.(default: #000000)
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Avatar.Image
                  // badge
                  size={22}
                  source={{uri: 'http://placeimg.com/480/480/any'}}
                />
                <Text style={{color: 'black'}}>{DATA[0].nickname}</Text>
              </View>
              <Text style={{color: 'black'}}>
                {DATA[0].profileId.split('@', 1)[0]}
              </Text>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'red',
                }}>
                <AntDesign
                  name="adduser"
                  size={30}
                  color={'#3B28B1'}
                  // Todo: 검색한 유저와의 친구상태에 따라 아이콘 달라야 함
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Text style={{color: 'black'}}>친구요청</Text>
      <View style={{flex: 0.2}}>
        <View style={{marginVertical: 5}}>
          <FlatList
            data={receiveList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            // style={{flex: 1}}
          />
        </View>
      </View>
      <Text style={{color: 'black'}}>친구목록</Text>

      <View style={{flex: 0.4}}>
        <View style={{marginVertical: 5}}>
          <FlatList
            data={friendList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            // style={{flex: 1}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    color: 'black',
    padding: 5,
    width: width * 0.9,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default FindFriend;
