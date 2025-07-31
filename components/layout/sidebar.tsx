"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Home } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Back to Home", href: "/", icon: Home },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/dashboard" className="text-white font-bold text-xl">
          Flex Living
        </Link>
      </div>
      <nav className="flex flex-1 flex-col px-6 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Add some helpful info in the sidebar */}
          <li className="mt-auto">
            <div className="px-2 py-4 text-xs text-gray-400">
              <div className="mb-2">
                <p className="font-medium text-gray-300">Assessment Features:</p>
              </div>
              <ul className="space-y-1">
                <li>• Review Management</li>
                <li>• Property Performance</li>
                <li>• Trend Analysis</li>
                <li>• Approval System</li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}
