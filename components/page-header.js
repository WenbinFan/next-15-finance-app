import Link from "next/link"
import DarkModeToggle from "./dark-mode-toggle"
import getServerTheme from "@/hooks/use-server-dark-mode"
import { createClient } from "@/lib/supabase/server"
import { KeyRound } from "lucide-react"
import { sizes, variants } from "@/lib/variants"
import SignOutButton from "./sign-out-button"
import Avatar from "./avatar"

export default async function PageHeader({className}) {
  const theme = await getServerTheme()
  const supabase = await createClient()
  const {data: {user}, error} = await supabase.auth.getUser()
  return (
    <header className={`flex justify-between items-center ${className}`}>
        <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance App</Link>

        <div className="flex items-center space-x-4">
            <DarkModeToggle defaultMode={theme} />
            {user && <Link className={`flex items-center space-x-1 ${variants['ghost']} ${sizes['sm']}`} href="/dashboard/settings">
              <Avatar />
              <span>{user?.user_metadata.fullName}</span>
            </Link>}
            {user && <SignOutButton />}
            {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
              <KeyRound className="w-6 h-6" />
              <span>Login</span>
            </Link>}
        </div>
    </header>
  )
}