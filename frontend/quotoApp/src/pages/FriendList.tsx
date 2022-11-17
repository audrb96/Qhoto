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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Avatar, List} from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import Contacts from 'react-native-contacts';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QhotoHeader from './../components/QhotoHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ContactsPage from './ContactsPage';
import {
  findFriendApi,
  friendListApi,
  addFriendApi,
  receiveListApi,
  getContactsApi,
} from '../api/friend';

const {width, height} = Dimensions.get('window');

function FriendList() {
  const navigation = useNavigation();

  const [openFriendList, setOpenFriendList] = useState(true);
  const [openContactList, setOpenContactList] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [myContacts, setMyContacts] = useState([]);
  const [callbackState, setCallbackState] = useState(true);

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

  // useEffect(contact 기반 추천 리스트 + 친구목록)
  useEffect(() => {
    // contact 기반 추천 리스트
    requestContactPermission()
      .then((didGetPermission: Boolean) => {
        if (didGetPermission) {
          // Contacts.getAll((err, contacts) => {
          //   if (err) {
          //     throw err;
          //   }
          Contacts.getAll().then(async contacts => {
            let contactList = [];
            await contacts.forEach(contact =>
              contactList.push(
                contact.phoneNumbers[0].number.replaceAll('-', '') +
                  ':' +
                  contact.displayName,
              ),
            );

            let contactData = JSON.stringify(contactList)
              .replace('[', '{')
              .replace(']', '}')
              .replaceAll(':', '":"');

            await getContactsApi(
              contactData,
              async (res: any) => {
                await console.log('getContactsApi - res', res.data);
                await setMyContacts(res.data);
              },
              (err: any) => {
                console.log('getContactsApi - err', err);
              },
            );
          });
        } else {
          Alert.alert('no permission : 연락처 접근 권한이 없습니다.');
        }
      })
      .catch(() => {
        Alert.alert('알림', '연락처 접근 권한을 허용해주세요.');
      });
    // 친구목록
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
  }, [isFocused, callbackState]); // isFocused : navigation.goback 을 통해 오면 refresh 되게하는 거

  // 권한 확인
  async function requestContactPermission() {
    if (Platform.OS === 'ios') {
      // console.warn('iOS');
      return true;
    } else {
      // console.warn('Android');

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]);

      if (
        granted['android.permission.WRITE_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  // 친구목록
  const Item = ({
    item,
    // onPress, backgroundColor, textColor,
    iconType,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'gray',
        padding: 10,
        // borderRadius: 10,
        // marginVertical: 1,
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
  const rightIcon = (
    <AntDesign
      name="adduser"
      size={30}
      color="#3B28B1"
      onPress={gotoFindFriend}
      style={styles.rightIcon}
    />
  );

  return (
    <View style={{flex: 1}}>
      <QhotoHeader
        leftIcon={false}
        rightIcon={rightIcon}
        missionVisible={false}
      />
      <View>
        <List.Accordion
          title="추천친구"
          expanded={openContactList}
          onPress={() => setOpenContactList(!openContactList)}>
          <ContactsPage
            myContacts={myContacts}
            setMyContacts={setMyContacts}
            setCallbackState={setCallbackState}
            callbackState={callbackState}
          />
        </List.Accordion>
      </View>
      <View style={{flex: 1, marginBottom: 65}}>
        <List.Accordion
          title="친구목록" // Todo: 친구목록 개수
          expanded={openFriendList}
          onPress={() => setOpenFriendList(!openFriendList)}
          style={{height: 65}}>
          <FlatList
            data={friendList}
            renderItem={renderFriendList}
            keyExtractor={item => item.id}
          />
          {/* <View style={{marginBottom: 100}}>
          <FlatList
            data={DATA}
            renderItem={renderItem2}
            keyExtractor={item => item.id}
          />
        </View> */}
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
});
export default FriendList;
