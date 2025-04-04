import { cookies } from 'next/headers'

const useServerDarkMode = async (defaultTheme = 'light') => {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return theme?.value || defaultTheme
}

export default useServerDarkMode