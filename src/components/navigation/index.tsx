"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATIONS } from "./constants";
import { useCallback } from "react";
import classNames from "classnames";
import {
  NavigationMenu,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";

function Navigation() {
  const pathname = usePathname();

  const isActive = useCallback(
    (currentHref: string) => {
      return currentHref === pathname;
    },
    [pathname]
  );

  return (
    <NavigationMenu className="m-auto mt-4">
      <NavigationMenuList className="flex-wrap flex">
        {NAVIGATIONS?.map(({ href, icon, name }) => (
          <NavigationMenuItem key={name} className="bg-">
            <NavigationMenuLink
              asChild
              className={classNames(
                navigationMenuTriggerStyle(),
                isActive(href) && "bg-accent! text-accent-foreground"
              )}
            >
              <Link href={href}>{icon}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;
