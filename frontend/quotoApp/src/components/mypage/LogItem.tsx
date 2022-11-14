import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import Video from 'react-native-video';
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
  feedType: string;
}

const questTypes: {
  [key: string]: {
    typeName: string;
    iconName: string;
    questColorCode: string;
    stamp: any;
  };
} = info.questTypes;

const {width, height} = Dimensions.get('window');

const LogItem: React.FC<Props> = props => {
  const {typeCode, questName, feedTime, feedImage, feedType} = props.log;
  const {typeName, iconName, questColorCode} = questTypes[typeCode];
  return (
    <View style={[styles.logContainer, {borderRightColor: questColorCode}]}>
      {feedType === 'IMAGE' ? (
        <Image source={{uri: feedImage}} style={styles.mediaContainer} />
      ) : (
        <Video
          source={{uri: feedImage}}
          style={styles.mediaContainer}
          resizeMode="cover"
          paused={true}
        />
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.logTime}>{feedTime}</Text>
        <Text style={[styles.questType, {color: questColorCode}]}>
          <Icon name={iconName} color={questColorCode} size={16} />
          &nbsp;
          {`${typeName} 퀘스트`}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.questName, {color: questColorCode}]}>
          {questName.split('<br>').map((item, index) => (
            <Text key={index}>{item} </Text>
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
  mediaContainer: {width: width / 4, height: width / 4, borderRadius: 15},
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
