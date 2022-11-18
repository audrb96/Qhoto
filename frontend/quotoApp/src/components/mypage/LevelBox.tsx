import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import info from '../info';

interface Props {
  userGrade: string;
  userPoint: number;
}

const levelInfo: {
  [key: string]: {
    gradeColorCode: string;
    colorName: string;
    nextColor: string;
    minPoint: number;
    maxPoint: number;
  };
} = info.levelInfo;

const {width, height} = Dimensions.get('window');

const LevelBox: React.FC<Props> = props => {
  const {userGrade, userPoint} = props;
  const {gradeColorCode, colorName, nextColor, minPoint, maxPoint} =
    levelInfo[userGrade];

  return (
    <View style={[styles.levelBox, {backgroundColor: gradeColorCode}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text
            style={{
              color: '#424242',
              fontFamily: 'MICEGothic-Bold',
              marginVertical: 3,
            }}>
            {colorName}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 40,
              fontFamily: 'esamanru-Bold',
              marginVertical: 3,
            }}>
            {userPoint}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: '#424242',
          fontFamily: 'MICEGothic-Bold',
          marginVertical: 3,
        }}>
        총퀘스트점수
      </Text>
      <View style={{marginVertical: 3}}>
        <View
          style={{
            width: '100%',
            height: 5,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        />
        <View
          style={{
            width: `${100 * ((userPoint - minPoint) / (maxPoint - minPoint))}%`,
            height: 5,
            borderRadius: 3,
            backgroundColor: 'black',
            position: 'absolute',
          }}
        />
      </View>
      {userPoint < 5000 ? (
        <Text
          style={{
            color: '#424242',
            fontFamily: 'MICEGothic-Bold',
            marginVertical: 3,
          }}>
          {nextColor} 레벨까지 {maxPoint - userPoint} Points 남음
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  levelBox: {
    width: (width * 4) / 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    color: 'black',
    elevation: 10,
  },
});

export default LevelBox;
