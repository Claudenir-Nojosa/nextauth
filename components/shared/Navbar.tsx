"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GithubIcon } from "@/config/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MaxWidthWrapper from "../MaxWidthWrapper";

export const Navbar = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const { data: dataSession } = useSession();
  return (
    <MaxWidthWrapper>
      <NextUINavbar maxWidth="xl" position="sticky" className="rounded-sm  p-5">
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <NavbarItem className="text-3xl font-bold">.nextEvery</NavbarItem>
            </NextLink>
          </NavbarBrand>
          {dataSession ? (
            <ul className="hidden sm:flex gap-3  lg:pl-0 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className="text-xl hover:text-zinc-300"
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          ) : (
            ""
          )}
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full justify-end">
          <NavbarItem className="hidden sm:flex gap-4">
            <Link isExternal href={siteConfig.links.github} aria-label="Github">
              <GithubIcon className="text-default-500 hover:text-slate-200" />
            </Link>
            {dataSession?.user ? (
              <>
                <Button
                  className="text-default-500"
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                >
                  <LogOut className="hover:text-slate-200" />
                </Button>
                <Avatar>
                  <AvatarImage src={dataSession.user.image} />
                  <AvatarFallback className="relative flex h-10 w-10 text-black shrink-0 overflow-hidden rounded-full bg-white">
                    {dataSession?.user.name
                      ? dataSession.user.name.charAt(0).toUpperCase()
                      : ""}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <Link href="/login">
                <User2 className="text-default-500 hover:text-slate-200" />
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className=" sm:hidden basis-1/5 sm:basis-full justify-end">
          <NavbarItem className=" gap-2 flex justify-center align-middle">
            <Link isExternal href={siteConfig.links.github} aria-label="Github">
              <GithubIcon className="hidden sm:flex text-default-500 hover:text-slate-200 " />
            </Link>
            {dataSession?.user ? (
              <div className="flex">
                <Button
                  className="text-default-500"
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                >
                  <LogOut className="hover:text-slate-200" />
                </Button>
                <Avatar>
                  <AvatarImage src={dataSession?.user.image} />
                  <AvatarFallback className="relative flex h-10 w-10 text-black bg-white shrink-0 overflow-hidden rounded-full">
                    {dataSession?.user.name
                      ? dataSession.user.name.charAt(0).toUpperCase()
                      : ""}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Link href="/login">
                <User2 className="text-default-500 hover:text-slate-200" />
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
      </NextUINavbar>
    </MaxWidthWrapper>
  );
};
