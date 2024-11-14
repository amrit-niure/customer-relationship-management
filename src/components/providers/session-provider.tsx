"use client";import { User } from "@/db/schema";
import { createContext, useContext } from "react";

const SessionContext = createContext<User>(
  {} as User
);

export const SessionProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: User;
}) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return sessionContext;
};
