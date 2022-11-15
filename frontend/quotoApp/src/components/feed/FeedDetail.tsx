import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Video from 'react-native-video';
import {BlurView} from '@react-native-community/blur';

import info from '../info';

import {setFeedLike, setFeedDislike} from '../../api/feed';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';

interface Props {
  date: string;
}

interface Feed {
  feedId: number;
  userId: number;
  userImage: string;
  nickname: string;
  feedImage: string;
  feedTime: string;
  questName: string;
  questType: string;
  questPoint: number;
  expPoint: number;
  expGrade: string;
  likeStatus: string;
  likeCount: number;
  feedType: string;
  commentList: Comment[];
}

interface Comment {
  userId: number;
  commentContext: string;
  commentTime: string;
}

const {width, height} = Dimensions.get('window');

const FeedDetail: React.FC<Props> = props => {
  const {date} = props;
  const [feedInfo, setFeedInfo] = useState<Feed>();

  useEffect(() => {}, []);
  return (
    <View style={styles.logDetailContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        bounces={true}
        style={{flex: 1, width: '100%'}}>
        <View
          style={{
            flex: 1,
            width: width * 0.9,
            backgroundColor: 'blue',
          }}>
          <View style={{height: 80, backgroundColor: 'white'}}></View>
        </View>
        <View
          style={{
            flex: 1,
            width: width * 0.9,
            backgroundColor: 'red',
          }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logDetailContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
  },
});

export default FeedDetail;
