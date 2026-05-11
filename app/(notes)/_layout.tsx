import { Stack } from 'expo-router'
import { NotesProvider } from '../../context/NotesContext'
import { useTheme } from '../../hooks/useTheme'

function NotesStack() {
  const { colors } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Mis notas' }} />
      <Stack.Screen name="new" options={{ title: 'Nueva nota' }} />
      <Stack.Screen name="[id]" options={{ title: 'Editar nota' }} />
    </Stack>
  )
}

export default function NotesLayout() {
  return (
    <NotesProvider>
      <NotesStack />
    </NotesProvider>
  )
}