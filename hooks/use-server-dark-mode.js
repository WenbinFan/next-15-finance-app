import { cookies } from 'next/headers'

const getServerTheme = async (defaultTheme = 'light') => {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return theme?.value || defaultTheme
}

export default getServerTheme