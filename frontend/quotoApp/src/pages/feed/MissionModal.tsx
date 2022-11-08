import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function MissionModal({parentFunction, props}) {
  return (
    <Pressable
      style={styles.centeredView}
      onPress={() => {
        parentFunction();
      }}>
      <Pressable style={styles.modalView}>
        {props.map(item => (
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{item}</Text>
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
            backgroundColor: 'red',
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>확인</Text>
        </TouchableOpacity>
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
    height: 300,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
  },
  body: {
    flex: 1,
  },
  questCardContainer: {
    flex: 3,
  },
  questButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 45,
    backgroundColor: '#4B179F',
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
