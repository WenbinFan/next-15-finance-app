import Link from "next/link"
import DarkModeToggle from "./dark-mode-toggle"
import useServerDartkMode from "@/hooks/use-server-dark-mode"

export default function PageHeader({className}) {
  const theme = useServerDartkMode()
  return (
    <header className={`flex justify-between items-center ${className}`}>
        <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance App</Link>

        <div className="flex items-center space-x-4">
            <DarkModeToggle defaultMode={theme} />
            <div>Uder Dropdown</div>
        </div>
    </header>
  )
}