import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

function MissionModal({parentFunction, props}) {
  return (
    <Pressable
      style={styles.centeredView}
      onPress={() => {
        parentFunction();
      }}>
      <Pressable style={styles.modalView}>
        {props.map(item => (
          <View>
            <Text>{item}</Text>
          </View>
        ))}
      </Pressable>
    </Pressable>
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
    borderWidth: 3,
  },
});

export default MissionModal;
