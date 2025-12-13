"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import ChatColumn from "./ChatColumn";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [view, setView] = useState<"structure" | "chat">("chat");

  return (
    <div className="flex-1 flex flex-col">
      <TopBar view={view} setView={setView} />

      {/* Mobile View */}
      <div className="block md:hidden flex-1 overflow-hidden pt-14">
        {view === "chat" ? <ChatColumn /> : <FormPreview />}
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 pt-14 overflow-hidden gap-0">
        {/* Chat Column - Left */}
        <div className="w-1/4 h-full overflow-hidden flex">
          <ChatColumn />
        </div>

        {/* Form Preview - Right */}
        <div className="flex-1 h-full overflow-hidden flex">
          <FormPreview />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
