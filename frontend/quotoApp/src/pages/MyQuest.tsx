import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import QuestCard from '../components/main/QuestCard';

const questTypes = ['DAILY', 'WEEKLY', 'MONTHLY'];

function Settings() {
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.body}>
      <View style={styles.questCardContainer}>
        <Carousel
          loop
          width={width}
          height={width}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 150,
          }}
          data={questTypes}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <QuestCard questType={questTypes[index]} windowSize={width} />
          )}
        />
      </View>
      <View style={styles.questButtonContainer}>
        <Pressable style={styles.questButton}></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  questCardContainer: {
    flex: 3.5,
  },
  questButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4B179F',
  },
});

export default Settings;
