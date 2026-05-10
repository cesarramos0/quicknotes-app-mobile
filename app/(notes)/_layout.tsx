import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NotesProvider } from '../../context/NotesContext'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <NotesProvider>
        <Slot />
      </NotesProvider>
    </SafeAreaProvider>
  )
}