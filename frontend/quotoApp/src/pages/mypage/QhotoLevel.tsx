import React, {useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import QhotoHeader from '../../components/QhotoHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RootState} from '../../store/reducer';
import {useSelector} from 'react-redux';
import {Hexagon} from '@digieggs/rn-polygon-chart';
import {StackedBarChart} from 'react-native-chart-kit';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import LevelBox from '../../components/mypage/LevelBox';

function QhotoLevel({navigation}) {
  const goToLevelInfo = () => {
    navigation.navigate('LevelInfo');
  };
  const userInfo = useSelector((state: RootState) => state.user);
  // const MyStackedBarChart = () => {
  //   return (
  //     <>
  //       <Text style={(styles.header, {transform: [{rotate: '90deg'}]})}>
  //         Stacked Bar Chart
  //       </Text>
  //       <StackedBarChart
  //         data={{
  //           labels: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5'],
  //           legend: ['day', 'week', 'month'],
  //           data: [
  //             [60, 60, 60],
  //             [30, 30, 60],
  //             [10, 20, 30],
  //             [50, 10, 5],
  //             [70, 100, 10],
  //           ],
  //           barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  //         }}
  //         width={400}
  //         height={400}
  //         chartConfig={{
  //           backgroundColor: '#1cc910',
  //           backgroundGradientFrom: '#eff3ff',
  //           backgroundGradientTo: '#efefef',
  //           decimalPlaces: 2,
  //           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //           style: {
  //             borderRadius: 16,
  //             // transform: [{rotate: '90deg'}],
  //           },
  //         }}
  //         style={{
  //           marginVertical: 8,
  //           borderRadius: 16,
  //           transform: [{rotate: '90deg'}],
  //         }}
  //       />
  //     </>
  //   );
  // };
  const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];
  // const UserStackedBarChart = () => {
  //   const barData = [
  //     {value: 230, label: 'Jan', frontColor: '#4ABFF4'},
  //     {value: 180, label: 'Feb', frontColor: '#79C3DB'},
  //     {value: 195, label: 'Mar', frontColor: '#28B2B3'},
  //     {value: 250, label: 'Apr', frontColor: '#4ADDBA'},
  //     {value: 320, label: 'May', frontColor: '#91E3E3'},
  //   ];
  //   return (
  //     <View>
  //       <BarChart
  //         showFractionalValue
  //         showYAxisIndices
  //         noOfSections={4}
  //         maxValue={400}
  //         data={barData}
  //         isAnimated
  //       />
  //     </View>
  //   );
  // };

  const leftIcon = (
    <FontAwesome5
      name="angle-left"
      size={30}
      color="#3B28B1"
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        width: 40,
        height: 40,
        top: -10,
        left: 20,
        // backgroundColor: 'black',
      }} // Todo 해결!!!: top, left 주면 안눌림, size 200 으로 키우면 잘눌림
    />
  );

  return (
    <View>
      <QhotoHeader leftIcon={leftIcon} />
      <View>
        <View style={{marginVertical: 10, paddingHorizontal: 30}}>
          <View>
            <TouchableOpacity>
              <Text
                onPress={goToLevelInfo}
                style={[styles.subjectText, {alignItems: 'center'}]}>
                <Text>qhoto 레벨 &nbsp;</Text>
                <FontAwesome5 name="question-circle" size={20} color={'gray'} />
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <TouchableOpacity onPress={goToLevelInfo}>
              <LevelBox
                userGrade={userInfo.expGrade}
                userPoint={userInfo.totalExp}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              width: 300,
              height: 500,
              backgroundColor: 'purple',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 280,
                height: 450,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
        <View />
      </View>
      <View>{/* <LineChart data={data} areaChart /> */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pentagon: {width: 300, height: 600},
  triangle: {width: 300, height: 600},
  header: {
    transform: [{rotate: '90deg'}],
  },
  subjectText: {
    color: '#3B28B1',
    fontSize: 20,
    fontFamily: 'MICEGothic-Bold',
    marginBottom: 3,
    alignItems: 'center',
  },
  rightIcon: {
    position: 'absolute',
    // padding: 10,
    // width: 40,
    // height: 40,
    // top: -10,
    // left: 20,
    backgroundColor: 'black',
  },
});

export default QhotoLevel;
