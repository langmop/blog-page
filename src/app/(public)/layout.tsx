
import Navigation from "@/components/navigation";
import React from "react";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default PublicLayout;
