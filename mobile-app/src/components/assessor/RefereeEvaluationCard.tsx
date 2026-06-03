 import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type Criterion =
  | 'positioning'
  | 'decisions'
  | 'control'
  | 'fitness';

interface Props {
  title: string;
  name: string;

  scores: {
    positioning: number;
    decisions: number;
    control: number;
    fitness: number;
  };

  onChange: (
    criterion: Criterion,
    value: number
  ) => void;
}

export default function RefereeEvaluationCard({
  title,
  name,
  scores,
  onChange,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const values = [
    scores.positioning,
    scores.decisions,
    scores.control,
    scores.fitness,
  ];

  const evaluatedValues = values.filter(
    (value) => value > 0
  );

  const finalScore =
    evaluatedValues.length > 0
      ? evaluatedValues.reduce(
          (sum, value) => sum + value,
          0
        ) / evaluatedValues.length
      : null;

  const criteria: {
    key: Criterion;
    label: string;
  }[] = [
    {
      key: 'positioning',
      label: 'التمركز',
    },
    {
      key: 'decisions',
      label: 'القرارات',
    },
    {
      key: 'control',
      label: 'السيطرة',
    },
    {
      key: 'fitness',
      label: 'اللياقة',
    },
  ];

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
        {title}
      </Text>

      <Text
        style={[
          styles.name,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {name}
      </Text>

      <Text
        style={[
          styles.hint,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        أدخل درجة من 1 إلى 10
      </Text>

      {criteria.map((criterion) => (
        <View
          key={criterion.key}
          style={styles.criterionContainer}
        >
          <Text
            style={[
              styles.criterionLabel,
              {
                color: colors.text,
              },
            ]}
          >
            {criterion.label}
          </Text>

          <View style={styles.scoreContainer}>
            <TextInput
              style={[
                styles.scoreInput,
                {
                  color: colors.text,
                  backgroundColor:
                    colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
              keyboardType={
                Platform.OS === 'ios'
                  ? 'decimal-pad'
                  : 'numeric'
              }
              value={
                scores[criterion.key] > 0
                  ? String(scores[criterion.key])
                  : ''
              }
              placeholder="0"
              placeholderTextColor={
                colors.textSecondary
              }
              onChangeText={(text) => {
                const normalized =
                  text.replace(',', '.');

                const parsed =
                  parseFloat(normalized);

                if (!isNaN(parsed)) {
                  const clamped = Math.max(
                    1,
                    Math.min(10, parsed)
                  );

                  onChange(
                    criterion.key,
                    clamped
                  );
                } else {
                  onChange(
                    criterion.key,
                    0
                  );
                }
              }}
            />
          </View>
        </View>
      ))}
           <View
        style={[
          styles.resultBox,
          {
            backgroundColor:
              colors.primary,
          },
        ]}
      >
        <Text style={styles.resultLabel}>
          التقييم النهائي
        </Text>

        <Text style={styles.resultScore}>
          {finalScore !== null
            ? finalScore.toFixed(2)
            : '--'}
        </Text>
      </View>
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
  },

  name: {
    marginTop: 6,
    marginBottom: 10,
    fontSize: 14,
  },

  hint: {
    fontSize: 12,
    marginBottom: 18,
  },

  criterionContainer: {
    marginBottom: 18,
  },

  criterionLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },

  scoreContainer: {
    flexDirection: 'row-reverse',
  },

  scoreInput: {
    width: 100,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  resultBox: {
    marginTop: 8,
    padding: 14,
    borderRadius: 18,
    alignItems: 'center',
  },

  resultLabel: {
    color: '#fff',
    fontSize: 13,
  },

  resultScore: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
});