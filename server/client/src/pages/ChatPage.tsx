import InputQuery from "@/components/input-query";
import ChatComponent from "@/components/ChatComponent";
import { Button } from "@/components/ui/button";
import { BotMessageSquareIcon } from "lucide-react";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const { setChatMessages } = useChat();

  const handleNewChatClick = () => {
    setChatMessages([]);
  };

  return (
    <main>
      <nav className="fixed top-0 inset-x-0 z-50 bg-neutral-800 min-h-16">
        <div className="flex justify-between p-3 items-center">
          <div className="flex text-white">
            <BotMessageSquareIcon className="text-white w-6 h-6 mr-1" />
            <p>Chatbot</p>
          </div>
          <Button
            className="bg-neutral-200 text-neutral-800 rounded-sm hover:bg-neutral-300 shadow-sm"
            onClick={handleNewChatClick}
          >
            New Chat
          </Button>
        </div>
      </nav>
      <div>
        <ChatComponent />
      </div>
      <div className="fixed bottom-0 w-full p-3 bg-white">
        <InputQuery />
      </div>
    </main>
  );
}
