import { sizes, variants } from "@/lib/variants";

export default function Button(props) {
  return (
    <button 
      {...props} 
      className={`inline-flex items-center justify-center border border-gray-300 ${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']} ${props.className}`}
    >
      {props.children}
    </button>
  )
}