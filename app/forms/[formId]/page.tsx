import FormBuilder from "@/components/dashboard/FormBuilder";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <div className=" pt-18 w-full flex ">
      <FormBuilder />
    </div>
  );
};

export default page;
