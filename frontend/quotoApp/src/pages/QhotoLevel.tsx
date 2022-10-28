import React, {useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

function QhotoLevel({navigation}) {
  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };
  return (
    <View>
      <Text> QhotoLevel 화면</Text>
      <View>
        <TouchableOpacity onPress={goToMyPage}>
          <Text style={{fontWeight: 'bold', color: '#3B28B1', fontSize: 40}}>
            이동
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QhotoLevel;
