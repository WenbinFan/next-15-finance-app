import Button from "./button"
import { deleteTransaction } from "@/lib/actions"

export default function TransactionItemRemoveButton({id}) {
  return <Button onClick={async () => {
    await deleteTransaction(id)
  }}>X</Button>
}