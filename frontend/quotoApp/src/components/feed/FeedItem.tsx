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
import {Avatar} from 'react-native-paper';
import Video from 'react-native-video';
import {BlurView} from '@react-native-community/blur';

import info from '../info';

import {setFeedLike, setFeedDislike} from '../../api/feed';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';

interface Props {
  feed: Feed;
  handleCommentClick: Function;
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

const questTypes: {
  [key: string]: {
    typeName: string;
    iconName: string;
    questColorCode: string;
    stamp: any;
  };
} = info.questTypes;

const levelInfo: {
  [key: string]: {
    gradeColorCode: string;
    colorName: string;
    nextColor: string;
    minPoint: number;
    maxPoint: number;
  };
} = info.levelInfo;

const FeedItem: React.FC<Props> = props => {
  const {
    feedId,
    userId,
    userImage,
    nickname,
    feedImage,
    feedTime,
    questName,
    questType,
    questPoint,
    expPoint,
    expGrade,
    likeStatus,
    likeCount,
    commentList,
    feedType,
  } = props.feed;

  const {handleCommentClick} = props;

  const {typeName, iconName, questColorCode} = questTypes[questType];
  const {colorName, gradeColorCode} = levelInfo[expGrade];

  const [isLike, setIsLike] = useState(likeStatus === 'LIKE' ? true : false);

  const isAccessable = true;

  const handleLikeClick = () => {
    if (isLike) {
      setFeedDislike(
        feedId,
        (res: any) => {
          setIsLike(!isLike);
        },
        (err: any) => {
          console.log(err.response);
        },
      );
    } else {
      setFeedLike(
        feedId,
        (res: any) => {
          setIsLike(!isLike);
        },
        (err: any) => {
          console.log(err.response.data);
        },
      );
    }
  };

  const navigation = useNavigation();

  // const moveProfile = () => {
  //   navigate('OtherPage');
  // };

  return (
    <View style={styles.feedContainer}>
      <View style={styles.profileBar}>
        <View style={styles.userInfo}>
          <Pressable
            onPress={() => navigation.navigate('OtherPage', {userId: userId})}>
            <Avatar.Image size={50} source={{uri: userImage}} />
          </Pressable>
          <View style={{justifyContent: 'center', paddingHorizontal: 12}}>
            <Text style={[styles.gradeText, {color: gradeColorCode}]}>
              {colorName}
            </Text>
            <Text style={styles.userNameText}>{nickname}</Text>
          </View>
        </View>
        <Icon
          name={iconName}
          color={questColorCode}
          style={{fontSize: 32, marginRight: 10}}
        />
      </View>
      <View style={styles.mediaContainer}>
        <Pressable>
          {feedType === 'IMAGE' ? (
            // <Image
            //   source={{uri: feedImage}}
            //   style={styles.image}
            //   blurRadius={isAccessable ? 0 : 10}
            // />
            <ImageBackground
              source={{uri: feedImage}}
              style={styles.image}
              blurRadius={isAccessable ? 0 : 30}>
              {isAccessable ? null : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="eye-slash"
                    size={50}
                    color="#3B28B1"
                    style={{marginBottom: 10}}
                  />
                  <Text style={styles.noAccessText}>퀘스트를 완료하고</Text>
                  <Text style={styles.noAccessText}>
                    다른 친구들의 피드를 확인하세요
                  </Text>
                  <TouchableOpacity style={styles.noAccessButton}>
                    <Text style={styles.noAccessButtonText}>
                      퀘스트 완료하러 가기
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ImageBackground>
          ) : (
            <View>
              <Video
                source={{
                  uri: feedImage,
                }}
                style={styles.video}
                resizeMode="stretch"
                repeat={true}
                paused={!isAccessable}
              />
              <View
                style={{
                  width: width,
                  height: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Hello</Text>
              </View>
            </View>
          )}
        </Pressable>
      </View>
      <View style={styles.infoBar}>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={handleLikeClick}>
            {isLike ? (
              <FontAwesome name="heart" size={28} color={questColorCode} />
            ) : (
              <FontAwesome name="heart-o" size={28} color={questColorCode} />
            )}
          </Pressable>
          <TouchableOpacity
            onPress={handleCommentClick}
            style={{marginLeft: 25, marginTop: -2}}>
            <FontAwesome name="comment-o" size={28} color={questColorCode} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.feedTimeText}>{feedTime}</Text>
        </View>
      </View>
      <View style={styles.commentBar}>
        {/* <Text>{commentList[0].userId}</Text>
        <Text>{commentList[0].commentContext}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {marginVertical: 4},
  profileBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  userInfo: {flexDirection: 'row'},
  gradeText: {fontFamily: 'esamanru-Bold', fontSize: 14},
  userNameText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  mediaContainer: {width: width, height: width},
  image: {width: width, height: width, resizeMode: 'cover'},
  video: {
    width: width,
    height: width,
    position: 'absolute',
  },
  noAccessText: {
    color: '#3B28B1',
    fontSize: 22,
    fontFamily: 'esamanru-Medium',
    marginBottom: 9,
  },
  noAccessButton: {
    padding: 16,
    backgroundColor: '#3B28B1',
    elevation: 3,
    borderRadius: 15,
  },
  noAccessButtonText: {
    color: 'white',
    fontFamily: 'esamanru-Medium',
    fontSize: 16,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  feedTimeText: {
    color: '#A7A7A7',
    fontSize: 18,
  },
  commentBar: {},
});

export default FeedItem;
