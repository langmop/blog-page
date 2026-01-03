import Navigation from "@/components/admin-navigation";
import { ReactNode } from "react";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}

export default AdminLayout;
