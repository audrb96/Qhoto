import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function MissionModal({parentFunction, props}) {
  const [optionItems, setOptionItems] = useState([]);
  const [selectBox, setSelectBox] = useState([true, true, true]);
  const [missionFilter, setMissionFilter] = useState([]);
  const [duration, setDuration] = useState('');
  useEffect(() => {
    console.log(selectBox);
    setMissionFilter(props[0]);
    setDuration(props[1]);
  }, [selectBox]);
  console.log(missionFilter + '     미션필터');
  console.log(duration + '        듀레이션');

  useEffect(() => {
    console.log(optionItems);
  }, [optionItems]);

  return (
    <Pressable
      style={styles.centeredView}
      onPress={() => {
        parentFunction();
      }}>
      <Pressable style={styles.modalView}>
        {missionFilter.map((item, index) => (
          <View style={styles.modal} key={index}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: selectBox[index]
                    ? 'rgba(128, 0, 128, 0.1)'
                    : 'white',
                  borderTopRightRadius: index == 0 ? 20 : 0,
                  borderTopLeftRadius: index == 0 ? 20 : 0,
                },
              ]}
              onPress={() => {
                const newSelectBox = [...selectBox];
                newSelectBox[index] = !newSelectBox[index];
                setSelectBox(newSelectBox);
                const newOptionItems = [...optionItems];
                if (selectBox[index] === true) {
                  newOptionItems.splice(index, 1);
                } else {
                  newOptionItems.splice(index, 0, item);
                }
                setOptionItems(newOptionItems);
              }}>
              <Text style={styles.modalButtonText}>{item.questName}</Text>
            </TouchableOpacity>
          </View>
          // <TouchableOpacity
          //   style={{
          //     flex: 1,
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //   }}>
          //   <Text style={{fontSize: 30, color: 'purple'}}>{item}</Text>
          // </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => parentFunction()}>
          <Text
            style={[
              styles.modalButtonText,
              {textAlign: 'center', color: 'white'},
            ]}>
            확인
          </Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  body: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 18,
    color: '#595959',
  },
});

export default MissionModal;
