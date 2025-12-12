"use client";
import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";

const CreateForm = () => {
  const [view, setView] = useState<"structure" | "chat">("structure");

  return (
    <div className="flex-1 text-foreground flex flex-col bg-background pt-18">
      <TopBar view={view} setView={setView} />
      <div className="flex-1 overflow-hidden">
        {/* Main content area */}
        {view === "structure" ? (
          <div className="w-full h-full p-6">Structure View</div>
        ) : (
          <div className="w-full h-full p-6">Chat View</div>
        )}
      </div>
    </div>
  );
};

const TopBar = ({
  view,
  setView,
}: {
  view: "structure" | "chat";
  setView: (view: "structure" | "chat") => void;
}) => {
  const [formName, setFormName] = useState("Untitled Form");
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <div className="w-full border-b border-border/40 bg-card/20 backdrop-blur-sm">
      {/* Top section */}
      <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left - Sidebar trigger & Form name */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors shrink-0" />

          {/* Form Name - Editable */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {isEditingName ? (
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
                className="px-2 py-1 bg-input border border-primary/30 rounded-md text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 flex-1 max-w-xs"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="px-2 py-1 text-sm font-semibold text-foreground hover:bg-card/50 rounded-md transition-colors truncate flex-1 text-left"
                title="Click to edit form name"
              >
                {formName}
              </button>
            )}
            <span className="text-xs text-muted-foreground/60 hidden sm:inline whitespace-nowrap">
              • Last edited 2 min ago
            </span>
          </div>
        </div>

        {/* Right - View switcher & Actions */}
        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-card/50 border border-border/60 rounded-lg">
            <button
              onClick={() => setView("structure")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                view === "structure"
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 4H5a2 2 0 00-2 2v14a2 2 0 002 2h4m0-18v18m0-18l10 0a2 2 0 012 2v14a2 2 0 01-2 2h-10"
                />
              </svg>
              <span className="hidden sm:inline">Structure</span>
            </button>
            <button
              onClick={() => setView("chat")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                view === "chat"
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="hidden sm:inline">Chat</span>
            </button>
          </div>

          {/* More actions */}
          <div className="relative group">
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-all duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border/60 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
              <button className="w-full px-4 py-2 text-sm text-foreground hover:bg-card/50 text-left transition-colors">
                Duplicate
              </button>
              <button className="w-full px-4 py-2 text-sm text-foreground hover:bg-card/50 text-left transition-colors">
                Share
              </button>
              <button className="w-full px-4 py-2 text-sm text-foreground hover:bg-card/50 text-left transition-colors">
                Publish
              </button>
              <div className="border-t border-border/40 my-2" />
              <button className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 text-left transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider gradient */}
      <div className="h-px bg-linear-to-r from-transparent via-primary/5 to-transparent" />
    </div>
  );
};

export default CreateForm;
