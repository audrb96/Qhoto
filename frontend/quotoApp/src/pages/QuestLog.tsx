import React, {useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

function QhotoLevel({navigation}) {
  const goToMyPage = useCallback(() => {
    navigation.navigate('MyPage');
  }, [navigation]);
  return (
    <View>
      <Text> 퀘스트로그 화면</Text>
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
