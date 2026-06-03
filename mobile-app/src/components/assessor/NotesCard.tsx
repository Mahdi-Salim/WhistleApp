import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function NotesCard({
  value,
  onChangeText,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        الملاحظات العامة
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        أضف أي ملاحظات أو توصيات تخص أداء الحكام
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        placeholder="اكتب الملاحظات هنا..."
        placeholderTextColor={
          colors.textSecondary
        }
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor:
              colors.inputBackground,
            borderColor: colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    marginBottom: 14,
  },

  input: {
    minHeight: 140,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    fontSize: 15,
  },
});