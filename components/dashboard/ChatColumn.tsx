"use client";

import React, { useState } from "react";
import type { UIMessage } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "../ai-elements/conversation";

import { useChat } from "@ai-sdk/react";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "../ai-elements/message";

import { MessageSquare } from "lucide-react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../ai-elements/prompt-input";

import type { ChatStatus } from "ai";

const ChatColumn = () => {
  const { setMessages, messages, status } = useChat();

  return (
    <div className="p-2 border-r border-muted-foreground/50 flex-1 flex flex-col">
      <ConversationContainer messages={messages} />
      <PromptInputContainer setMessage={setMessages} />
    </div>
  );
};

export default ChatColumn;

const PromptInputContainer = ({
  setMessage,
  status,
}: {
  setMessage?: (
    message: UIMessage[] | ((prev: UIMessage[]) => UIMessage[])
  ) => void;
  status?: ChatStatus;
}) => {
  const handleSubmit = (message: PromptInputMessage) => {
    if (!message || !setMessage) return;

    console.log("Submitting message:", message, typeof message);

    setMessage((prevMessages: UIMessage[]) => [
      ...prevMessages,
      {
        id: String(Date.now()),
        role: "user",
        parts: [{ type: "text", text: message.text, files: message.files }],
      },
    ]);
  };

  const [text, setText] = useState("");

  return (
    <div className=" w-full h-1/6">
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputHeader>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
        </PromptInputHeader>
        <PromptInputBody>
          <PromptInputTextarea
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </PromptInputBody>

        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit disabled={!text && !status} status={status} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
};

const ConversationContainer = ({ messages }: { messages: UIMessage[] }) => {
  console.log("Messages in ChatColumn:", messages.length);

  return (
    <div className=" w-full overflow-y-auto flex-1">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-12" />}
              title="Start a conversation"
              description="Type a message below to begin chatting"
            />
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text": // we don't use any reasoning or tool calls in this example
                        return (
                          <MessageResponse key={`${message.id}-${i}`}>
                            {part.text}
                          </MessageResponse>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
};
