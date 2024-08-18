import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../core/store';
import { addMessage } from '../core/chatSlice';
import WebSocket from 'ws';

export const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state: RootState) => state.chat.currentChatId);
  const chat = useSelector((state: RootState) => state.chat.chats.find(c => c.id === currentChatId));
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://your-websocket-server.com');
    ws.onmessage = (event) => {
      const newMessage = event.data;
      dispatch(addMessage({ chatId: currentChatId!, message: newMessage }));
    };
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [currentChatId]);

  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      dispatch(addMessage({ chatId: currentChatId!, message }));
      setMessage('');
    }
  };

  return (
    <View>
      <FlatList
        data={chat?.messages || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};
