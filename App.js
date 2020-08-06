import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Graph from './components/Graph';
import CurrentValue from './components/CurrentValue';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>BTCUSD Crypto Chart</Text>
        <CurrentValue />
      </View>
      <Graph />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },
});
