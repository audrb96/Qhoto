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
  Button,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  getAccessToken,
} from '@react-native-seoul/kakao-login';

import Contacts from 'react-native-contacts';
import store from '../store/index';

function ContactsPage() {
  const [myContacts, setMyContacts] = useState({
    myContacts: [],
  });

  async function requestContactPermission() {
    if (Platform.OS === 'ios') {
      console.warn('iOS');
      return true;
    } else {
      console.warn('Android');

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

  const getContacts = () => {
    requestContactPermission().then((didGetPermission: Boolean) => {
      if (didGetPermission) {
        // Contacts.getAll((err, contacts) => {
        //   if (err) {
        //     throw err;
        //   }
        //   setContacts({myContacts: contacts});
        //   console.warn(contacts);
        // });
        Contacts.getAll().then(contacts => {
          console.log(
            contacts.map(
              contact =>
                contact.phoneNumbers[0].number + ':' + contact.displayName,
            ),
          );
          // setMyContacts(contacts);
        });
      } else {
        alert('no permission');
      }
    });
  };
  return (
    <View>
      <Text style={{color: 'black'}}> ContactsPage 입니다</Text>
      <TouchableOpacity onPress={() => getContacts()}>
        <Text style={{color: 'black'}}>ContactsPage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ContactsPage;
