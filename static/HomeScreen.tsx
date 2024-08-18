import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../tipisation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../core/store';
import { createChat, setCurrentChat } from '../core/chatSlice';
export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const chats = useSelector((state: RootState) => state.chat.chats);

  const handleCreateChat = () => {
    dispatch(createChat('New Chat'));
  };

  return (
    <View>
    <Button title="Create Chat" onPress={handleCreateChat} />
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
            dispatch(setCurrentChat(item.id));
            //navigation.navigate('Chat', { chatId: item.id });
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);
};
