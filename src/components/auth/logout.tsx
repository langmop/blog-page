"use client"
import { AuthContext } from "@/contexts/auth/provider";
import logout from "@/lib/actions/auth/logout-action";
import { useCallback, useContext, useTransition } from "react";
import { Button } from "../ui/button";

function Logout() {
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

export default Logout;
