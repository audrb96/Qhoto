import React, {useEffect, useState, useCallback} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {Card, Button, Icon} from '@rneui/themed';
import {getContactsApi} from '../api/friend';
import QhotoHeader from '../components/QhotoHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

function ContactsPage() {
  const navigation = useNavigation();
  const [myContacts, setMyContacts] = useState([]);

  useEffect(() => {
    console.log(width, height, '=-----==============');
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
  }, []);

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

  const renderSectionOne = () => {
    return myContacts.map((myContact, index) => {
      return (
        <View
          key={index}
          style={{
            width: width / 2,
            height: height / 2.7,
            // margin: 0,
            // padding: 0,
            backgroundColor: 'green',
          }}>
          <View
            style={{
              // padding: 0,
              width: width * 0.54,
              height: height * 0.38,
              // paddingLeft: 0,
              // marginLeft: 0,
              // margin left 없으면 오른쪽으로 치우치는데
              // 이유를 모르겠음
              marginLeft: width * -0.02,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OtherPage', {userId: myContact.userId})
              }>
              <Card>
                <Card.Image
                  style={{
                    borderRadius: 100,
                    width: width * 0.384,
                    height: height * 0.198,
                    // width: 158,
                    // height: 158,
                    // padding: 0,
                    // margin: 0,
                  }}
                  source={{uri: myContact.image}}
                />
                <Card.Title
                  style={{
                    // backgroundColor: 'yellow',
                    marginBottom: 0,
                  }}>
                  {myContact.name}
                </Card.Title>
                <Card.Divider style={{margin: 0, padding: 0}} />
                <View
                  style={{
                    justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <Button
                    // icon={
                    //   <Icon name="code" color="#ffffff" iconStyle={{marginRight: 10}} />
                    // }
                    buttonStyle={{
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 0,
                      marginTop: 0,
                      // width: 100,
                    }}
                    title="친구추가"
                  />
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const leftIcon = (
    <FontAwesome5
      name="angle-left"
      size={30}
      color="#3B28B1"
      onPress={() => navigation.goBack()}
      style={styles.leftIcon}
    />
  );

  return (
    <ScrollView>
      <QhotoHeader
        leftIcon={leftIcon}
        rightIcon={false}
        missionVisible={false}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {renderSectionOne()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
});
export default ContactsPage;
