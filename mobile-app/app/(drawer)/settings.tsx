 import { View, Text,  StyleSheet, ScrollView,  TouchableOpacity,  Switch} from 'react-native';
import { useState } from 'react';
import {
  Moon,
  Languages,
  Shield,
  Info,
  LogOut,
  ChevronLeft,
  User,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

export default function Settings() {
  const { theme, toggleTheme } =
    useTheme();
  const colors = Colors[theme];
  const [english, setEnglish] =
    useState(false);
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* TITLE */}

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >الإعدادات</Text>
  {/* PROFILE */}
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          الملف الشخصي
        </Text>

        <View style={styles.profileRow}>
          <View
            style={[
              styles.profilePic,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
          >
            <User
              size={28}
              color="#fff"
            />
          </View>

          <View>
            <Text
              style={[
                styles.profileName,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              علي أحمد
            </Text>

            <Text
              style={[
                styles.specification,
                {
                  color:
                    colors.textSecondary,
                },
              ]}
            >
              حكم ساحة
            </Text>
          </View>
        </View>
      </View>

      {/* THEME */}

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          المظهر
        </Text>

        <TouchableOpacity
          style={[
            styles.settingButton,
            {
              backgroundColor:
                colors.cardIconBackground,
            },
          ]}
          activeOpacity={0.8}
          onPress={toggleTheme}
        >
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    colors.primary,
                },
              ]}
            >
              <Moon
                size={18}
                color="#fff"
              />
            </View>

            <View>
              <Text
                style={[
                  styles.settingTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                الوضع الليلي
              </Text>

              <Text
                style={[
                  styles.settingSubtitle,
                  {
                    color:
                      colors.textSecondary,
                  },
                ]}
              >
                تبديل بين الوضع
                الداكن والفاتح
              </Text>
            </View>
          </View>
[17/05/2026 11:48 PM] Mahdi Salim: <ChevronLeft
            size={20}
            color={
              colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>

      {/* LANGUAGE */}

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          اللغة
        </Text>

        <View
          style={[
            styles.settingButton,
            {
              backgroundColor:
                colors.cardIconBackground,
            },
          ]}
        >
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    colors.primary,
                },
              ]}
            >
              <Languages
                size={18}
                color="#fff"
              />
            </View>

            <View>
              <Text
                style={[
                  styles.settingTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                اللغة الإنجليزية
              </Text>

              <Text
                style={[
                  styles.settingSubtitle,
                  {
                    color:
                      colors.textSecondary,
                  },
                ]}
              >
                تغيير لغة التطبيق
              </Text>
            </View>
          </View>

          <Switch
            value={english}
            onValueChange={setEnglish}
            trackColor={{
              false:
                colors.border,
              true:
                colors.primary,
            }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* ABOUT */}

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          التطبيق
        </Text>

        <TouchableOpacity
          style={styles.menuRow}
          activeOpacity={0.8}
        >
          <View style={styles.settingLeft}>
            <Info
              size={20}
              color={colors.primary}
            />

            <Text
              style={[
                styles.menuText,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              عن التطبيق
            </Text>
          </View>

          <ChevronLeft
            size={18}
            color={
              colors.textSecondary
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuRow}
          activeOpacity={0.8}
        >
          <View style={styles.settingLeft}>
            <Shield
              size={20}
              color={colors.primary}
            />

            <Text
              style={[
                styles.menuText,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              الخصوصية
            </Text>
          </View>

          <ChevronLeft
            size={18}
            color={
              colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
[17/05/2026 11:48 PM] Mahdi Salim: <TouchableOpacity
        style={[
          styles.logoutButton,
          {
            backgroundColor:
              colors.dangerBackground,
          },
        ]}
        activeOpacity={0.8}
      >
        <LogOut
          size={20}
          color={colors.danger}
        />

        <Text
          style={[
            styles.logoutText,
            {
              color:
                colors.danger,
            },
          ]}
        >
          تسجيل الخروج
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 24,
  },

  card: {
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 18,
  },

  profileRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },

  profileName: {
    fontSize: 20,
    fontWeight: '800',
  },

  specification: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '500',
  },

  settingButton: {
    borderRadius: 20,
    padding: 16,

    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  settingLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 14,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  settingSubtitle: {
    marginTop: 3,
    fontSize: 13,
  },

  menuRow: {
    paddingVertical: 16,

    flexDirection: 'row-reverse',
    justifyContent:
      'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor:
      'rgba(156,163,175,0.15)',
  },

  menuText: {
    fontSize: 15,
    fontWeight: '600',
  },

  logoutButton: {
    borderRadius: 22,
    paddingVertical: 18,

    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,

    marginTop: 6,
    marginBottom: 40,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '800',
  },
});