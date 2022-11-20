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
  const [openContactList, setOpenContactList] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [myContacts, setMyContacts] = useState();
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
            contacts.forEach(contact => {
              if (contact.phoneNumbers[0] !== undefined) {
                contactList.push(
                  contact.phoneNumbers[0].number.replaceAll('-', '') +
                    ':' +
                    contact.displayName,
                );
              }
            });

            let contactData = JSON.stringify(contactList)
              .replace('[', '{')
              .replace(']', '}')
              .replaceAll(':', '":"');

            getContactsApi(
              contactData,
              async (res: any) => {
                console.log('getContactsApi - res', res.data);
                setMyContacts(res.data);
              },
              (err: any) => {
                console.log('getContactsApi - err', err.response);
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
        console.log('friendListApi - res', res.data);
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
  const Item = ({item}) => (
    <Pressable
      style={{
        padding: 15,
      }}
      onPress={() => navigation.navigate('OtherPage', {userId: item.userId})}>
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
    </Pressable>
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
      {myContacts === undefined ? null : (
        <>
          <View>
            <List.Accordion
              title={`추천친구  ${myContacts.length}`}
              expanded={openContactList}
              onPress={() => setOpenContactList(!openContactList)}
              style={{paddingHorizontal: 10}}
              titleStyle={{
                fontSize: 25,
                fontFamily: 'esamanru-Medium',
                marginVertical: 3,
              }}>
              <ContactsPage
                myContacts={myContacts}
                setMyContacts={setMyContacts}
                setCallbackState={setCallbackState}
                callbackState={callbackState}
              />
            </List.Accordion>
          </View>
          <View style={{flex: 1, marginBottom: 60}}>
            <List.Accordion
              title={`친구목록  ${friendList.length}`} // Todo: 친구목록 개수
              expanded={openFriendList}
              onPress={() => setOpenFriendList(!openFriendList)}
              style={{paddingHorizontal: 10}}
              titleStyle={{
                fontSize: 25,
                fontFamily: 'esamanru-Medium',
                marginVertical: 3,
              }}>
              <FlatList
                data={friendList}
                renderItem={renderFriendList}
                // keyExtractor={item => item.id}
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
        </>
      )}
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
    right: 0,
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
