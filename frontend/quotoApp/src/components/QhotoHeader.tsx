import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {HEADER_LOGO} from '../image';

function QhotoHeader({leftIcon}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      {leftIcon && (
        <TouchableOpacity style={styles.leftIcon}>{leftIcon}</TouchableOpacity>
      )}
      <Image
        style={{
          height: 50,
          resizeMode: 'contain',
          marginTop: 15,
        }}
        source={HEADER_LOGO}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    // position: 'absolute',
    // top: 10,
    // left: 5,
    // justifyContent: 'center',
    // height: 100,
    // width: 100,
    // backgroundColor: 'blue',
    zIndex: 3,
  },
});

export default QhotoHeader;
