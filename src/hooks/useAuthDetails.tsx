"use client";
import React from "react";

type AuthenticatedUser = {
  isAuthenticated: true;
  name: string;
  email: string;
};

type UnauthenticatedUser = {
  isAuthenticated: false;
};

type AuthState = AuthenticatedUser | UnauthenticatedUser;

function useAuthDetails(): AuthState {
  return {
    isAuthenticated: false,
  };
}

export default useAuthDetails;
