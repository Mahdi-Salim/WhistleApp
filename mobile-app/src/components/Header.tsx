import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import {
  Menu,
  Bell,
} from 'lucide-react-native';

export default function Header() {
  const router = useRouter();
  const navigation = useNavigation();

  const { theme: currentTheme } = useTheme();

  const theme = Colors[currentTheme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary,
          borderBottomColor: theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {/* LEFT */}
      <View style={styles.leftSection}>
        <View
          style={[
            styles.logoBox,
            {
              backgroundColor: theme.headerLogo,
            },
          ]}
        >
          <Text
            style={[
              styles.logoText,
              {
                color: theme.headerText,
              },
            ]}
          >
            W
          </Text>
        </View>

        <View>
          <Text
            style={[
              styles.title,
              {
                color: theme.headerText,
              },
            ]}
          >
            WhistleApp
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        {/* notifications */}
        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: theme.headerButton,
            },
          ]}
          onPress={() => router.push('/notifications')}
        >
          <Bell
            size={20}
            color={theme.headerText}
          />
        </TouchableOpacity>

        {/* Menu */}
        <TouchableOpacity
          style={[
            styles.menuButton,
            {
              backgroundColor:
                theme.headerButtonSecondary,
            },
          ]}
          onPress={() =>
            navigation.dispatch(
              DrawerActions.toggleDrawer()
            )
          }
        >
          <Menu
            size={22}
            color={theme.headerText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 95,

    paddingHorizontal: 18,
    paddingTop: 28,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,

    shadowOpacity: 0.15,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBox: {
    width: 46,
    height: 46,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  logoText: {
    fontSize: 22,
    fontWeight: '800',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',

    letterSpacing: 0.3,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,
  },

  iconButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },

  menuButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },
});