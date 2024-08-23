    import {create} from "zustand";

    export const useChatMessagesStore = create((set) => ({
        chatMsgs: [],
        updateChatMsgsList: (messages) => set({chatMsgs:messages}),
        updateChatMsgs: (newMsg) => set((state) => ({
            chatMsgs: [...state.chatMsgs, newMsg]
        })),
    }));