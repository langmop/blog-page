"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATIONS } from "./constants";
import React from "react";
import classNames from "classnames";

function Navigation() {
  const pathname = usePathname();
  console.log(pathname, "dddddd");

  return (
    <div className="flex gap-3">
      {NAVIGATIONS?.map(({ activeColor, href, icon, name }) => (
        <Link
          className={classNames({
            [activeColor]: href === pathname,
          })}
          key={name}
          href={href}
        >
          {icon}
        </Link>
      ))}
    </div>
  );
}

export default Navigation;
