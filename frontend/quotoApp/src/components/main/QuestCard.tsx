import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View, Text, Pressable} from 'react-native';
import GestureFlipView from 'react-native-gesture-flip-card';

interface Props {
  questTheme?: string;
  questContent?: string;
  questType?: string;
  windowSize?: number;
}

const windowSize = Dimensions.get('window').width;

const QuestCard: React.FC<Props> = props => {
  const {questTheme, questContent, questType} = props;
  const viewRef = useRef();

  const card = () => {};

  const renderFront = () => {
    return (
      <Pressable
        style={styles.frontStyle}
        onPress={() => viewRef.current.flipLeft()}>
        <View style={styles.labelContainer}>
          <View style={styles.frontLabel}>
            <Text style={styles.labelContent}>건강 퀘스트</Text>
          </View>
        </View>
        <View style={styles.questContentContainer}>
          <Text style={styles.frontQuestContent}>3km 달리기</Text>
        </View>
      </Pressable>
    );
  };

  const renderBack = () => {
    return (
      <Pressable
        style={styles.backStyle}
        onPress={() => viewRef.current.flipLeft()}>
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text style={styles.labelContent}>그린 퀘스트</Text>
          </View>
        </View>
        <View style={styles.questContentContainer}>
          <Text style={styles.questContent}>텀블러 사용하기</Text>
        </View>
      </Pressable>
    );
  };

  return (
    // <View style={{flex: 1}}>
    //   <Text style={styles.questType}>{questType}</Text>
    //   <View style={styles.card}>
    //     <View style={styles.labelContainer}>
    //       <View style={styles.label}>
    //         <Text style={styles.labelContent}>이색 퀘스트</Text>
    //       </View>
    //     </View>
    //     <View style={styles.questContentContainer}>
    //       <Text style={styles.questContent}>고양이 사진찍기</Text>
    //     </View>
    //   </View>
    // </View>
    <View style={styles.container}>
      <Text style={styles.questType}>{questType}</Text>
      <GestureFlipView
        width={300}
        height={400}
        gestureEnabled={false}
        style={{flex: 1}}
        ref={ref => (viewRef.current = ref)}>
        {renderBack()}
        {renderFront()}
      </GestureFlipView>
    </View>
  );
};

const styles = StyleSheet.create({
  questType: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#595959',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    width: 150,
    height: 50,
    backgroundColor: '#70A348',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  frontLabel: {
    width: 150,
    height: 50,
    backgroundColor: '#C25445',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  labelContent: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
  questContentContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  questContent: {
    textAlign: 'center',
    fontSize: 30,
    color: '#70A348',
  },
  frontQuestContent: {
    textAlign: 'center',
    fontSize: 30,
    color: '#C25445',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontStyle: {
    width: (windowSize * 5) / 6,
    height: 350,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
  backStyle: {
    width: (windowSize * 5) / 6,
    height: 350,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default QuestCard;
