import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon } from "lucide-react";

const CHARACTER_LIMIT: number = 60;

type Message = {
  text: string;
  isUser: boolean;
};

export default function HomePage(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isTextarea: boolean = inputValue.length > CHARACTER_LIMIT;

  useEffect(() => {
    if (isTextarea) {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        inputValue.length,
        inputValue.length,
      );
    } else {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(inputValue.length, inputValue.length);
    }
  }, [isTextarea, inputValue]);

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setInputValue(e.target.value);
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement): void => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleInputSubmit = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    // Add user message to chat
    setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);

    try {
      const response = await fetch(
        "https://ragdeploycheck.onrender.com/api/v1/ragbot/response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: inputValue,
          }),
        },
      );
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.response, isUser: false },
      ]);

      setInputValue("");
    } catch (err) {
      console.log(err);
      // Optionally, add an error message to the chat
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error processing your request.",
          isUser: false,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen  mx-auto  bg-slate-100 text-neutral-400">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.text}
            className={`flex ${message.isUser ? "justify-end w-[80vw] mx-auto " : "w-[80vw] mx-auto justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${message.isUser ? " bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3">
        <div className="relative">
          {isTextarea ? (
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                handleInputChange(e);
                adjustTextareaHeight(e.target);
              }}
              className="bg-neutral-600 text-neutral-300 rounded-xl w-full pr-12 pl-4 py-2 min-h-[40px] max-h-[160px] resize-none"
              style={{ overflow: "hidden" }}
            />
          ) : (
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              className="bg-neutral-600 rounded-full text-neutral-300 w-full pr-12 pl-4 h-10"
            />
          )}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <SendHorizontalIcon
              className="text-gray-400 hover:text-white duration-75 cursor-pointer"
              onClick={handleInputSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
