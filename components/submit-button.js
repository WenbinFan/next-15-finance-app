import { Loader } from "lucide-react"
import Button from "./button"
import { useFormStatus } from "react-dom"

export default function Submit(props) {
    const { pending } = useFormStatus()
    return <Button {...props} className={`${props.className} flex items-center justify-center space-x-2 px-4 py-2`}>
        {pending && <Loader className="animate-spin w-4 h-4" />}
        {props.children}
    </Button>
}