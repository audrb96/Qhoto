import React from 'react';
import {Text, View} from 'react-native';

function Orders() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'purple'}}>quoto</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text>DAY</Text>
        <Text>WEEK</Text>
        <Text>MONTH</Text>
      </View>
    </View>
  );
}

export default Orders;
