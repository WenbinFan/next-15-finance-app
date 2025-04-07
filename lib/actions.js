'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validation'
import { redirect } from 'next/navigation'

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
    const supabase = await createClient()
    const email = formData.get('email')
    const {error} = await supabase.auth.signInWithOtp({
        email: formData.get('email'),
        options: {
            shouldCreateUser: true
        }
    })
    if (error) {
        return {
            message: 'Login failed',
            error: true,
        }
    }

    return {
        message: `Email send to ${email}`,
        error: false,
    }
}

export async function signOut() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    redirect('/login')
}

export async function uploadAvatar(prevState, formData) {
    const supabase = await createClient()
    const file = formData.get('file')
    const fileExtension = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExtension}`

    // If the file is empty
    if (!file.size) {
        return {
            message: 'Please select a file',
            error: true,
        }
    }

    const {error} = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

    if (error) {
        return {
            message: 'Failed to upload avatar',
            error: true,
        }
    }

    // Removing the old file
    const {data: userData, userError} = await supabase.auth.getUser()
    if (userError) {
        return {
            message: 'Something went wrong, please try again',
            error: true,
        }
    }

    const avatar = userData.user.user_metadata.avatar
    if (avatar) {
        const {error} = await supabase.storage
            .from('avatars')
            .remove([avatar])

        if (error) {
            return {
                message: 'Something went wrong, please try again',
                error: true,
            }
        }
    }

    const {error: dataUploadError} = await supabase.auth
        .updateUser({
            data: {
                avatar: fileName
            }
        })

    if (dataUploadError) {
        return {
            message: 'Failed to update user data',
            error: true,
        }
    }

    return {
        message: 'Avatar uploaded successfully',
    }
}

export async function updateSettings(prevState, formData) {
    const validated = settingsSchema.safeParse({
        fullName: validated.data.fullName,
        defaultView: validated.data.defaultView,
    })

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    const supabase = await createClient()
    const {error} = await supabase.auth
      .updateUser({
        data: {
          fullName: formData.get('fullName'),
          defaultView: formData.get('defaultView')
        }
      })
      
    if (error) {
      return{
        error: true,
        message: 'Failed updating setting'
      }
    }
  
    return {
      message: 'Updated user settings'
    }
  }