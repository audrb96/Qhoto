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
import axios from 'axios';
import {State} from 'react-native-gesture-handler';

function AllFeed({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [Feeds, setFeeds] = useState([]);

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
      <TouchableOpacity
        onPress={e => {
          setModalVisible(true);
          console.log(title);
        }}>
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
    {title: 3},
    {title: 4},
    {title: 5},
    {title: 6},
    {title: 7},
    {title: 8},
    {title: 9},
    {title: 10},
    {title: 11},
    {title: 12},
    {title: 13},
  ];
  const [containerWidth, setContainerWidth] = useState(0);
  const numColumns = 3;
  const parentFunction = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Text style={selectedIdx === 0 ? styles.onText : styles.offText}>
            DAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(1);
          }}>
          <Text style={selectedIdx === 1 ? styles.onText : styles.offText}>
            WEEK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(2);
          }}>
          <Text style={selectedIdx === 2 ? styles.onText : styles.offText}>
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
          numColumns={numColumns}
        />
      </View>

      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={styles.centeredView}
            onPress={() => {
              console.log(111);
              setModalVisible(!modalVisible);
            }}>
            <Pressable style={styles.modalView}>
              <SelectedFeed parentFunction={parentFunction} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: 350,
    height: 650,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    borderWidth: 3,
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
  onText: {
    width: 80,
    textAlign: 'center',
    color: 'purple',
  },
  offText: {
    width: 80,
    textAlign: 'center',
    color: 'black',
  },
});

export default AllFeed;
