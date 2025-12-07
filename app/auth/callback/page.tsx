"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { FormIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type AuthState = {
  state: "loading" | "success" | "error";
  desc: string;
};

const page = () => {
  const [state, setState] = useState<AuthState>({
    state: "loading",
    desc: "",
  });
  const searchParams = useSearchParams();

  const [authState, setAuthState] = useState<AuthState>({
    state: "loading",
    desc: "Please wait while log you in ...",
  });

  const saveUser = async (code: string) => {
    try {
      const response = await fetch("/api/auth/google/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          code: `Bearer ${code}`,
        },
      });

      if (response.ok) {
        console.log("User authenticated successfully", await response.json());
      }
    } catch (error: any) {
      console.error("Error authenticating user:", error);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      const error = searchParams.get("error");
      const code = searchParams.get("code");
      console.log("Error param:", error);

      if (error && error === "access_denied") {
        setAuthState({
          state: "error",
          desc: "User have denied access. Please try again.",
        });
      }

      if (code) {
        const res = await saveUser(code);
      }
    };

    handleAuth();
  }, []);

  const renderContent = () => {
    switch (authState.state) {
      case "loading":
        return (
          <>
            <h1 className="text-2xl font-bold">Authenticating</h1>
            <CardDescription>{authState.desc}</CardDescription>
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
            <CardDescription>{authState.desc}</CardDescription>
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
            <CardDescription>{authState.desc}</CardDescription>
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
