import { create } from 'zustand';

interface ConversationState {
    selectedConversation: ConversationType | null;
    messages: MessageType[];
    conversations: ConversationType[] | null;
    setSelectedConversation: (conversation: ConversationType | null) => void;
    setMessages: (messages: MessageType[]) => void;
    setConversations: (conversations: ConversationType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({selectedConversation: conversation}),
    messages: [],
    setMessages: (messages) => set({messages: messages}),
    conversations: [],
    setConversations: (conversations) => set({conversations: conversations})
}));

export default useConversation;