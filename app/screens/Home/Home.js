import React from 'react';
import { Text, View, Button } from 'react-native';
import analytics from '@react-native-firebase/analytics';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>
        Try editing me!!! 🎉
      </Text>

      <Button
        title="Add To Basket"
        style={{backgroundColor: 'red'}}
        onPress={() =>
          analytics().logEvent('basket', {'test': 'me'})
        }
      />

    </View>
  );
}

export default Home;
