import React, {useEffect, useState, useRef} from 'react';

import {RootState} from '../../store/reducer';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  setFeedLike,
  setFeedDisLike,
  setComment,
  getSelectedFeed,
} from '../../api/feed';
import Video from 'react-native-video';
import info from '../../components/info';
import Icon from 'react-native-vector-icons/FontAwesome5';

function SelectedFeed({parentFunction, props}) {
  const [selectedFeed, setSelectedFeed] = useState([]);
  const [text, onChangeText] = useState('');
  const [isLike, setLike] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const userInfo = useSelector((state: RootState) => state.user);
  const feed = selectedFeed;
  const lastNameRef = useRef();

  useEffect(() => {
    getSelectedFeed(
      props,
      res => {
        setSelectedFeed(res.data);
        setLike(res.data.likeStatus);
      },
      err => {
        console.log(err.response.data);
        console.log('getSelectedFeed에러입니다.');
      },
    );
  }, []);

  const questTypes: {
    [key: string]: {typeName: string; iconName: string; colorCode: string};
  } = info.questTypes;

  if (feed.userId) {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', flex: 0.15}}>
          <View style={{flex: 0.15}}>
            <Avatar.Image size={30} source={{uri: feed.userImage}} />
          </View>
          <View style={{flex: 0.8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image size={15} source={{uri: feed.userImage}} />
              <Text>뱃지넣기</Text>
              <Text>{feed.userId}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>{feed.nickName}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              parentFunction();
            }}
            style={{
              justifyContent: 'center',
              flex: 0.1,
            }}>
            <Text
              style={{
                fontSize: 30,
                height: '100%',
                textAlign: 'center',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Icon
            name={questTypes[feed.questType].iconName}
            color={questTypes[feed.questType].colorCode}
            style={{fontSize: 30}}
          />
          <View style={{flex: 0.6}}>
            <Text>{feed.questName}</Text>
          </View>
        </View>

        <View style={{flex: 0.8, marginTop: 10}}>
          {feed.feedType === 'VIDEO' ? (
            <Video
              source={{
                uri: feed.feedImage,
              }}
              style={{width: '100%', height: 300, borderRadius: 20}}
              // fullscreen={true}
              resizeMode={'cover'}
              repeat={true}
              // controls={true}
            />
          ) : (
            <Image
              style={{
                width: '100%',
                height: 300,
                resizeMode: 'stretch',
                borderRadius: 20,
              }}
              source={{
                uri: feed.feedImage,
              }}
            />
          )}

          <View style={{flexDirection: 'row', marginTop: 5}}>
            <TouchableOpacity
              style={{flex: 0.12}}
              onPress={() => {
                isLike === 'LIKE'
                  ? setFeedDisLike(
                      feed.feedId,
                      res => {
                        setLike('UNLIKE');
                      },
                      err => {
                        console.log(err.response.data);
                      },
                    )
                  : setFeedLike(
                      feed.feedId,
                      res => {
                        setLike('LIKE');
                      },
                      err => {
                        console.log(err);
                      },
                    );
              }}>
              <AntDesign
                name={isLike === 'LIKE' ? 'heart' : 'hearto'}
                size={25}
                color={isLike === 'LIKE' ? 'red' : 'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                lastNameRef.current.focus();
              }}>
              <Ionicons name="chatbubble-outline" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={isFocused || text ? {borderBottomWidth: 1} : {}}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder="댓글입력"
          editable
          onChangeText={onChangeText}
          value={text}
          ref={lastNameRef}
        />

        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {text ? (
            <>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setComment(
                    [feed.feedId, text],
                    res => {
                      console.log('댓글입력완료');
                      feed.commentList.push({
                        commentContext: text,
                        userId: userInfo.nickname,
                      });
                      onChangeText('');
                    },
                    err => {
                      console.log('댓글에서 오류남.');
                      console.log(err);
                    },
                  );
                }}>
                <Text>댓글</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  onChangeText('');
                }}>
                <Text>취소</Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </View>

        <View style={{marginTop: 5}}>
          {feed.commentList.map((comment, index) => (
            <View key={index}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                  }}>
                  {comment.userId}&nbsp;&nbsp;&nbsp;&nbsp;
                  <Text style={{fontSize: 12}}>{comment.commentContext}</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>기다려주세요</Text>
      </View>
    );
  }
}

export default SelectedFeed;
