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

function SelectedFeed({parentFunction, props}) {
  const [text, onChangeText] = useState('');
  const [isLike, setLike] = useState(props.likeStatus);
  const [isFocused, setIsFocused] = useState(false);
  const category = {
    environment: 'https://cdn-icons-png.flaticon.com/128/259/259345.png',
    health: 'https://cdn-icons-png.flaticon.com/128/2262/2262878.png',
    daily: 'https://cdn-icons-png.flaticon.com/128/4397/4397734.png',
    special: 'https://cdn-icons-png.flaticon.com/128/2970/2970858.png',
  };
  const item = [
    {
      id: '0',
      title: 'First',
      profile: 'https://reactjs.org/logo-og.png',
      badge: 'https://reactjs.org/logo-og.png',
      nickname: '코린이1',
      profileId: 'hyungjin1asdfasdfasdf',
      feedtime: '오후02:00',
      questtag: category.health,
      feedImage:
        'https://file.mk.co.kr/meet/neds/2010/07/image_readtop_2010_348940_1278055177290222.jpg',
      like: true,
    },
  ];
  const feed = props;
  const lastNameRef = useRef();

  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {}, [feed.commentList]);

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
          <Image
            style={{
              width: '10%',
              height: '70%',
              resizeMode: 'stretch',
            }}
            source={{
              uri: item[0].questtag,
            }}
          />
          <View style={{flex: 0.3}}>
            <Text>feed.questType</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{feed.questName}</Text>
          </View>
        </View>
        <View style={{flex: 0.8, marginTop: 10}}>
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
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <TouchableOpacity
              style={{flex: 0.12}}
              onPress={() => {
                console.log('피드아이디');
                console.log(feed.feedId);
                isLike === 'LIKE'
                  ? setFeedDisLike(
                      feed.feedId,
                      res => {
                        setLike('UNLIKE');
                      },
                      err => {
                        console.log('에러');
                        console.log(err.response);
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

                      console.log(feed.commentList);
                      feed.commentList.push({
                        commentContext: text,
                        userId: userInfo.nickname,
                      });
                      onChangeText('');
                    },
                    err => {
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
        <Text>아직안됨</Text>
      </View>
    );
  }
}

export default SelectedFeed;
