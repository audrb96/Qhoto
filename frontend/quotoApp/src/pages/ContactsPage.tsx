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
} from 'react-native';
import Contacts from 'react-native-contacts';
import {Card, Button, Icon} from '@rneui/themed';
import {getContactsApi} from '../api/friend';

const {width, height} = Dimensions.get('window');

function ContactsPage() {
  const [myContacts, setMyContacts] = useState(
    [],
    // myContacts: [],
  );

  useEffect(() => {
    requestContactPermission().then((didGetPermission: Boolean) => {
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
                '":"' +
                contact.displayName,
            ),
          );

          // const tmp = JSON.stringify(contactList)
          //   .replace('[', '{')
          //   .replace(']', '}');

          const ttemp = {
            '01020373918': '유경훈',
            '01012344567': '김정아',
            '01012340000': '김상현',
            '01023129852': '박영준',
            '01011111111': '정형진',
          };
          const tttemp = JSON.stringify(ttemp);
          await console.log(ttemp);

          await getContactsApi(
            tttemp,
            (res: any) => {
              console.log('getContactsApi - res', res.data);
            },
            (err: any) => {
              console.log('getContactsApi - err', err);
            },
          );
        });
      } else {
        Alert.alert('no permission : 연락처 접근 권한이 없습니다.');
      }
    });
  }, []);

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

  return (
    <ScrollView>
      <Text style={{color: 'black'}}> ContactsPage 입니다</Text>

      {myContacts.map((myContact, index) => (
        <View key={index}>
          <View>
            <Text style={{color: 'black'}}>
              {myContact.phoneNumbers[0].number.replaceAll('-', '')}
            </Text>
            <Text style={{color: 'black'}}>{myContact.displayName}</Text>
          </View>
        </View>
      ))}

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {/* <View style={{flexDirection: 'row'}}> */}
        <View
          style={{
            padding: 0,
            borderRadius: 100,
            width: width * 0.54,
            height: height * 0.38,
            // margin: -5,
            marginLeft: 5,
          }}>
          <Card>
            <Card.Image
              style={{
                padding: 0,
                borderRadius: 100,
                width: 158,
                height: 158,
                margin: 0,
              }}
              source={{
                uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
              }}
            />
            <Card.Title>싸피고 김싸피</Card.Title>
            <Card.Divider />

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
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  // width: 100,
                }}
                title="친구추가"
              />
            </View>
          </Card>
        </View>
        <View
          style={{
            padding: 0,
            borderRadius: 100,
            width: width * 0.54,
            height: height * 0.38,
            // margin: -5,
            marginRight: 5,
          }}>
          <Card>
            <Card.Image
              style={{
                padding: 0,
                borderRadius: 100,
                width: width * 0.39,
                height: height * 0.2,
                margin: 0,
              }}
              source={{
                uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
              }}
            />
            <Card.Title>싸피고 김싸피</Card.Title>
            <Card.Divider />

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
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  // width: 100,
                }}
                title="친구추가"
              />
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

export default ContactsPage;
