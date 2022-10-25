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
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={questTypes}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => <QuestCard questType={questTypes[index]} />}
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'purple',
  },
});

export default Settings;
