"use client";

import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useMobile } from "@/src/hooks/use-mobile";
import { Menu } from "lucide-react";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
  profileData: IUserProfileResponse;
}

export function Header({ onMenuClick, profileData }: HeaderProps) {
  const isMobile = useMobile();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get user name from localStorage
    const storedName =
      localStorage.getItem("demo-name") ||
      localStorage.getItem("demo-user") ||
      "";
    setUserName(storedName);
  }, []);

  // Get initials for avatar fallback
  // const getInitials = (name: string) => {
  //   if (!name) return "U";
  //   const parts = name.split("@")[0].split(/[^a-zA-Z0-9]/);
  //   return parts[0].charAt(0).toUpperCase();
  // };
  const pathname = usePathname();
  const formatPathname = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    const lastSegment = parts[parts.length - 1] || "Dashboard";
    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const pageTitle = formatPathname(pathname);
  return (
    <header className="h-16 border-b bg-white flex items-center px-4 md:px-6">
      <div className="flex items-center gap-4 md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="font-semibold text-lg md:hidden">Dashboard</div>
      <div className="hidden md:block font-semibold text-lg">{pageTitle}</div>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search Anything Here..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <span className="text-sm font-medium">{profileData?.user?.name}</span>
        </div>
       
        {/* <Avatar> */}
        <Link href="/dashboard/profile">
          <div className="size-10 bg-gray-400 p-0.5 rounded-full overflow-hidden">
            <Image
              className="size-full object-cover rounded-full"
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              alt="img"
              width={500}
              height={500}
            />
          </div>
        </Link>
        {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" /> */}
        {/* <AvatarFallback>{getInitials(userName)}</AvatarFallback> */}
        {/* </Avatar> */}
      </div>
    </header>
  );
}
