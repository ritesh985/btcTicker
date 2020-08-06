import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
import axios from 'axios';
import moment from 'moment';

const config = {'x-ba-key': 'MDNjMGE4MzZkYWZhNGY3Yzg2OTlmZjQyOTMwYjZiYjk'};

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.apiCaller = null;
    this.state = {
      type: 'timeseries',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      chartType: '',
      dataSource: {
        chart: {
          showLegend: 0,
          theme: 'gammel',
        },
        caption: {
          text: 'Daily Bicoin Price Changes',
        },
        yAxis: [
          {
            plot: {
              value: 'Bitcoin Price',
              type: 'area',
            },
            title: 'Bitcoin Price',
          },
        ],
        data: null,
      },
      schemaJson: [
        {
          name: 'Time',
          type: 'date',
          format: '%Y-%m-%d',
        },
        {
          name: 'Bitcoin Price',
          type: 'number',
        },
      ],
      dataNew: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD', {
        headers: config,
      })
      .then((res) => {
        const {data} = res;
        const arr = [];
        data.map((item) => {
          const {average, time} = item;
          arr.push([moment(time).format('YYYY-MM-DD'), average]);
        });
        this.setState({
          dataNew: arr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          {this.state.dataNew === null ? (
            <Text style={{alignSelf: 'center', marginTop: 30}}>Loading...</Text>
          ) : (
            <FusionCharts
              dataJson={this.state.dataNew}
              schemaJson={this.state.schemaJson}
              type={this.state.type}
              width={this.state.width}
              height={this.state.height}
              dataFormat={this.state.dataFormat}
              dataSource={this.state.dataSource}
              libraryPath={{uri: 'file:///android_asset/fusioncharts.html'}} // set the libraryPath property
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
  },
  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1,
  },
});
