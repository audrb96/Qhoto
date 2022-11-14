import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import info from '../../components/info';

const questTypes: {[key: string]: {iconName: string; questColorCode: string}} =
  info.questTypes;

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

interface marker {
  selected: boolean;
  customStyles: {
    container: {
      backgroundColor: string;
    };
    text: {color: string};
  };
  questName: string;
  typeCode: string;
  feedTime: string;
  feedImage: string;
}

interface UserLog {
  feedId: number;
  feedImage: string;
  feedTime: string;
  questName: string;
  typeCode: string;
  feedType: string;
}

function QhotoLog({navigation, route}) {
  const data: {[key: string]: marker} = {};

  route.params.logs.forEach((item: UserLog) => {
    const key = item.feedTime.split(' ')[0];
    data[key] = {
      selected: true,
      customStyles: {
        container: {backgroundColor: questTypes[item.typeCode].questColorCode},
        text: {color: 'white'},
      },
      questName: item.questName,
      typeCode: item.typeCode,
      feedTime: item.feedTime,
      feedImage: item.feedImage,
    };
  });

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.subject}>
            <FontAwesome5 name="angle-left" size={20} />
            &nbsp; qhoto 로그
          </Text>
        </TouchableOpacity>
      </View>
      <CalendarList
        pastScrollRange={10}
        futureScrollRange={10}
        scrollEnabled={true}
        showScrollIndicator={true}
        markedDates={data}
        markingType="custom"
        onDayPress={day => {
          if (day.dateString in data) {
            console.log(data[day.dateString].questName);
          }
        }}
        theme={{
          textDayFontWeight: 'bold',
          monthTextColor: '#3B28B1',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 25,
          textMonthFontFamily: 'esamanru-Bold',
          selectedDayTextColor: 'black',
          selectedDayBackgroundColor: 'white',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjectContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  subject: {
    color: '#3B28B1',
    fontSize: 20,
    fontFamily: 'MICEGothic-Bold',
  },
});

export default QhotoLog;
