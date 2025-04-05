import BaseTrend from "@/components/trend"
import { createClient } from "@/lib/supabase/server"

export default async function Trend({type}) {   
    const supabase = await createClient() 
    let { data, error } = await supabase
        .rpc('calculate_total', {
        type_arg: type
    })
    if (error) throw new Error('Failed to fetch trend data')

    const amount = data ?? 0

    return <BaseTrend type={type} amount={amount} prevAmount={amount - 500} />
}