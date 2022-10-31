import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';

function AllFeed({navigation}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const goSelectedFeed = () => {
    navigation.navigate('SelectedFeed');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'orange'}}>
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
      <View>
        <Text>사진리스트보여주기</Text>
      </View>
      <View>
        <TouchableOpacity onPress={goSelectedFeed}>
          <Text>페이지이동</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AllFeed;
