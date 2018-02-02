import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';
import * as Analytics from 'appcenter-analytics';
import { NativeRouter, Route } from 'react-router-native';

class Circle extends Component<{}, {}> {
  render() {
    return (
      <View style={circleStyles.circle}>
        {this.props.children}
      </View>
    )
  }
}

const circleStyles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 15,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
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
        <Circle>
          <Text style={styles.time}>{this.state.time}</Text>
          <Button title="Start timer" onPress={this.startTimer} />
        </Circle>
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
