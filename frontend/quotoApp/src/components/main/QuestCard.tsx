import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import GestureFlipView from 'react-native-gesture-flip-card';

import CardTemplate from './CardTemplate';

interface Props {
  questType: string;
  questList: Quest[] | undefined;
  questIdx: number;
  setQuestIdx: Function;
  isComplete: boolean;
}

interface Quest {
  activeId: number;
  questId: number;
  questName: string;
  questType: string;
  questScore: number;
  questDifficulty: number;
  questImage: string;
}

const QuestCard: React.FC<Props> = props => {
  const viewRef: any = useRef();

  const {questType, questList, questIdx, setQuestIdx, isComplete} = props;
  const [nextQuestIdx, setNextQuestIdx] = useState(2);
  const [frontCard, setFrontCard] = useState(questList[0]);
  const [backCard, setBackCard] = useState(
    isComplete ? questList[0] : questList[1],
  );
  const [isFront, setIsFront] = useState(true);

  const handleFlip = () => {
    if (isFront) {
      setFrontCard({...questList[nextQuestIdx]});
    } else {
      setBackCard({...questList[nextQuestIdx]});
    }
    setQuestIdx((questIdx + 1) % 3);
    setNextQuestIdx((nextQuestIdx + 1) % 3);
    setIsFront(!isFront);
  };

  const handleRerollClick = () => {
    viewRef.current.flipLeft();
  };

  return frontCard === undefined || backCard === undefined ? null : (
    <View style={styles.container}>
      <Text style={styles.questType}>{questType}</Text>
      <GestureFlipView
        width={300}
        height={400}
        gestureEnabled={false}
        onFlipEnd={handleFlip}
        style={{flex: 1}}
        ref={(ref: any) => (viewRef.current = ref)}>
        <CardTemplate
          questName={frontCard.questName}
          questType={frontCard.questType}
          questImage={frontCard.questImage}
          questDifficulty={frontCard.questDifficulty}
          handleRerollClick={handleRerollClick}
          isComplete={isComplete}
        />
        <CardTemplate
          questName={backCard.questName}
          questType={backCard.questType}
          questImage={backCard.questImage}
          questDifficulty={backCard.questDifficulty}
          handleRerollClick={handleRerollClick}
          isComplete={isComplete}
        />
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
    fontFamily: 'Happiness-Sans-Bold',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default QuestCard;
