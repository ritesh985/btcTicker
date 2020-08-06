import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const SOCKET_URL = 'wss://ws-feed.gdax.com';

const CurrentValue = () => {
  const [currentValue, setCurrentValue] = useState(0);

  const connectSocket = () => {
    const ws = new WebSocket(SOCKET_URL);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'subscribe',
          channels: [{name: 'ticker', product_ids: ['BTC-USD']}],
        }),
      );
    };

    ws.onmessage = (msg) => {
      const {type, price} = JSON.parse(msg.data);
      if (type === 'ticker' && price) {
        setCurrentValue(Number(price));
      }
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}>
      <Text>Coinbase</Text>
      <View style={{marginTop: 2}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          BTC: ${currentValue.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CurrentValue;
