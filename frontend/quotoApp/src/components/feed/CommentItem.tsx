import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar, TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  comment: Comment;
}

interface Comment {
  userId: number;
  userImage: string;
  commentContext: string;
  nickname: string;
  commentTime: string;
}

const {width, height} = Dimensions.get('window');

const CommentItem: React.FC<Props> = (props, {navigation}) => {
  const {userId, userImage, commentContext, commentTime, nickname} =
    props.comment;

  return (
    <View style={styles.commentContainer}>
      <Avatar.Image size={50} source={{uri: userImage}} />
      <View style={styles.commentContentContainer}>
        <Text style={styles.nicknameText}>{nickname}</Text>
        <Text style={styles.contentText}>{commentContext}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {flexDirection: 'row', padding: 10},
  commentContentContainer: {paddingHorizontal: 10, flex: 1},
  nicknameText: {fontWeight: 'bold', color: 'black', fontSize: 15},
  contentText: {fontSize: 15, color: 'black'},
});

export default CommentItem;
