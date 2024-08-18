import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  chats: Chat[];
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action: PayloadAction<string>) => {
      const newChat = { id: Date.now().toString(), name: action.payload, messages: [] };
      state.chats.push(newChat);
    },
    // другие редьюсеры
  },
});

export const { createChat } = chatSlice.actions;
export default chatSlice.reducer;
