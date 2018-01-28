import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';
import * as Analytics from 'appcenter-analytics';
import { NativeRouter, Route } from 'react-router-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export interface AppState {
  running: boolean;
  time: number;
}

export default class App extends Component<{}, AppState> {
  private timer: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      running: false,
      time: 0
    };
  }

  async componentDidMount() {
    await Analytics.setEnabled(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{this.state.time}</Text>
        <Button title="Start timer" onPress={this.startTimer} />
      </View>
    );
  }

  private startTimer = () => {
    if (this.timer) { clearInterval(this.timer) };
    this.setState({ running: true, time: 0 });
    this.timer = setInterval(() => this.tickTimer(100), 100);
  }

  private tickTimer = (delta: number) => {
    this.setState(state => ({
      time: state.time + delta
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    textAlign: 'center',
    marginBottom: 5
  }
});
