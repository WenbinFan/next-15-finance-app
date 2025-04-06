import { sizes, variants } from "@/lib/variants";

export default function Button(props) {
  console.log(props)
  return (<button {...props} className={`${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']} ${props.className}`}></button>)
}