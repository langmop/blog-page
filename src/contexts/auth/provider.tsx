"use client"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface User {
  userId: string | null;
}

export const AuthContext = createContext<{
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
}>({
  user: null,
  setUser: () => {},
});


export default function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
