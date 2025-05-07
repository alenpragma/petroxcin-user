"use client"

import { useEffect, useState } from "react"
import { Bell, Search } from "lucide-react"
import {Button} from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { useMobile } from "@/src/hooks/use-mobile"
import { Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const isMobile = useMobile()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem("demo-name") || localStorage.getItem("demo-user") || ""
    setUserName(storedName)
  }, [])

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U"
    const parts = name.split("@")[0].split(/[^a-zA-Z0-9]/)
    return parts[0].charAt(0).toUpperCase()
  }

  return (
    <header className="h-16 border-b bg-white flex items-center px-4 md:px-6">
      <div className="flex items-center gap-4 md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="font-semibold text-lg md:hidden">Dashboard</div>
      <div className="hidden md:block font-semibold text-lg">Dashboard</div>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search Anything Here..." className="pl-8 w-full" />
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <span className="text-sm font-medium">Rank 1</span>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
