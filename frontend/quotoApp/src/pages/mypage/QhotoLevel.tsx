import React, {useEffect, useState, useCallback} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryArea,
  VictoryLabel,
  VictoryGroup,
  VictoryPolarAxis,
} from 'victory-native';
import ReactDOM from 'react-dom';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {getQuestPoints, getFriendQuestPoints} from '../../api/quest';
import QhotoHeader from '../../components/QhotoHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RootState} from '../../store/reducer';
import {useSelector} from 'react-redux';
import {Hexagon} from '@digieggs/rn-polygon-chart';
import {StackedBarChart} from 'react-native-chart-kit';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import LevelBox from '../../components/mypage/LevelBox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

function QhotoLevel({navigation, route}) {
  const goToLevelInfo = () => {
    navigation.navigate('LevelInfo');
  };

  const userInfo = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState(value);
  const [chart, setChart] = useState(0);
  const d = [
    {type: '색깔', count: 0, fill: '#592CB8'},
    {type: '일상', count: 0, fill: '#ECB21D'},
    {type: '환경', count: 0, fill: '#70A348'},
    {type: '건강', count: 0, fill: '#C25445'},
    {type: '이색', count: 0, fill: '#2271CE'},
  ];
  const w = [
    {type: '색깔', count: 0, fill: '#592CB8'},
    {type: '일상', count: 0, fill: '#ECB21D'},
    {type: '환경', count: 0, fill: '#70A348'},
    {type: '건강', count: 0, fill: '#C25445'},
    {type: '이색', count: 0, fill: '#2271CE'},
  ];

  const m = [
    {type: '색깔', count: 0, fill: '#592CB8'},
    {type: '일상', count: 0, fill: '#ECB21D'},
    {type: '환경', count: 0, fill: '#70A348'},
    {type: '건강', count: 0, fill: '#C25445'},
    {type: '이색', count: 0, fill: '#2271CE'},
  ];
  const characterData = [
    {색깔: 0, 일상: 0, 환경: 0, 건강: 0, 이색: 0},
    {색깔: 0, 일상: 0, 환경: 0, 건강: 0, 이색: 0},
  ];

  const [data, setData] = useState([d, w, m]);
  const [pentagon, setPentagon] = useState(characterData);
  const [maxValue, setMaxValue] = useState(10);
  const [friendInfo, setFriendInfo] = useState({
    description: '코토짱',
    email: 'ssafy@ssafy.com',
    expGrade: 'red',
    image:
      'https://k.kakaocdn.net/dn/bCECfe/btrN5FBhmze/i3O26Z97Op0RkwkNSCChw0/img_640x640.jpg',
    nickname: 'zerojun',
    profileOpen: true,
    totalExp: 0,
  });
  useEffect(() => {
    if (route.params?.friendId != null) {
      setFriendInfo(route.params.otherInfo);

      getFriendQuestPoints(
        route.params.friendId,
        (res: any) => {
          let d = [
            {type: '색깔', count: res.data.exp.C.dailyCnt, fill: '#592CB8'},
            {type: '일상', count: res.data.exp.D.dailyCnt, fill: '#ECB21D'},
            {type: '환경', count: res.data.exp.E.dailyCnt, fill: '#70A348'},
            {type: '건강', count: res.data.exp.H.dailyCnt, fill: '#C25445'},
            {type: '이색', count: res.data.exp.S.dailyCnt, fill: '#2271CE'},
          ];
          let w = [
            {type: '색깔', count: res.data.exp.C.weeklyCnt, fill: '#592CB8'},
            {type: '일상', count: res.data.exp.D.weeklyCnt, fill: '#ECB21D'},
            {type: '환경', count: res.data.exp.E.weeklyCnt, fill: '#70A348'},
            {type: '건강', count: res.data.exp.H.weeklyCnt, fill: '#C25445'},
            {type: '이색', count: res.data.exp.S.weeklyCnt, fill: '#2271CE'},
          ];
          let m = [
            {type: '색깔', count: res.data.exp.C.monthlyCnt, fill: '#592CB8'},
            {type: '일상', count: res.data.exp.D.monthlyCnt, fill: '#ECB21D'},
            {type: '환경', count: res.data.exp.E.monthlyCnt, fill: '#70A348'},
            {type: '건강', count: res.data.exp.H.monthlyCnt, fill: '#C25445'},
            {type: '이색', count: res.data.exp.S.monthlyCnt, fill: '#2271CE'},
          ];
          let allData = [];
          allData.push(d);
          allData.push(w);
          allData.push(m);
          setData(allData);

          let findMax = [
            res.data.exp.C.totalCnt,
            res.data.exp.D.totalCnt,
            res.data.exp.E.totalCnt,
            res.data.exp.H.totalCnt,
            res.data.exp.S.totalCnt,
          ];
          let max = 0;
          findMax.forEach(expCnt => {
            if (expCnt > max) {
              max = expCnt;
            }
          });
          setMaxValue(max);
          let pentagonData = [
            {
              색깔: max,
              일상: max,
              환경: max,
              건강: max,
              이색: max,
            },
            {
              색깔: res.data.exp.C.totalCnt,
              일상: res.data.exp.D.totalCnt,
              환경: res.data.exp.E.totalCnt,
              건강: res.data.exp.H.totalCnt,
              이색: res.data.exp.S.totalCnt,
            },
          ];
          setPentagon(pentagonData);
        },
        (err: any) => {
          console.log(err.response);
        },
      );
    } else {
      getQuestPoints(
        (res: any) => {
          let d = [
            {type: '색깔', count: res.data.exp.C.dailyCnt, fill: '#592CB8'},
            {type: '일상', count: res.data.exp.D.dailyCnt, fill: '#ECB21D'},
            {type: '환경', count: res.data.exp.E.dailyCnt, fill: '#70A348'},
            {type: '건강', count: res.data.exp.H.dailyCnt, fill: '#C25445'},
            {type: '이색', count: res.data.exp.S.dailyCnt, fill: '#2271CE'},
          ];
          let w = [
            {type: '색깔', count: res.data.exp.C.weeklyCnt, fill: '#592CB8'},
            {type: '일상', count: res.data.exp.D.weeklyCnt, fill: '#ECB21D'},
            {type: '환경', count: res.data.exp.E.weeklyCnt, fill: '#70A348'},
            {type: '건강', count: res.data.exp.H.weeklyCnt, fill: '#C25445'},
            {type: '이색', count: res.data.exp.S.weeklyCnt, fill: '#2271CE'},
          ];
          let m = [
            {type: '색깔', count: res.data.exp.C.monthlyCnt, fill: '#592CB8'},
            {type: '일상', count: res.data.exp.D.monthlyCnt, fill: '#ECB21D'},
            {type: '환경', count: res.data.exp.E.monthlyCnt, fill: '#70A348'},
            {type: '건강', count: res.data.exp.H.monthlyCnt, fill: '#C25445'},
            {type: '이색', count: res.data.exp.S.monthlyCnt, fill: '#2271CE'},
          ];
          let allData = [];
          allData.push(d);
          allData.push(w);
          allData.push(m);
          setData(allData);

          let findMax = [
            res.data.exp.C.totalCnt,
            res.data.exp.D.totalCnt,
            res.data.exp.E.totalCnt,
            res.data.exp.H.totalCnt,
            res.data.exp.S.totalCnt,
          ];
          let max = 0;
          findMax.forEach(expCnt => {
            if (expCnt > max) {
              max = expCnt;
            }
          });
          setMaxValue(max);
          let pentagonData = [
            {
              색깔: max,
              일상: max,
              환경: max,
              건강: max,
              이색: max,
            },
            {
              색깔: res.data.exp.C.totalCnt,
              일상: res.data.exp.D.totalCnt,
              환경: res.data.exp.E.totalCnt,
              건강: res.data.exp.H.totalCnt,
              이색: res.data.exp.S.totalCnt,
            },
          ];
          setPentagon(pentagonData);
        },
        (err: any) => {
          console.log(err.response);
        },
      );
    }
  }, [maxValue]);

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

  var radio_props = [
    {label: 'day', value: 0},
    {label: 'month', value: 1},
    {label: 'weeky', value: 2},
    ,
  ];

  const processData = data => {
    const maxByGroup = {
      색깔: maxValue,
      일상: maxValue,
      환경: maxValue,
      건강: maxValue,
      이색: maxValue,
    };
    const makeDataArray = d => {
      return Object.keys(d).map(key => {
        return {x: key, y: d[key] / maxByGroup[key]};
      });
    };
    return data.map(datum => makeDataArray(datum));
  };
  const pentaData = processData(pentagon);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <View style={styles.qhotoLevel}>
          <QhotoHeader leftIcon={leftIcon} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <View>
              <View>
                <TouchableOpacity>
                  <Text
                    onPress={goToLevelInfo}
                    style={[styles.subjectText, {alignItems: 'center'}]}>
                    <Text>qhoto 레벨 &nbsp;</Text>
                    <FontAwesome5
                      name="question-circle"
                      size={20}
                      color={'gray'}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingVertical: 20,
                }}>
                <TouchableOpacity onPress={goToLevelInfo}>
                  {route.params?.friendId != null ? (
                    <LevelBox
                      userGrade={friendInfo.expGrade}
                      userPoint={friendInfo.totalExp}
                    />
                  ) : (
                    <LevelBox
                      userGrade={userInfo.expGrade}
                      userPoint={userInfo.totalExp}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View>
                <TouchableOpacity>
                  <Text style={[styles.subjectText, {marginLeft: 0}]}>
                    <Text>qhoto 애널리틱스 &#x1F4CA;</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingVertical: 20,
                }}>
                <View style={[styles.pentagonBox]}>
                  <Text
                    style={[
                      styles.subjectText,
                      {flex: 1, textAlign: 'left', marginTop: 10},
                    ]}>
                    나의 퀘스트 성향
                  </Text>
                  <View style={styles.pentagonInner}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20,
                      }}>
                      <VictoryChart
                        polar
                        theme={VictoryTheme.material}
                        domain={{y: [0, 1]}}>
                        <VictoryGroup
                          colorScale={['#fcf5fc', '#740aa1']}
                          style={{data: {fillOpacity: 0.2, strokeWidth: 4}}}>
                          {pentaData.map((pentaData, i) => {
                            return (
                              <VictoryArea
                                key={i}
                                data={pentaData}
                                // interpolation="cardinal"  //둥글게 혹은 뾰족하게
                              />
                            );
                          })}
                        </VictoryGroup>
                        {Object.keys(pentagon[0]).map((key, i) => {
                          return (
                            <VictoryPolarAxis
                              key={i}
                              dependentAxis
                              style={{
                                axisLabel: {padding: 10},
                                axis: {stroke: 'none'},
                                grid: {
                                  stroke: 'grey',
                                  strokeWidth: 0.3,
                                  opacity: 0.5,
                                },
                              }}
                              tickLabelComponent={
                                <VictoryLabel labelPlacement="vertical" />
                              }
                              labelPlacement="perpendicular"
                              axisValue={i + 1}
                              label={key}
                              tickFormat={t => Math.ceil(t * pentagon[0][key])}
                              tickValues={[0.5]}
                            />
                          );
                        })}
                        <VictoryPolarAxis
                          labelPlacement="parallel"
                          tickFormat={() => ''}
                          style={{
                            axis: {stroke: 'none'},
                            grid: {stroke: 'grey', opacity: 0.5},
                          }}
                        />
                      </VictoryChart>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 20,
                }}>
                <View style={[styles.graphBox]}>
                  <Text
                    style={[
                      styles.subjectText,
                      {flex: 1, textAlign: 'left', marginTop: 10},
                    ]}>
                    완료한 퀘스트 그래프
                  </Text>
                  <View style={[styles.innerBox, {alignItems: 'center'}]}>
                    <View>
                      {/* https://www.npmjs.com/package/react-native-simple-radio-button 참고 */}
                      <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={value => {
                          setValue(value);
                          setChart(value);
                        }}
                        formHorizontal={true}
                        labelHorizontal={false}
                        buttonColor={'#dfc0ed'}
                        selectedButtonColor={'#740aa1'}
                        selectedLabelColor={'#740aa1'}
                        labelColor={'#dfc0ed'}
                        buttonInnerColor={'#740aa1'}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        animation={true}
                      />
                      <VictoryChart
                        animate={{
                          onLoad: {duration: 600},
                          duration: 1000,
                          easing: 'bounce',
                        }}
                        width={270}
                        height={320}>
                        <VictoryBar
                          // horizontal
                          style={{
                            data: {fill: ({datum}) => datum.fill},
                            labels: {
                              fill: ({datum}) => datum.fill,
                              fontSize: 20,
                              fontWeight: 'bold',
                            },
                          }}
                          labelComponent={<VictoryLabel dy={-2} />}
                          labels={({datum}) =>
                            datum.count >= 1 ? datum.count : null
                          }
                          data={data[chart]}
                          x="type"
                          y="count"
                        />
                        <VictoryAxis style={{axis: {stroke: 'none'}}} />
                      </VictoryChart>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    marginHorizontal: 20,
  },
  qhotoLevel: {
    padding: 10,
  },
  pentagon: {width: 300, height: 600},
  triangle: {width: 300, height: 600},
  header: {
    transform: [{rotate: '90deg'}],
  },
  subjectText: {
    color: '#3B28B1',
    fontSize: 22,
    fontFamily: 'MICEGothic-Bold',
    marginBottom: 3,
    marginTop: 3,
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
  pentagonBox: {
    width: 310,
    height: 410,
    backgroundColor: '#f5e0ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  pentagonInner: {
    width: 280,
    height: 340,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
  },
  graphBox: {
    width: 310,
    height: 470,
    backgroundColor: '#f5e0ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  innerBox: {
    width: 280,
    height: 400,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 30,
  },
});

export default QhotoLevel;
