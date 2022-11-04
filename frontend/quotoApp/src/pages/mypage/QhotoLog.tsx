import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const questTypes: {[key: string]: {iconName: string; colorCode: string}} = {
  건강: {iconName: 'running', colorCode: '#C25445'},
  일상: {iconName: 'sun', colorCode: '#ECB21D'},
  환경: {iconName: 'leaf', colorCode: '#70A348'},
  이색: {iconName: 'star', colorCode: '#2271CE'},
  색깔: {iconName: 'palette', colorCode: '#592CB8'},
};

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

function QhotoLog() {
  // const [items, setItems] = React.useState<AgendaSchedule>({});
  const data = {
    '2022-10-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#592CB8',
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

  // const loadItems = (day: DateData) => {
  //   // setTimeout(() => {
  //   //   for (let i = -15; i < 85; i++) {
  //   //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //   //     const strTime = timeToString(time);

  //   //     if (!items[strTime]) {
  //   //       items[strTime] = [];

  //   //       const numItems = Math.floor(Math.random() * 3 + 1);
  //   //       for (let j = 0; j < numItems; j++) {
  //   //         items[strTime].push({
  //   //           name: 'Item for ' + strTime + ' #' + j,
  //   //           // height: Math.max(10, Math.floor(Math.random() * 150)),
  //   //           height: 20,
  //   //           day: strTime,
  //   //         });
  //   //       }
  //   //     }
  //   //   }
  //   //   const newItems: AgendaSchedule = {};
  //   //   Object.keys(items).forEach(key => {
  //   //     newItems[key] = items[key];
  //   //   });
  //   //   setItems(newItems);
  //   // }, 1000);
  //   setItems({
  //     '2022-10-28': [
  //       {name: '3km 달리기', height: 20, day: '2022-10-28'},
  //       {name: '등산하기', height: 20, day: '2022-10-28'},
  //     ],
  //     '2022-10-29': [{name: '고양이 사진찍기', height: 20, day: '2022-10-29'}],
  //     '2022-10-31': [
  //       {name: '할로윈 이벤트 참여하기', height: 20, day: '2022-10-31'},
  //     ],
  //     '2022-11-01': [{name: '텀블러 사용하기', height: 20, day: '2022-10-31'}],
  //   });
  // };

  // const renderItem = (item: AgendaEntry) => {
  //   return (
  //     <TouchableOpacity style={styles.item}>
  //       <View style={styles.agendaContainer}>
  //         <Text>{item.name}</Text>
  //         <View style={styles.agendaIndicator}></View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderEmptyItem = () => {
  //   return <View />;
  // };

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.subjectContainer}>
  //       <TouchableOpacity>
  //         <Text style={styles.subject}>
  //           <FontAwesome5 name="angle-left" size={20} />
  //           &nbsp; qhoto 로그
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //     <Agenda
  //       items={items}
  //       loadItemsForMonth={loadItems}
  //       showClosingKnob={true}
  //       refreshing={false}
  //       markedDates={data}
  //       markingType="custom"
  //       minDate={'2022-01-01'}
  //       maxDate={'2022-12-31'}
  //       renderItem={renderItem}
  //       renderEmptyDate={renderEmptyItem}
  //       hideExtraDays={true}
  //       scr
  //       theme={{
  //         todayTextColor: '#3626AF',
  //         todayBackgroundColor: '',
  //         calendarBackground: 'white',
  //         agendaKnobColor: '#9F9F9F',
  //       }}
  //     />
  //   </View>
  // );
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
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={10}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={10}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        markedDates={data}
        markingType="custom"
        onDayPress={day => console.log(day)}
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
    marginTop: 20,
  },
  agendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    backgroundColor: 'white',
  },
  agendaIndicator: {
    width: 5,
    height: '100%',
    backgroundColor: 'red',
  },
});

export default QhotoLog;
