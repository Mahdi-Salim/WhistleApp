import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export type RefereeKey =
  | 'main'
  | 'assistant1'
  | 'assistant2'
  | 'fourth';

interface Props {
  selected: RefereeKey;

  onSelect: (
    referee: RefereeKey
  ) => void;
}

export default function RefereeTabs({
  selected,
  onSelect,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const tabs = [
    {
      key: 'refree',
      label: 'حكم الساحة',
    },
    {
      key: 'assistant1',
      label: 'م1',
    },
    {
      key: 'assistant2',
      label: 'م2',
    },
    {
      key: 'fourthOficial',
      label: 'الحكم الرابع',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.card,
          borderColor:
            colors.border,
        },
      ]}
    >
      {tabs.map((tab) => {
        const active =
          selected === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              active && {
                backgroundColor:
                  colors.primary,
              },
            ]}
            onPress={() =>
              onSelect(
                tab.key as RefereeKey
              )
            }
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: active
                    ? '#fff'
                    : colors.text,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 6,
    marginBottom: 18,
    flexDirection: 'row-reverse',
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
});