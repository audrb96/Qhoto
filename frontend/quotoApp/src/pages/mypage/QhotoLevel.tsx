import React, {useEffect, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Pentagon} from '@digieggs/rn-polygon-chart';

function QhotoLevel() {
  return (
    <View>
      <View>
        <View>
          <Pentagon
            poles={[
              {
                score: 0.8,
                innerStroke: {opacity: 1, stroke: '#30d158', strokeWidth: 2},
                stroke: {opacity: 1, stroke: '#0a84ff'},
              },
              {
                score: 0.6,
                innerStroke: {opacity: 1, stroke: '#30d158', strokeWidth: 2},
                stroke: {opacity: 1, stroke: '#0a84ff'},
              },
              {
                score: 0.9,
                innerStroke: {opacity: 1, stroke: '#30d158', strokeWidth: 2},
                stroke: {opacity: 1, stroke: '#0a84ff'},
              },
              {
                score: 0.8,
                innerStroke: {opacity: 1, stroke: '#30d158', strokeWidth: 2},
                stroke: {opacity: 1, stroke: '#0a84ff'},
              },
              {
                score: 0.8,
                innerStroke: {opacity: 1, stroke: '#30d158', strokeWidth: 2},
                stroke: {opacity: 1, stroke: '#0a84ff'},
              },
            ]}
            innerColor="#30d158"
            innerOpacity={0.2}
            // outerStroke={{stroke: 'green', opacity: 1, strokeWidth: 1}}
            animation={{delay: 0, duration: 500}}
            style={styles.pentagon}
          />
        </View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({pentagon: {width: 300, height: 600}});

export default QhotoLevel;
