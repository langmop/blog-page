"use client";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth/provider";
import logout from "@/lib/actions/auth/logout-action";
import React, { useCallback, useContext, useTransition } from "react";

function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const { setUser } = useContext(AuthContext);
  const clientLogout = useCallback(async () => {
    setUser(null);
    await logout();
  }, []);

  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => startTransition(() => clientLogout())}
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
