import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  questTheme?: string;
  questContent?: string;
  questType?: string;
}

const QuestCard: React.FC<Props> = props => {
  const {questTheme, questContent, questType} = props;
  return (
    <View style={{flex: 1}}>
      <Text style={styles.questType}>{questType}</Text>
      <View style={styles.card}>
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text style={styles.labelContent}>이색 퀘스트</Text>
          </View>
        </View>
        <View style={styles.questContentContainer}>
          <Text style={styles.questContent}>고양이 사진찍기</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questType: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
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
    color: '#C25445',
  },
});

export default QuestCard;
