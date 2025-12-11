"use client";

import React from "react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputHeader,
} from "@/components/ai-elements/prompt-input";

const PromptInputComponent = () => {
  const [text, setText] = React.useState<string>("");
  const [model, setModel] = React.useState<string>("gpt-4o");
  const [status, setStatus] = React.useState<
    "loading" | "error" | "success" | null
  >(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (message: PromptInputMessage) => {};

  return (
    <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
      <PromptInputHeader>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea
          onChange={(e) => setText(e.target.value)}
          ref={textareaRef}
          value={text}
          placeholder="Create a Google Form for ..."
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
  );
};

const CreateForm = () => {
  return (
    <div className=" relative bg-background flex flex-col">
      {/* Header - fixed at top */}
      <div className="relative z-10 px-6 md:px-8 py-6 border-b border-border/40 w-full shrink-0">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span className="text-border">/</span>
            <span className="text-primary font-medium">Create New Form</span>
          </div>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Create New Form
              </h1>
              <p className="text-sm text-muted-foreground">
                Describe your form and let AI create it for you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - vertically centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-6 md:px-8">
        <div className="w-full max-w-3xl">
          <div className="space-y-6">
            {/* Info cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card/50 border border-border/60 rounded-xl hover:bg-card/70 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/70" />
                  <span className="text-sm text-muted-foreground">
                    Quick Start
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  Try: "Customer feedback survey"
                </p>
              </div>
              <div className="p-4 bg-card/50 border border-border/60 rounded-xl hover:bg-card/70 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/70" />
                  <span className="text-sm text-muted-foreground">
                    Be Specific
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  Add field types and validation rules
                </p>
              </div>
              <div className="p-4 bg-card/50 border border-border/60 rounded-xl hover:bg-card/70 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/70" />
                  <span className="text-sm text-muted-foreground">
                    Get Results
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  Edit and publish instantly
                </p>
              </div>
            </div>

            {/* Prompt input card */}
            <div className="relative group mt-8">
              {/* Background glow */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary/40 via-primary/20 to-primary/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-40 group-hover:opacity-60" />

              {/* Card */}
              <div className="relative bg-card border border-primary/15 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:border-primary/30">
                {/* Gradient line on top */}
                <div className="h-1 bg-linear-to-r from-primary/60 via-primary/40 to-primary/20" />

                <div className="p-6 md:p-8">
                  {/* Label */}
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Enter your form description
                    </label>
                  </div>

                  {/* Input component */}
                  <PromptInputComponent />
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-4">
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <span>Your forms are automatically saved to your dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
