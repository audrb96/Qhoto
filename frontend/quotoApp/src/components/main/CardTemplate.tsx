import React from 'react';
import {Dimensions, StyleSheet, View, Text, Image} from 'react-native';

import info from '../info';

import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  questName: string;
  questType: string;
  questImage: string;
  handleRerollClick: any;
  isComplete: boolean;
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

const CardTemplate: React.FC<Props> = props => {
  const {questName, questType, questImage, handleRerollClick, isComplete} =
    props;

  return (
    <View style={styles.card}>
      {isComplete ? null : (
        <Icon
          name="sync"
          style={styles.rerollIcon}
          onPress={handleRerollClick}
        />
      )}
      <View style={styles.labelContainer}>
        <View
          style={[
            styles.label,
            {
              backgroundColor: questTypes[questType].questColorCode,
            },
          ]}>
          <Text style={styles.labelContent}>
            <Icon name={questTypes[questType].iconName} size={15} />
            &nbsp;&nbsp; {questTypes[questType].typeName} 퀘스트
          </Text>
        </View>
      </View>
      <View style={styles.questContentContainer}>
        {questName.split('<br>').map((item, index) => (
          <Text
            key={index}
            style={[
              styles.questContent,
              {
                color: questTypes[questType].questColorCode,
              },
            ]}>
            {item}
          </Text>
        ))}
      </View>
      {isComplete ? (
        <Image
          resizeMode="contain"
          source={questTypes[questType].stamp}
          style={styles.stampImage}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width * 3) / 4,
    height: height / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
  },
  rerollIcon: {
    color: '#C7C7C7',
    fontSize: 20,
    position: 'absolute',
    top: 15,
    right: 20,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    width: 150,
    height: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  labelContent: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 16,
  },
  questContentContainer: {
    flex: 9,
    justifyContent: 'center',
    padding: 20,
  },
  questContent: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Happiness-Sans-Bold',
  },
  stampImage: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    width: width * 0.3,
    height: width * 0.3,
  },
});

export default CardTemplate;
