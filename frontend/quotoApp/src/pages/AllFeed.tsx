import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import QhotoHeader from '../components/QhotoHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectedFeed from './SelectedFeed';

function AllFeed({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const rightIcon = (
    <Ionicons
      name="options-outline"
      size={40}
      color="#3B28B1"
      onPress={() => console.log(1)}
      style={{
        position: 'absolute',
        width: 40,
        height: 40,
        right: 0,
        top: -20,
      }}
    />
  );
  const Item = ({title, width, height}) => (
    <View
      style={{
        width,
        height,
        backgroundColor: 'gray',
      }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
          source={{
            uri: 'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
          }}
        />
      </TouchableOpacity>
    </View>
  );
  const DATA = [
    {title: 1},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
    {title: 2},
  ];
  const [containerWidth, setContainerWidth] = useState(0);
  const numColumns = 3;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'orange'}}>
      <QhotoHeader rightIcon={rightIcon} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 0.1,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(0);
          }}>
          <Text
            style={
              selectedIdx === 0
                ? {width: 80, textAlign: 'center', color: 'purple'}
                : {width: 80, textAlign: 'center'}
            }>
            DAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(1);
          }}>
          <Text
            style={
              selectedIdx === 1
                ? {width: 80, textAlign: 'center', color: 'purple'}
                : {width: 80, textAlign: 'center'}
            }>
            WEEK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(2);
          }}>
          <Text
            style={
              selectedIdx === 2
                ? {width: 80, textAlign: 'center', color: 'purple'}
                : {width: 80, textAlign: 'center'}
            }>
            MONTH
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={DATA}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => (
            <Item
              title={item.title}
              width={containerWidth / numColumns}
              height={containerWidth / numColumns}
            />
          )}
          keyExtractor={(item, index) => index}
          numColumns={numColumns}
        />
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={styles.centeredView}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Pressable>
              <View style={styles.modalView}>
                <SelectedFeed />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'black',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AllFeed;
