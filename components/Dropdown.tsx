"use client";

import {
  Airplay,
  AlignJustify,
  DoorOpenIcon,
  Github,
  Home,
  LogOut,
  PlusCircle,
  Twitter,
  User,
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
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Dropdown = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const { data: dataSession } = useSession();
  return (
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
  );
};

export default Dropdown;
