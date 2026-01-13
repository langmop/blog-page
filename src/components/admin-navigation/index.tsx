"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UNAUTH_NAVIGATIONS, AUTH_NAVIGATIONS } from "./constants";
import { useCallback, useContext, useState } from "react";
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
import { Signup } from "../forms/signup";
import { Signin } from "../forms/signin";
import { AuthContext } from "@/contexts/auth/provider";
import Logout from "../auth/logout";

function Navigation() {
  const pathname = usePathname();

  const isActive = useCallback(
    (currentHref: string) => {
      return currentHref === pathname;
    },
    [pathname]
  );

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const onSuccessSignUp = () => {
    setIsSignUpOpen(false);
  };
  const onSuccessSignIn = () => {
    setIsSignInOpen(false);
  };

  const { user } = useContext(AuthContext);
  return (
    <div className="flex w-full mt-4">
      <div className="flex-1">
        <NavigationMenu className="m-auto">
          <NavigationMenuList className="flex-wrap flex">
            {(!!user?.userId ? AUTH_NAVIGATIONS : UNAUTH_NAVIGATIONS)?.map(
              ({ href, icon, name }) => (
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
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {!!user?.userId ? (
        <Logout />
      ) : (
        <div className="w-fit mr-2">
          <Auth
            buttonName="Signup"
            description="Fill the form to sign up"
            title="Signup"
            open={isSignUpOpen}
            setOpen={setIsSignUpOpen}
          >
            <Signup onSuccess={onSuccessSignUp} />
          </Auth>
          <Auth
            buttonName="Signin"
            description="Fill the form to sign up"
            title="Signin"
            open={isSignInOpen}
            setOpen={setIsSignInOpen}
          >
            <Signin onSuccess={onSuccessSignIn} />
          </Auth>
        </div>
      )}
    </div>
  );
}

export default Navigation;
