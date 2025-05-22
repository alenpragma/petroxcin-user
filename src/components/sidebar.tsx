"use client";

import { cn } from "@/src/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  History,
  // ArrowLeftRight,
  ArrowDownToLine,
  RefreshCw,
  BarChart2,
  Users,
  LifeBuoy,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Images } from "@/src/lib/store/image/image";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [referralOpen, setReferralOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: PlusCircle, label: "Add Fund", href: "/dashboard/add-fund" },
    { icon: ListChecks, label: "Premium List", href: "/dashboard/premium-list" },
    {
      icon: History,
      label: "Invest History",
      href: "/dashboard/invest-history",
    },
    // { icon: ArrowLeftRight, label: "Transfer", href: "/dashboard/transfer" },
    { icon: ArrowDownToLine, label: "Withdraw", href: "/dashboard/withdraw" },
    { icon: RefreshCw, label: "Convert", href: "/dashboard/convert" },
    { icon: BarChart2, label: "Transaction", href: "/dashboard/transaction" },
    {
      icon: Users,
      label: "My Referral",
      children: [
        { label: "My Referral", href: "/dashboard/my-referral" },
        { label: "My Team", href: "/dashboard/my-team" },
      ],
    },
    {
      icon: LifeBuoy,
      label: "KYC verification",
      href: "/dashboard/kyc-verification",
    },
    { icon: LogOut, label: "Sign Out", href: "/logout" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative md:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-center mb-5 w-full">
          <Link href="/">
            <Image className="w-44" src={Images.logo} alt="img" />
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item, index) =>
            item.children ? (
              <div key={index}>
                <button
                  onClick={() => setReferralOpen(!referralOpen)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    item.children.some((child) => child.href === pathname)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      referralOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {referralOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        href={child.href}
                        className={cn(
                          "block px-2 py-1 rounded-md text-sm",
                          child.href === pathname
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  item.href === pathname
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
}
