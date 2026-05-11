import { useColorScheme } from 'react-native'

export function useTheme() {
  const scheme = useColorScheme()
  const dark = scheme === 'dark'

  return {
    dark,
    colors: {
      background: dark ? '#161616' : '#f4f4f4',
      card: dark ? '#262626' : '#ffffff',
      text: dark ? '#f4f4f4' : '#161616',
      subtext: dark ? '#a8a8a8' : '#525252',
      border: dark ? '#393939' : '#e0e0e0',
      primary: '#0f62fe',
      error: '#da1e28',
      placeholder: dark ? '#6f6f6f' : '#a8a8a8',
      skeleton: dark ? '#393939' : '#e0e0e0',
    }
  }
  
}