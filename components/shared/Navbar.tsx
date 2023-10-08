"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import {
  Airplay,
  AlignJustify,
  Cloud,
  CreditCard,
  DoorOpen,
  DoorOpenIcon,
  Github,
  Home,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Twitter,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { User2 } from "lucide-react";
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
                  <AvatarFallback className="relative flex h-10 w-10 text-black shrink-0 overflow-hidden rounded-full bg-zinc-400">
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
          <NavbarItem className=" gap-2 hidden justify-center align-middle">
            <Link isExternal href={siteConfig.links.github} aria-label="Github">
              <GithubIcon className="hidden  text-default-500 hover:text-slate-200 " />
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
                  <AvatarFallback className="relative flex h-10 w-10 text-black bg-zinc-400 shrink-0 overflow-hidden rounded-full">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden text-zinc-400">
              <AlignJustify />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black">
              <DropdownMenuLabel>.nextEvery</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Home className="mr-2 h-4 w-4" />
                  <NextLink href="/">Pagina Inicial</NextLink>
                </DropdownMenuItem>
                {dataSession ? (
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <NextLink href="/perfil">Perfil</NextLink>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <NextLink href="/register">Criar Conta</NextLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Airplay className="mr-2 h-4 w-4" />
                  <NextLink href="/dashboard">Dashboard</NextLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <NextLink href="/create">Criar Post</NextLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Github className="mr-2 h-4 w-4" />
                  <NextLink
                    href="https://github.com/Claudenir-Nojosa"
                    target="_blank"
                  >
                    GitHub
                  </NextLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Twitter className="mr-2 h-4 w-4" />
                  <NextLink href="https://twitter.com/nojosaf" target="_blank">
                    Twitter
                  </NextLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {dataSession ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className=" cursor-pointer" onClick={handleSignOut}>
                      Sair
                    </span>
                  </>
                ) : (
                  <>
                    <DoorOpenIcon className="mr-2 h-4 w-4" />
                    <NextLink href="'/login'" target="_blank">
                      Login
                    </NextLink>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarContent>
      </NextUINavbar>
    </MaxWidthWrapper>
  );
};
