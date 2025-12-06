"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormIcon, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type AuthState = "loading" | "success" | "error";

const page = () => {
  const [state, setState] = useState<AuthState>("loading");

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            <h1 className="text-2xl font-bold">Authenticating</h1>
            <CardDescription>
              Please wait while we redirect you to the authentication provider.
            </CardDescription>
            <CardAction>
              <div className="loader mt-4 flex justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            </CardAction>
          </>
        );
      case "success":
        return (
          <>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Successful
            </h1>
            <CardDescription>
              Your account has been authenticated. Redirecting you now...
            </CardDescription>
            <CardAction>
              <div className="mt-4 flex justify-center">
                <p className="text-sm text-green-600 font-medium">
                  ✓ Login successful
                </p>
              </div>
            </CardAction>
          </>
        );
      case "error":
        return (
          <>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Failed
            </h1>
            <CardDescription>
              Something went wrong during authentication. Please try again.
            </CardDescription>
            <CardAction>
              <div className="mt-4 flex justify-center">
                <p className="text-sm text-red-600 font-medium">
                  ✗ Error occurred
                </p>
              </div>
            </CardAction>
          </>
        );
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-3">
      <div
        className="w-full max-w-md flex items-center justify-center gap-2 pl-2 mb-2"
        id="branding"
      >
        <FormIcon className=" text-primary bg-primary/20 p-1 size-8 rounded-sm border border-primary/50" />
        <p className=" text-xl font-bold">FastForms</p>
      </div>
      <Card className="w-full max-w-md px-5 ">
        <CardHeader className="space-y-4">{renderContent()}</CardHeader>
      </Card>

      {/* Test Buttons */}
      <div className="w-full max-w-md mt-6 flex gap-2 flex-wrap justify-center">
        <Button
          variant={state === "loading" ? "default" : "outline"}
          onClick={() => setState("loading")}
          size="sm"
        >
          Loading
        </Button>
        <Button
          variant={state === "success" ? "default" : "outline"}
          onClick={() => setState("success")}
          size="sm"
        >
          Success
        </Button>
        <Button
          variant={state === "error" ? "default" : "outline"}
          onClick={() => setState("error")}
          size="sm"
        >
          Error
        </Button>
      </div>
    </div>
  );
};

export default page;

// <Card>
//   <CardHeader>
//     <CardTitle>Card Title</CardTitle>
//     <CardDescription>Card Description</CardDescription>
//     <CardAction>Card Action</CardAction>
//   </CardHeader>
//   <CardContent>
//     <p>Card Content</p>
//   </CardContent>
//   <CardFooter>
//     <p>Card Footer</p>
//   </CardFooter>
// </Card>
