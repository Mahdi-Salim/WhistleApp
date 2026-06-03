import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface Stat {
  value: string;
  label: string;
}

interface HeaderCardProps {
  title: string;
  subtitle: string;
  stats: Stat[];
}

export default function HeaderCard({
  title,
  subtitle,
  stats,
}: HeaderCardProps) {
  const { theme } = useTheme();
  const { lang } = useLanguage();

  const colors = Colors[theme];
  const isArabic = lang === 'ar';

  return (
    <View
      style={[
        styles.heroCard,
        {
          backgroundColor: colors.primary,
        },
      ]}
    >
      <Text
        style={[
          styles.heroTitle,
          {
            color: colors.heroText,
            textAlign: isArabic ? 'right' : 'left',
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.heroSubtitle,
          {
            color: colors.heroSubText,
            textAlign: isArabic ? 'right' : 'left',
          },
        ]}
      >
        {subtitle}
      </Text>

      <View style={styles.heroStats}>
        {stats.map((item) => (
          <View
            key={item.label}
            style={styles.statBox}
          >
            <Text
              style={[
                styles.statNumber,
                {
                  color: colors.heroText,
                },
              ]}
            >
              {item.value}
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.heroMuted,
                },
              ]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 28,
    padding: 24,
    marginTop: 20,
    marginBottom: 26,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
  },

  heroSubtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
  },

  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '800',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    textAlign: 'center',
  },
});