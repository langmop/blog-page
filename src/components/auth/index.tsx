"use client";
import useAuthDetails from "@/hooks/useAuthDetails";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Signup } from "../forms/signup";
import { DialogHeader } from "../ui/dialog";

function Auth() {
  const auth = useAuthDetails();
  if (auth.isAuthenticated) {
    return <Button variant="outline">Logout</Button>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signup</DialogTitle>
          <DialogDescription>
            Fill your details here to signup.
          </DialogDescription>
        </DialogHeader>
        <Signup />
      </DialogContent>
    </Dialog>
  );
}

export default Auth;
