import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

interface Props {
  onSaveDraft: () => void;
  onSubmit: () => void;

  isSubmitting?: boolean;
}

export default function EvaluationActionsCard({
  onSaveDraft,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.draftButton,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
        onPress={onSaveDraft}
      >
        <Text
          style={[
            styles.draftText,
            {
              color: colors.text,
            },
          ]}
        >
          حفظ كمسودة
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor:
              colors.primary,
          },
        ]}
        onPress={onSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitText}>
          {isSubmitting
            ? 'جاري الإرسال...'
            : 'إرسال التقييم'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 40,
  },

  draftButton: {
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  draftText: {
    fontSize: 15,
    fontWeight: '700',
  },

  submitButton: {
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});