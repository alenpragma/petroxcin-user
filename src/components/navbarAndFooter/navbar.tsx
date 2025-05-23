"use client";

import React, { useState } from "react";
import { Flame, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";
import { cn } from "@/src/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import Image from "next/image";
import { Images } from "@/src/lib/store/image/image";

export function Navbar({ token }: { token: string | undefined }) {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* <Link href="/" className="flex items-center"> */}
          <Image className="w-44" src={Images.logo} alt="img" />
          {/* </Link> */}
        </div>

        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* <Link href="/" legacyBehavior passHref> */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
                {/* </Link> */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                {/* <Link href="/about" legacyBehavior passHref> */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
                {/* </Link> */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Investment Plans</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        {/* <a href="/"> */}
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#0A1F44] to-[#0A1F44]/90 p-6 no-underline outline-none focus:shadow-md">
                          <Flame className="h-6 w-6 text-[#C49B3E]" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Premium Energy Portfolio
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Our flagship investment plan with diversified
                            exposure to the entire energy sector.
                          </p>
                        </div>
                        {/* </a> */}
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/plans/oil-bonds" title="Oil Bonds">
                      Fixed income securities backed by oil production assets.
                    </ListItem>
                    <ListItem href="/plans/gas-futures" title="Gas Futures">
                      Strategic positions in natural gas futures markets.
                    </ListItem>
                    <ListItem href="/plans/energy-stocks" title="Energy Stocks">
                      Curated portfolio of energy company equities.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {/* <Link href="/insights" legacyBehavior passHref> */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Market Insights
                </NavigationMenuLink>
                {/* </Link> */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                {/* <Link href="/projects" legacyBehavior passHref> */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Projects
                </NavigationMenuLink>
                {/* </Link> */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                {/* <Link href="/resources" legacyBehavior passHref> */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Resources
                </NavigationMenuLink>
                {/* </Link> */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                {/* <Link href="/contact" legacyBehavior passHref> */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
                {/* </Link> */}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {!token ? (
          <div className="hidden items-center space-x-4 lg:flex">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#0A1F44] text-[#0A1F44]"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
                Get Start
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/dashboard">
            <Button className="bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
              Dashboard
            </Button>
            //{" "}
          </Link>
        )}

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                {/* <Link href="/" className="flex items-center"> */}
                <Image
                  className="w-32"
                  src={Images.logo}
                  alt="img"
                  width={500}
                  height={500}
                />
                {/* </Link>  */}
                <nav className="flex flex-col space-y-4">
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    Home
                  </li>
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    About Us
                  </li>
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    Investment Plans
                  </li>
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    Market Insights
                  </li>
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    Projects
                  </li>
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    Resources
                  </li>
                  <li className="text-lg font-medium text-[#0A1F44] hover:text-[#C49B3E] list-none">
                    Contact
                  </li>
                </nav>
                <div className="flex flex-col space-y-4">
                  {!token ? (
                    <>
                      <Link href="/login">
                        <Button
                          variant="outline"
                          className="w-full border-[#0A1F44] text-[#0A1F44]"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/dashboard">
                      <Button className="w-full bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
