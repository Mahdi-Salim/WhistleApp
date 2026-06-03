import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

interface Scores {
  positioning: number;
  decisions: number;
  control: number;
  fitness: number;
}

interface Props {
  evaluations: {
    referee: Scores;
    assistant1: Scores;
    assistant2: Scores;
    fourthOfficial: Scores;
  };
}

export default function EvaluationSummaryCard({
  evaluations,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const calculateAverage = (
    scores: Scores
  ) => {
    const values = [
      scores.positioning,
      scores.decisions,
      scores.control,
      scores.fitness,
    ].filter((v) => v > 0);

    if (!values.length) return 0;

    return (
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length
    );
  };

  const refereeScore =
    calculateAverage(
      evaluations.referee
    );

  const assistant1Score =
    calculateAverage(
      evaluations.assistant1
    );

  const assistant2Score =
    calculateAverage(
      evaluations.assistant2
    );

  const fourthScore =
    calculateAverage(
      evaluations.fourthOfficial
    );

  const crewAverage =
    (
      refereeScore +
      assistant1Score +
      assistant2Score +
      fourthScore
    ) / 4;

  const rows = [
    {
      label: 'الحكم الرئيسي',
      value: refereeScore,
    },
    {
      label: 'المساعد الأول',
      value: assistant1Score,
    },
    {
      label: 'المساعد الثاني',
      value: assistant2Score,
    },
    {
      label: 'الحكم الرابع',
      value: fourthScore,
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
        ملخص التقييم
      </Text>

      {rows.map((row) => (
        <View
          key={row.label}
          style={styles.row}
        >
          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            {row.label}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: colors.primary,
              },
            ]}
          >
            {row.value
              ? row.value.toFixed(2)
              : '--'}
          </Text>
        </View>
      ))}

      <View
        style={[
          styles.divider,
          {
            backgroundColor:
              colors.border,
          },
        ]}
      />

      <View style={styles.row}>
        <Text
          style={[
            styles.finalLabel,
            {
              color: colors.text,
            },
          ]}
        >
          متوسط الطاقم
        </Text>

        <Text
          style={[
            styles.finalValue,
            {
              color: colors.primary,
            },
          ]}
        >
          {crewAverage
            ? crewAverage.toFixed(2)
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
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 15,
  },

  value: {
    fontSize: 15,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    marginVertical: 10,
  },

  finalLabel: {
    fontSize: 16,
    fontWeight: '800',
  },

  finalValue: {
    fontSize: 18,
    fontWeight: '800',
  },
});