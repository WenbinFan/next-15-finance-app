import { createClient } from "@/lib/supabase/server"
import { CircleUser } from "lucide-react"
import Image from "next/image"

export default async function Avatar({width = 32, height = 32}) {
    const suppabase = await createClient()
    const {data: {user}} = await suppabase.auth.getUser()
    const {data: imageData, error} = await suppabase.storage
        .from('avatars')
        .createSignedUrl(user.user_metadata?.avatar, 60*5)
    
    if (error) {
        return <CircleUser className="w-6 h-6" />
    }

    return <Image src={imageData.signedUrl} alt="User avatar" width={width} height={height} className="rounded-full" />
}