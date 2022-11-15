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
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Avatar, List} from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QhotoHeader from './../components/QhotoHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  findFriendApi,
  friendListApi,
  addFriendApi,
  receiveListApi,
} from '../api/friend';

const {width, height} = Dimensions.get('window');

function FriendList() {
  const navigation = useNavigation();

  const [openFriendList, setOpenFriendList] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const gotoFindFriend = () =>
    navigation.navigate('FindFriend', {friendList: friendList});

  const renderFriendList = ({item}: any) => {
    // const backgroundColor = item.userId === selectedId ? 'green' : 'orange';
    // const color = item.userId === selectedId ? 'white' : 'black';
    const recieve = false;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.userId)}
        iconType={recieve}
      />
    );
  };

  // 친구 리스트
  useEffect(() => {
    friendListApi(
      (res: any) => {
        console.log('friendListApi - res', res);
        setFriendList(res.data);
      },
      (err: any) => {
        console.log('friendListApi - err', err);
        console.log('friendListApi - err', err.response);
      },
    );
  }, [isFocused]); // isFocused : navigation.goback 을 통해 오면 refresh 되게하는 거

  const Item = ({
    item,
    // onPress, backgroundColor, textColor,
    iconType,
  }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: 'gray',
        borderRadius: 10,
        marginVertical: 1,
      }}
      onPress={() => navigation.navigate('OtherPage', {userId: item.userId})}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.2}}>
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
        <View style={{flex: 0.8}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar.Image size={15} source={{uri: item.badge}} />
            <Text style={{color: 'black'}}>{item.nickname}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black'}}>{item.profileId}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  //Icon
  const leftIcon = (
    <AntDesign
      name="adduser"
      size={30}
      color="#3B28B1"
      onPress={gotoFindFriend}
      style={styles.leftIcon}
    />
  );

  const rightIcon = (
    <AntDesign
      name="contacts"
      size={30}
      color="#3B28B1"
      onPress={() => navigation.navigate('ContactsPage')}
      style={styles.rightIcon}
    />
  );

  return (
    <View>
      <QhotoHeader
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        missionVisible={false}
      />
      <View style={{marginVertical: 5}}>
        <List.Accordion
          // Todo: Customizing
          // Todo: 각자 스마트폰 설정 폰트로 보이는지 확인
          // theme={{colors: {background: 'red'}}}
          // style={{backgroundColor: 'red', marginBottom: 20}}
          title="친구목록" // Todo: 친구목록 개수
          expanded={openFriendList}
          onPress={() => setOpenFriendList(!openFriendList)}>
          <FlatList data={friendList} renderItem={renderFriendList} />
        </List.Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: 'black',
    padding: 5,
    width: width * 0.9,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
  rightIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
});
export default FriendList;
