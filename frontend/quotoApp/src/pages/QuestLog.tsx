import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';

function QhotoLevel() {
  return <View></View>;
}

const styles = StyleSheet.create({
  subjectBox: {
    padding: 10,
  },
  subjectText: {
    color: '#3B28B1',
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 20,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default QhotoLevel;
