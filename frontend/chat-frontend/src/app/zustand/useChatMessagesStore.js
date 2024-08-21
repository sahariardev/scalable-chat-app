import create from "zustand";

export const useChatMessagesStore = create((set) => ({
    chatMsgs: [],
    updateChatMsgs: (chatMsgs) => set({chatMsgs: chatMsgs})
}));