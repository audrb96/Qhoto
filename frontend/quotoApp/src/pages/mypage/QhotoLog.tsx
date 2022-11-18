import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import Modal from 'react-native-modal';

import info from '../../components/info';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeedDetail from '../../components/feed/FeedDetail';
import {useIsFocused, useNavigation} from '@react-navigation/native';

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

const {width, height} = Dimensions.get('window');

function QhotoLog({route}) {
  const navigation = useNavigation();

  const data: {[key: string]: marker} = {};
  const [modalVisible, setModalVisible] = useState(false);

  const dummyData = {
    '2022-11-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-11': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-08': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-06': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-02': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-11-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-29': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-27': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-26': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-25': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-24': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-23': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-22': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-21': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-20': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-18': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-17': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-12': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-11': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-08': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-07': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-02': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-10-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-30': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-27': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-26': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-25': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-24': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-23': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-22': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-21': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-20': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-19': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-18': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-17': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-12': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-11': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-08': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-07': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-06': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-09-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-30': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-29': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-28': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-27': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-26': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-25': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-24': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-23': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-22': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-21': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-19': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-18': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-17': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-16': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-15': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-14': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-12': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-10': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-09': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-06': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-05': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-04': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['S'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-03': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['H'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-02': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['C'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-08-01': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-07-31': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['D'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
    '2022-07-30': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: questTypes['E'].questColorCode,
        },
        text: {color: 'white'},
      },
    },
  };

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
        markedDates={dummyData}
        markingType="custom"
        onDayPress={day => {
          if (day.dateString in data) {
            console.log(data[day.dateString].questName);
            setModalVisible(true);
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
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
        backdropOpacity={0.1}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <FeedDetail date={'2022-11-15'} />
      </Modal>
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
