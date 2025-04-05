import BaseTrend from "@/components/trend"
import { createClient } from "@/lib/supabase/server"

export default async function Trend({type, range}) {   
    const supabase = await createClient() 
    let { data, error } = await supabase
        .rpc('calculate_total', {
            range_arg: range,
            type_arg: type
    })
    if (error) 
        console.error(error)
        // throw new Error('Failed to fetch trend data')

    const amount = data[0]

    return <BaseTrend type={type} amount={amount.current_amount} prevAmount={amount.previous_amount} />
}