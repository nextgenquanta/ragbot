import { useState, useContext, useMemo, createContext } from "react";

interface LinkType {
  text: string;
  url: string;
}

interface ChatMessage {
  text: string;
  links: LinkType[];
  isUser: boolean;
}

// context type for chatMessages
interface ChatContextType {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatMessageProvider({ children }: React.PropsWithChildren) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const memoizedChatMessages = useMemo(
    () => chatMessages,
    [chatMessages],
  ) as ChatMessage[];
  return (
    <ChatContext.Provider
      value={{ chatMessages: memoizedChatMessages, setChatMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}
// custom hook to use the chat context
// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be within a ChatMessageaProvider");
  }
  return context;
}
