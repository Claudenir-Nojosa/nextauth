"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { DoorOpen, Fingerprint, LogInIcon, LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GithubIcon } from "@/config/icons";

export const Navbar = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const { data: dataSession } = useSession();
  console.log(dataSession);
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className=" py-2 px-10 rounded-sm border-b border-b-slate-600 border-opacity-70"
    >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Fingerprint />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4  lg:pl-0 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full justify-end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500 hover:text-slate-200" />
          </Link>
          {dataSession?.user ? (
            <Button
              className="text-default-500"
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
            >
              <LogOut className="hover:text-slate-200" />
            </Button>
          ) : (
            <Link href="/login">
              <User2 className="text-default-500 hover:text-slate-200" />
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className=" sm:hidden basis-1/5 sm:basis-full justify-end">
        <NavbarItem className=" gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="hidden sm:flex text-default-500 hover:text-slate-200 " />
          </Link>
          {dataSession?.user ? (
            <Button
              className="text-default-500"
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
            >
              <LogOut className="hover:text-slate-200" />
            </Button>
          ) : (
            <Link href="/login">
              <User2 className="text-default-500 hover:text-slate-200" />
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
