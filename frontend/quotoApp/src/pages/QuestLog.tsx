import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const questTypes: {[key: string]: {iconName: string; colorCode: string}} = {
  건강: {iconName: 'running', colorCode: '#C25445'},
  일상: {iconName: 'sun', colorCode: '#ECB21D'},
  환경: {iconName: 'leaf', colorCode: '#70A348'},
  이색: {iconName: 'star', colorCode: '#2271CE'},
  색깔: {iconName: 'palette', colorCode: '#4B179F'},
};

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

function QhotoLevel() {
  const [items, setItems] = React.useState<AgendaSchedule>({});
  const data = {
    '2022-10-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#4B179F',
        },
      },
    },
    '2022-11-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#70A348',
        },
      },
    },
    '2022-10-29': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#ECB21D',
        },
      },
    },
    '2022-10-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#C25445',
        },
      },
    },
  };

  const loadItems = (day: DateData) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              // height: Math.max(10, Math.floor(Math.random() * 150)),
              height: 20,
              day: strTime,
            });
          }
        }
      }
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item: AgendaEntry) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <TouchableOpacity>
          <Text style={styles.subject}>
            <FontAwesome5 name="angle-left" size={20} />
            &nbsp; qhoto 로그
          </Text>
        </TouchableOpacity>
      </View>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        showClosingKnob={true}
        refreshing={false}
        markedDates={data}
        markingType="custom"
        minDate={'2022-01-01'}
        maxDate={'2022-12-31'}
        renderItem={renderItem}
        hideExtraDays={true}
        theme={{
          todayTextColor: '#3626AF',
          todayBackgroundColor: '',
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
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

export default QhotoLevel;
