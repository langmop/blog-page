"use client";
import useAuthDetails from "@/hooks/useAuthDetails";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Signup } from "../forms/signup";
import { DialogHeader } from "../ui/dialog";

function Auth({
  buttonName,
  title,
  description,
  children,
  open,
  setOpen,
}: {
  buttonName: string;
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const auth = useAuthDetails();
  if (auth.isAuthenticated) {
    return <Button variant="outline">Logout</Button>;
  }
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen((prev) => !prev)} variant="outline">
          {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Auth;
