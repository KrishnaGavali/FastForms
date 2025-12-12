"use client";

import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
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
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import { Copy, RefreshCw } from "lucide-react";
import { DefaultChatTransport } from "ai";

const ChatColumn = () => {
  return (
    <div className="w-full md:w-1/4 h-full p-3 flex flex-col gap-3">
      <ConversationBox />
      <PromptInputBox />
    </div>
  );
};

const ConversationBox = () => {
  const { messages, status, reload } = useChat();

  if (messages.length === 0) {
    return (
      <Conversation>
        <ConversationContent>
          <ConversationEmptyState
            title="Start a conversation"
            description="Ask me to create, edit, or modify your form"
          />
        </ConversationContent>
      </Conversation>
    );
  }

  return (
    <Conversation>
      <ConversationContent>
        {messages.map((message, messageIndex) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">
                {message.content}
              </div>
              {message.role === "assistant" &&
                messageIndex === messages.length - 1 && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => reload()}
                      className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1"
                      title="Retry"
                    >
                      <RefreshCw className="size-3" />
                      Retry
                    </button>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(message.content)
                      }
                      className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1"
                      title="Copy"
                    >
                      <Copy className="size-3" />
                      Copy
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
        {status === "submitting" && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};

const PromptInputBox = () => {
  const { sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
    // Handle message submission logic here

    const hastext = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!hastext && !hasAttachments) {
      return;
    }

    sendMessage({
      text: message.text,
      files: message.files,
    });
  };

  const [input, setInput] = useState("");

  return (
    <PromptInput
      onSubmit={handleSubmit}
      className="mt-auto shadow-[0px_0px_10px_5px] shadow-primary/20 border border-primary/30 overflow-hidden rounded-md"
      globalDrop
      multiple
    >
      <PromptInputHeader className="bg-background/50">
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody className="bg-background">
        <PromptInputTextarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Describe the form you want to create..."
          className="bg-background focus:border-primary/30 text-base"
        />
      </PromptInputBody>
      <PromptInputFooter className="bg-background">
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  );
};

export default ChatColumn;
