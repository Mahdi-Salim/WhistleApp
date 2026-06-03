import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  ChevronLeft,
  CalendarDays,
} from 'lucide-react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  title: string;
  date: string;
  matchesCount: number;
  onPress: () => void;
};

export default function WeekCard({
  title,
  date,
  matchesCount,
  onPress,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          backgroundColor:
            colors.card,
          borderColor:
            colors.border,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        {/* ICON */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                colors.highLight,
            },
          ]}
        >
          <CalendarDays
            size={22}
            color={colors.primary}
          />
        </View>

        {/* TEXT */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.date,
              {
                color:
                  colors.textSecondary,
              },
            ]}
          >
            {date}
          </Text>

          <Text
            style={[
              styles.matches,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            {matchesCount} مباريات
          </Text>
        </View>
      </View>

      <ChevronLeft
        size={22}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },

  textContainer: {
    flexDirection: 'column',
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 5,
  },

  date: {
    fontSize: 13,
    marginBottom: 6,
  },

  matches: {
    fontSize: 14,
    fontWeight: '700',
  },
});