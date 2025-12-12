"use client";

import React, { useState } from "react";
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
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../ai-elements/prompt-input";
const ChatColumn = () => {
  return (
    <div className=" w-full  md:w-1/2 h-full p-3">
      <PromptInputBox />
    </div>
  );
};

const PromptInputBox = () => {
  const handleSubmit = () => {};

  const [text, setText] = useState("");

  return (
    <PromptInput
      onSubmit={handleSubmit}
      className="mt-8 shadow-[0px_0px_10px_5px] shadow-primary/20 border border-primary/30 overflow-hidden rounded-md"
      globalDrop
      multiple
    >
      <PromptInputHeader className="bg-background/50 ">
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody className="bg-background">
        <PromptInputTextarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Create a Google Form For ..."
          className="bg-background focus:border-primary/30 text-base"
        />
      </PromptInputBody>
      <PromptInputFooter className="bg-background ">
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
