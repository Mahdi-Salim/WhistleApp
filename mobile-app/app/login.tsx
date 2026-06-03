import React, { useState } from 'react';
import {Alert,  KeyboardAvoidingView,  Platform,  StyleSheet, Text,  TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const colors = Colors[theme];
  
  const isArabic = lang === 'ar';

  const text = isArabic
    ? {
        title: 'تسجيل الدخول',
        subtitle: 'أدخل بياناتك للمتابعة',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        login: 'دخول',
        forgot: 'نسيت كلمة المرور؟',
        empty: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
      }
    : {
        title: 'Login',
        subtitle: 'Enter your credentials to continue',
        email: 'Email',
        password: 'Password',
        login: 'Sign In',
        forgot: 'Forgot password?',
        empty: 'Please enter your email and password',
      };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login,
    loading,
  } = useAuth();
 const handleLogin =
  async () => {

    if (
      !email.trim() ||
      !password.trim()
    ) {

      Alert.alert(
        text.title,
        text.empty
      );

      return;
    }

    try {
      const loggedUser = await login(
        email,
        password,
      );

      if (loggedUser.RoleId === 2) {
        router.replace('/(drawer)/(tabs)/assessor');
      } else if (loggedUser.RoleId === 3) {
        router.replace('/(drawer)/(tabs)/referee');
      } else {
        router.replace('/(drawer)/(tabs)');
      }
    } catch (error: any) {
      Alert.alert(
        text.title,
        error.message ||
        'Login failed'
      );
    }
};
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View
            style={[
              styles.logoBox,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                textAlign: isArabic ? 'right' : 'left',
              },
            ]}
          >
            {text.title}
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
                textAlign: isArabic ? 'right' : 'left',
              },
            ]}
          >
            {text.subtitle}
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.shadow,
              },
            ]}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={text.email}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                  color: colors.text,
                  textAlign: isArabic ? 'right' : 'left',
                },
              ]}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder={text.password}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              textContentType="password"
              secureTextEntry
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                  color: colors.text,
                  textAlign: isArabic ? 'right' : 'left',
                },
              ]}
            />

            <TouchableOpacity onPress={() => Alert.alert(text.forgot)}>
              <Text
                style={[
                  styles.forgotText,
                  {
                    color: colors.primary,
                    textAlign: isArabic ? 'left' : 'right',
                  },
                ]}
              >
                {text.forgot}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors.primary,
                },
              ]}
              activeOpacity={0.85}
              onPress={handleLogin}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.heroText,
                  },
                ]}
              >
                {
                 loading
                 ? '...'
                 : text.login
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '900',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 14,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 18,
  },
  button: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
  },
});