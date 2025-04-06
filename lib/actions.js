'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validation'

export async function createTransaction(formData) {
    const validated = transactionSchema.safeParse(formData)

    if (!validated.success) {
        throw new Error('Invalid data')
    }

    const supabase = await createClient()
    const { error } = await supabase.from('transactions').insert(validated.data)

    if (error) {
        console.error(error)
        throw new Error('Failed to create transaction')
    }

    revalidatePath('/dashboard')
}

export async function updateTransaction(id, formData) {
    const validated = transactionSchema.safeParse(formData)

    if (!validated.success) {
        throw new Error('Invalid data')
    }

    const supabase = await createClient()
    const { error } = await supabase.from('transactions').update(validated.data).eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Failed to update transaction')
    }

    revalidatePath('/dashboard')
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
    const supabase = await createClient()
    
    let { data, error } = await supabase
        .rpc('fetch_transactions', {
        limit_arg: limit, 
        offset_arg: offset, 
        range_arg: range
        })
    if (error) throw new Error('Failed to fetch transactions')
    return data
}

export async function deleteTransaction(id) {
    const supabase = await createClient()
    const { error } = await supabase.from('transactions').delete().eq('id', id)

    if (error) {
        console.error(error)
        throw new Error(`Failed to delete transaction ${id}`)
    }

    revalidatePath('/dashboard')
}

export async function login(prevState, formData) {
    if ('bowenfan621@gmail.com' === formData.get('email')) {
        return {
            message: 'Login successful',
            error: false,
        }
    }
    return {
        message: 'Login failed',
        error: true,
    }
}