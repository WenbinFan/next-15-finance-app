import Separator from "@/components/separator"
import TransactionItem from "@/components/transaction-item"
import TransactionSummaryItem from "@/components/transaction-summary-item"
import { createClient } from "@/lib/supabase/server"

const groupAndSumTransactionByData = (transactions) => {
    const grouped = {}
    for (const transaction of transactions) {
        const date = transaction.created_at.split('T')[0]
        if (!grouped[date]) {
            grouped[date] = {transactions: [], amount: 0}
        }
        grouped[date].transactions.push(transaction)
        const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
        grouped[date].amount += amount
    }
    return grouped
}

export default async function TransactionList() {
    const supabase = await createClient()
    const {data: transactions, error} = await supabase.from('transactions').select('*').order('created_at', {ascending: true})
    const grouped = groupAndSumTransactionByData(transactions)

    return (
        <div className="space-y-8">
            {Object.entries(grouped).map(([date, {transactions, amount}]) =>
                <div key={date}>
                    <TransactionSummaryItem date={date} amount={amount} />
                    <Separator />
                    <section className="space-y-4">
                        {transactions.map(transaction => <div key={transaction.id}>
                            <TransactionItem {...transaction} />
                        </div>)}
                    </section>
                </div>
            )}
        </div>
    )
}