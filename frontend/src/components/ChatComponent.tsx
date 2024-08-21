import { useChat } from "@/hooks/useChat";
import { BotMessageSquareIcon, UserRoundIcon } from "lucide-react";
import TextToDisplay from "./TextToDisplay";

export default function ChatComponent() {
  const { chatMessages } = useChat();
  return (
    <div className="p-5">
      {chatMessages.length >= 1 ? (
        <div className="space-y-3 py-20">
          {chatMessages.map((message) => {
            return (
              <div key={message.text}>
                {message.isUser ? (
                  <div className="flex justify-end pb-2">
                    <div className="flex max-w-sm">
                      <p className="p-2 text-sm bg-neutral-200 rounded-md px-3">
                        {message.text}
                      </p>
                      <div>
                        <p className="p-2 bg-neutral-800 rounded-full h-auto ml-1">
                          <UserRoundIcon className="text-white w-4 h-4" />
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start max-w-10/12">
                    <div className="flex max-w-3xl">
                      <div>
                        <p className="p-2 bg-neutral-800 rounded-full h-auto mr-1">
                          <BotMessageSquareIcon className="text-white w-4 h-4" />
                        </p>
                      </div>
                      <div className="p-2 space-y-2 text-sm bg-neutral-200 rounded-md px-3">
                        <TextToDisplay content={message.text} />
                        <div>
                          {message.links.length > 0 ? (
                            <div className="flex gap-2">
                              {message.links.map((link) => {
                                return (
                                  <p
                                    key={link.text}
                                    className=" px-1 py-0.5 text-xs text-neutral-200 hover:cursor-pointer rounded-full bg-neutral-800 w-auto"
                                  >
                                    {link.text}
                                  </p>
                                );
                              })}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="min-h-[90dvh] flex flex-col justify-center items-center font-sedan text-xl font-semibold text-neutral-700">
          <BotMessageSquareIcon className="w-12 h-12 sm:16 sm:h-16 text-neutral-700" />
          <p>Your college assistant awaits!</p>
        </div>
      )}
    </div>
  );
}
