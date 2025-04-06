import TransactionForm from "@/app/dashboard/components/transaction-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function Page({params: {id}}) {
    const supabase = await createClient()
    const {data: transaction, error} = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
        .single()

    if (error)  notFound()
    
  return <>
      <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
}