"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UNAUTH_NAVIGATIONS } from "./constants";
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
import Auth from "../auth";

function Navigation() {
  const pathname = usePathname();

  const isActive = useCallback(
    (currentHref: string) => {
      return currentHref === pathname;
    },
    [pathname]
  );

  return (
    <div className="flex w-full mt-4">
      <div className="flex-1">
        <NavigationMenu className="m-auto">
          <NavigationMenuList className="flex-wrap flex">
            {UNAUTH_NAVIGATIONS?.map(({ href, icon, name }) => (
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
      </div>
      <div className="w-fit mr-2">
        <Auth />
      </div>
    </div>
  );
}

export default Navigation;
