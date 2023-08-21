import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import io from 'socket.io-client';

const Chat = () => {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const socket = io('http://192.168.102.158:3000/'); // Replace with your server IP
        socket.emit('new_visitor', 'User123'); // Emit 'new_visitor' event
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
        return () => {
          socket.disconnect();
        };
      }, []);

    // ... Your chat logic here ...

    return (
        <View>
            <Text>Chat Messages:</Text>
            {/* <View>
      {receivedMessages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
    </View> */}
            <TextInput
                //   value={message}
                //   onChangeText={(text) => setMessage(text)}
                placeholder="Type your message"
            />
            <Button title="Send" />
        </View>
    );
};

export default Chat;
