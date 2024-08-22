import { useState, useEffect, useRef } from "react";
import { useChannel } from "ably/react";
import { Button } from "@/components/ui/button";
import { Message } from "ably";
import { Textarea } from "@/components/ui/textarea";

export const ChatBox = () => {
  const inputBox = useRef<HTMLTextAreaElement | null>(null);
  const messageEnd = useRef<HTMLDivElement | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel, ably } = useChannel("chat", (message) => {
    const history = receivedMessages.slice(-199);
    setReceivedMessages([...history, message]);
  });

  const handleFormSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter" || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span
        key={index}
        className="message flex-grow-0 rounded-xl bg-[#eef5f8] p-4"
        data-author={author}
      >
        {message.data}
      </span>
    );
  });
  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.current?.focus();
  };

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

  return (
    <div className="chat-holder grid">
      <div className="h[calc(100vh -40px -100px -100px -100px)] flex flex-col items-start gap-4 overflow-y-auto p-4">
        {messages}
        <div ref={messageEnd}></div>
      </div>
      <form
        onSubmit={handleFormSubmission}
        className="grid border-t-2 border-solid border-t-indigo-700"
      >
        <div className="grid w-full gap-2">
          <Textarea
            ref={inputBox}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here."
          />
          <Button type="submit" disabled={messageTextIsEmpty}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export const AblyTokenFetcher = () => {
  const [tokenId, setTokenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ably-auth")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTokenId(data.clientId);
      })
      .catch((error) => console.error("Error fetching Ably token:", error));
  }, []);

  return <div>Ably Token: {tokenId}</div>;
};
