"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import ChatColumn from "./ChatColumn";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [view, setView] = useState<"structure" | "chat">("chat");

  return (
    <div className=" flex-1">
      <TopBar view={view} setView={setView} />

      <div className="block md:hidden h-full pt-14">
        {view === "chat" ? <ChatColumn /> : <FormPreview />}
      </div>

      <div className=" flex-1 h-full hidden md:flex pt-14">
        <ChatColumn />
        <FormPreview />
      </div>
    </div>
  );
};

export default FormBuilder;
