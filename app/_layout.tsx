import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import MainScreen from '../Vista/main';
import CountryScreen from '../Vista/country';

const Stack = createNativeStackNavigator();

// NOTE: This layout was simplified to always render the `Vista/main.tsx` screen
// as the sole view. This bypasses the Expo Router stack and any tabs so the
// app shows only that component.
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Country" component={CountryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
