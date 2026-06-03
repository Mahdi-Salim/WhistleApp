import { Drawer } from 'expo-router/drawer';
import {  Home,  Settings, Bell } from 'lucide-react-native';
import Header from '@/components/Header';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

export default function DrawerLayout() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <Drawer
      screenOptions={{
        header: () => <Header />,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor:
            colors.card,
          width: 290,
          borderLeftWidth: 1,
          borderLeftColor:
            colors.border,
        },

        drawerContentStyle: {
          paddingTop: 10,
        },

        drawerItemStyle: {
          borderRadius: 16,
          marginHorizontal: 12,
          marginVertical: 4,
          paddingVertical: 4,
        },

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '700',
          marginRight: -10,
        },

        drawerActiveBackgroundColor:
          colors.cardIconBackground,

        drawerActiveTintColor:
          colors.primary,

        drawerInactiveTintColor:
          colors.text,

        overlayColor:
          'rgba(0,0,0,0.45)',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'الرئيسية',

          drawerLabel: 'الرئيسية',

          drawerIcon: ({
            color,
            size,
          }) => (
            <Home
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          title: 'الإعدادات',

          drawerLabel: 'الإعدادات',

          drawerIcon: ({
            color,
            size,
          }) => (
            <Settings
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: 'الإشعارات',
          drawerLabel: 'الإشعارات',
          drawerIcon: ({ color, size }) => (
            <Bell color={color} size={size} />
          ),
        }}
      />
       <Drawer.Screen
    name='LineUps'
    options={{
      drawerLabel: 'قوائم الفريقين',
    }}
    />
        <Drawer.Screen
    name='match-review'
    options={{
      drawerLabel: 'مراجعة التقرير',
    }}
    />
    </Drawer>

   
  );
}