import Navigation from "@/components/admin-navigation";
import AuthProvider from "@/contexts/auth/provider";
import verifyUserSession from "@/lib/actions/auth/verify-session-action";
import { ReactNode } from "react";

async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await verifyUserSession();
  console.log(user)
  return (
    <AuthProvider initialUser={user}>
      <Navigation />
      {children}
    </AuthProvider>
  );
}

export default AdminLayout;
