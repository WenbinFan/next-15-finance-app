'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from './supabase/server'

export async function createTransaction(formData) {
    // Validate data
    const supabase = await createClient()
    const { error } = await supabase.from('transactions').insert(formData)

    if (error) {
        console.error(error)
        throw new Error('Failed to create transaction')
    }

    revalidatePath('/dashboard')
  }