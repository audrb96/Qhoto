import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, TextInput} from 'react-native-paper';

import {RootState} from '../../store/reducer';

import {getCommentList, setComment} from '../../api/feed';

import CommentItem from '../../components/feed/CommentItem';

interface Comment {
  userId: number;
  userImage: string;
  commentContext: string;
  commentTime: string;
  nickname: string;
}

const {width, height} = Dimensions.get('window');

function CommentPage({navigation, route}) {
  const feedId = route.params.feedId;
  const [commentList, setCommentList] = useState<Comment[]>();
  const [newComment, setNewComment] = useState('');
  const [commentState, setCommentState] = useState(true);

  const currUserImage = useSelector((state: RootState) => state.user.userImage);

  useEffect(() => {
    getCommentList(
      feedId,
      (res: any) => {
        console.log(res.data.content);
        setCommentList(res.data.content);
      },
      (err: any) => {
        console.log(err.response);
      },
    );
  }, [commentState]);

  const handleCommentSubmit = () => {
    if (newComment !== '') {
      setComment(
        feedId,
        newComment,
        (res: any) => {
          setCommentState(!commentState);
          setNewComment('');
        },
        (err: any) => {
          console.log(err.response);
        },
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      {commentList === undefined ? null : (
        <>
          <ScrollView>
            {commentList.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))}
          </ScrollView>

          <View style={styles.commentInputBoxContainer}>
            <Avatar.Image
              size={50}
              source={{
                uri: currUserImage,
              }}
            />
            <TextInput
              style={styles.commentInputBox}
              onChangeText={setNewComment}
              value={newComment}
              placeholder="댓글 입력..."
              onSubmitEditing={handleCommentSubmit}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentInputBoxContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  commentInputBox: {backgroundColor: 'white', flexGrow: 1},
});

export default CommentPage;
