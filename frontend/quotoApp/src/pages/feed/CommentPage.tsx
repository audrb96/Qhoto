import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface Comment {
  userId: number;
  commentContext: string;
  commentTime: string;
}

const {width, height} = Dimensions.get('window');

function CommentPage({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Text>댓글페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default CommentPage;
