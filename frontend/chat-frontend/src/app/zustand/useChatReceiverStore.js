import create from "zustand";

export const useChatReceiverStore = create((set) => ({
    receiver: null,
    setReceiver: (receiver) => set({receiver: receiver})
}));