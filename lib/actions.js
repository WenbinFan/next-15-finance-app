'use server'

import { revalidateTag } from 'next/cache'

export async function purgeTractionListCache(formData) {
    revalidateTag('transaction-list')
}