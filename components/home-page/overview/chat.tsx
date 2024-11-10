"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { ChatBox, AblyTokenFetcher } from "./chat-box";

const Chat = () => {
  const client = new Ably.Realtime({ authUrl: "/api/ably-auth" });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="chat-demo">
        <ChatBox />
        {/* <AblyTokenFetcher /> */}
      </ChannelProvider>
    </AblyProvider>
  );
};

export default Chat;
