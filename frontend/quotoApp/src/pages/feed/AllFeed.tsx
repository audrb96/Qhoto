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
} from 'react-native';
import QhotoHeader from '../../components/QhotoHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectedFeed from './SelectedFeed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllFeeds, getSelectedFeed, setFeedMission} from '../../api/feed';
import MissionModal from './MissionModal';
import Video from 'react-native-video';

function AllFeed({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [Feeds, setFeeds] = useState([]);
  // 활성화된 퀘스트의 아이디
  const [condition, setCondition] = useState([10, 11, 12]);
  // duration = D, W, M
  const [duration, setDuration] = useState('D');
  const [commentList, setComment] = useState([]);
  const [missionFilter, setmissionFilter] = useState([]);

  useEffect(() => {
    let change_condition = '';
    condition.forEach(elem => {
      change_condition += elem + ',';
    });
    const curcondtion = change_condition.substring(
      0,
      change_condition.length - 1,
    );
    const params = [duration, curcondtion];
    async function SetAllFeeds() {
      await getAllFeeds(
        params,
        res => {
          setFeeds(res.data.content);
        },
        err => {
          console.log(err);
        },
      );
    }
    SetAllFeeds();
  }, [duration, condition]);

  const rightIcon = (
    <TouchableOpacity
      onPress={() => {
        console.log('미션필터펼치기');
        setFeedMission(
          res => {
            let missions = [];
            if (duration === 'D') {
              res.data.options.dailyOptions.map(item => {
                missions.push(item.questName);
              });
              setmissionFilter(missions);
            } else if (duration === 'W') {
              res.data.options.weeklyOptions.map(item => {
                missions.push(item.questName);
              });
              setmissionFilter(missions);
            } else if (duration === 'M') {
              res.data.options.monthlyOptions.map(item => {
                missions.push(item.questName);
              });
              setmissionFilter(missions);
            }
          },
          err => {
            console.log(err);
          },
        );
        setMissionVisible(true);
      }}>
      <Ionicons
        name="options-outline"
        size={40}
        color="#3B28B1"
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
          right: 0,
          top: -20,
        }}
      />
    </TouchableOpacity>
  );

  // content.feedId = 14, 33이 있다.
  const Item = ({content, width, height}) =>
    content.feedType === 'VIDEO' ? (
      <View
        style={{
          width,
          height,
          backgroundColor: 'gray',
        }}>
        {/* <Text>{content.feedImage}</Text> */}

        <TouchableOpacity
          onPress={() => {
            getSelectedFeed(
              content.feedId,
              res => {
                setComment(res.data);
              },
              err => {
                console.log(err);
              },
            );
            setModalVisible(true);
          }}>
          <Video
            source={{
              uri: content.feedImage,
            }}
            style={{width: '100%', height: '100%'}}
            // fullscreen={true}
            // resizeMode={'contain'}
            resizeMode={'cover'}
            // resizeMode={'stretch'}
            repeat={true}
            // controls={true}
            paused={true}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={{
          width,
          height,
          backgroundColor: 'gray',
        }}>
        {/* <Text>{content.feedImage}</Text> */}

        <TouchableOpacity
          onPress={() => {
            getSelectedFeed(
              content.feedId,
              res => {
                setComment(res.data);
              },
              err => {
                console.log(err);
              },
            );
            setModalVisible(true);
          }}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
            source={{
              uri: content.feedImage,
            }}
          />
        </TouchableOpacity>
      </View>
    );

  const [containerWidth, setContainerWidth] = useState(0);
  const numColumns = 3;
  const parentFunction = () => {
    setModalVisible(!modalVisible);
  };
  const missionvisibleFunction = () => {
    setMissionVisible(!missionVisible);
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
            setDuration('D');
          }}>
          <Text style={selectedIdx === 0 ? styles.onText : styles.offText}>
            DAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(1);
            setDuration('W');
          }}>
          <Text style={selectedIdx === 1 ? styles.onText : styles.offText}>
            WEEK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIdx(2);
            setDuration('M');
          }}>
          <Text style={selectedIdx === 2 ? styles.onText : styles.offText}>
            MONTH
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={Feeds}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => (
            <Item
              content={item}
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
              setModalVisible(!modalVisible);
            }}>
            <Pressable style={styles.modalView}>
              <SelectedFeed
                parentFunction={parentFunction}
                props={commentList}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={missionVisible}
          onRequestClose={() => {
            setMissionVisible(!missionVisible);
          }}>
          <MissionModal
            parentFunction={missionvisibleFunction}
            props={missionFilter}
          />
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
