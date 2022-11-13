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
function ContactsPage() {
  const [myContacts, setMyContacts] = useState(
    [],
    // myContacts: [],
  );

  const users = [
    {
      name: 'brynn',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
  ];

  useEffect(() => {
    requestContactPermission().then((didGetPermission: Boolean) => {
      if (didGetPermission) {
        // Contacts.getAll((err, contacts) => {
        //   if (err) {
        //     throw err;
        //   }
        Contacts.getAll().then(async contacts => {
          // await console.log(
          // contacts[6].phoneNumbers,

          // contacts.map(contact =>
          //   contact.phoneNumbers[0].number.replaceAll('-', ''),
          // ),
          // );
          await setMyContacts(contacts);
          await console.log(contacts);
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
        <View
          style={{
            padding: 0,
            borderRadius: 100,
            width: 220,
            height: 300,
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
            width: 220,
            height: 300,
            // margin: -5,
            marginRight: 5,
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});
export default ContactsPage;
