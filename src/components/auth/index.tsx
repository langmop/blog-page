"use client";
import useAuthDetails from "@/hooks/useAuthDetails";
import React, { ReactNode } from "react";
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
}: {
  buttonName: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const auth = useAuthDetails();
  if (auth.isAuthenticated) {
    return <Button variant="outline">Logout</Button>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
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
