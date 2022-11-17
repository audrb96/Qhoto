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
import {addFriendApi, getContactsApi} from '../api/friend';
import QhotoHeader from '../components/QhotoHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ContactsPage: React.FC<props> = props => {
  const {myContacts, callbackState, setCallbackState, setMyContacts} = props;
  // 친구요청 버튼 전용 state
  const [tmpTitle, setTmpTitle] = useState('친구요청');
  const [tmpColor, setTmpColor] = useState('#2089dc');

  const navigation = useNavigation();
  const changeFriendState = async myContact => {
    addFriendApi(
      myContact.userId,
      res => {
        console.log('addFriendApi - res', res);
        if (myContact.relation === '관계없음' || myContact.relation === null) {
          setTmpTitle('친구수락 대기중');
          setTmpColor('silver');
          setCallbackState(!callbackState);
          return;
        }

        // BE 응답보다 FE 에서 먼저 움직이도록 설정
        if (myContact.relation === '상대방요청') {
          return setMyContacts(
            myContacts.filter(item => {
              setCallbackState(!callbackState);
              return item.userId !== myContact.userId;
            }),
          );
        }
        // setCallbackState(!callbackState);
      },
      err => console.log('addFriendApi - err', err),
    );
  };

  const renderSectionOne = () => {
    return myContacts.map((myContact, index) => {
      return (
        <View
          key={index}
          style={{
            width: width * 0.54,
            height: height * 0.38,
            marginRight: -12,
            // padding: 0,
            // backgroundColor: 'green',
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
              <Card.Divider style={{margin: 0, padding: 0, marginRight: 12}} />
              <View
                style={{
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                {buttonFunc(myContacts[index])}
              </View>
            </Card>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      );
    });
  };

  const buttonFunc = myContact => {
    let buttonTitle = '';
    if (myContact.relation === '관계없음' || myContact.relation === null) {
      return (
        <Button
          buttonStyle={(styles.button, {backgroundColor: tmpColor})}
          title={tmpTitle}
          onPress={() => changeFriendState(myContact)}
        />
      );
    } else if (myContact.relation === '상대방요청') {
      buttonTitle = '친구요청 수락';
    } else if (myContact.relation === '내가요청') {
      return (
        // <Text style={{color: 'black'}}> 친구수락 대기중 </Text>
        <Button
          // icon={
          //   <Icon name="code" color="#ffffff" iconStyle={{marginRight: 10}} />
          // }
          buttonStyle={styles.button2}
          title="친구수락 대기중"
          onPress={() => {}}
        />
      );
    }
    return (
      <Button
        // icon={
        //   <Icon name="code" color="#ffffff" iconStyle={{marginRight: 10}} />
        // }
        buttonStyle={styles.button}
        title={buttonTitle}
        onPress={() => changeFriendState(myContact)}
      />
    );
  };

  return (
    <ScrollView horizontal={true}>
      <View
        style={{
          flexDirection: 'row',
          // flexWrap: 'wrap',
          marginRight: 12,
        }}>
        {renderSectionOne()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {},
  button2: {backgroundColor: 'silver'},
});

export default ContactsPage;
