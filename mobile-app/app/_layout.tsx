import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { LanguageProvider } from '@/context/LanguageContext';
import { MatchProvider } from '@/context/MatchContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProviderCustom, useTheme } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};
function RootNavigation() {

  const {
    isAuthenticated,
    initializing,
  } = useAuth();

  if (initializing) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#22c55e"
        />
      </View>
    );
  }

  if (!isAuthenticated) {

    return (
      <Redirect
        href="/login"
      />
    );
  }

  return null;
}
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
      <LanguageProvider>
        <ThemeProviderCustom>
          <MatchProvider>
            <ThemeProviderWrapper />
            <RootNavigation/>
          </MatchProvider>
        </ThemeProviderCustom>
      </LanguageProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

function ThemeProviderWrapper() {
  const { theme } = useTheme();
  return (
    <ThemeProvider
      value={theme === 'dark'
        ? DarkTheme
        : DefaultTheme
      }
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <StatusBar style="auto" />

    </ThemeProvider>
  );
}
