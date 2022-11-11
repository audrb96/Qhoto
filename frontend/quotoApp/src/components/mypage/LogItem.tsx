import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import info from '../info';

import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  log: UserLog;
}

interface UserLog {
  feedId: number;
  feedImage: string;
  feedTime: string;
  questName: string;
  typeCode: string;
}

const questTypes: {
  [key: string]: {
    typeName: string;
    iconName: string;
    colorCode: string;
    stamp: any;
  };
} = info.questTypes;

const {width, height} = Dimensions.get('window');

const LogItem: React.FC<Props> = props => {
  const {typeCode, questName, feedTime, feedImage} = props.log;
  const {typeName, iconName, colorCode} = questTypes[typeCode];
  return (
    <View style={[styles.logContainer, {borderRightColor: colorCode}]}>
      <Image source={{uri: feedImage}} style={styles.imageContainer} />
      <View style={styles.contentContainer}>
        <Text style={styles.logTime}>{feedTime}</Text>
        <Text style={[styles.questType, {color: colorCode}]}>
          <Icon name={iconName} color={colorCode} size={16} />
          &nbsp;
          {`${typeName} 퀘스트`}
        </Text>
        <Text style={[styles.questName, {color: colorCode}]}>
          {questName.split('<br>').map(item => (
            <Text>{item} </Text>
          ))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRightWidth: 5,
  },
  imageContainer: {width: width / 4, height: width / 4, borderRadius: 15},
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  logTime: {
    fontFamily: 'MICEGothic-Medium',
    fontSize: 14,
    color: '#6F6F6F',
    marginVertical: 1,
  },
  questType: {
    fontFamily: 'MICEGothic-Bold',
    fontSize: 16,
    marginVertical: 3,
  },
  questName: {
    fontFamily: 'MICEGothic-Bold',
    fontSize: 22,
    marginVertical: 3,
  },
});

export default LogItem;
