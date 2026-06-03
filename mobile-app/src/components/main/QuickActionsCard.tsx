import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export default function QuickActionCard({
  title,
  icon,
  color,
  onPress,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.text,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={28}
        color={color}
      />

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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    paddingVertical: 24,
    borderRadius: 22,
    alignItems: 'center',

    marginBottom: 14,

    borderWidth: 1,

    shadowOpacity: 0.06,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  title: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});