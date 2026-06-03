 import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

import WeekCard from '@/components/assignments/WeekCard';

export default function AssignmentsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const weeks = [
    {
      id: 1,
      title: 'الأسبوع الأول',
      date: '1 - 7 July',
      matchesCount: 12,
    },

    {
      id: 2,
      title: 'الأسبوع الثاني',
      date: '8 - 14 July',
      matchesCount: 10,
    },

    {
      id: 3,
      title: 'الأسبوع الثالث',
      date: '15 - 21 July',
      matchesCount: 14,
    },

    {
      id: 4,
      title: 'الأسبوع الرابع',
      date: '22 - 28 July',
      matchesCount: 9,
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text
          style={[
            styles.heading,
            {
              color: colors.text,
            },
          ]}
        >
          التعيينات
        </Text>

        <Text
          style={[
            styles.subHeading,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          اختر الأسبوع لعرض جدول
          التعيينات والمباريات
        </Text>
      </View>

      {/* SUMMARY */}
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.summaryLabel,
              {
                color:
                  colors.textSecondary,
              },
            ]}
          >
            عدد الأسابيع
          </Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: colors.text,
              },
            ]}
          >
            {weeks.length}
          </Text>
        </View>

        <View
          style={[
            styles.matchesBadge,
            {
              backgroundColor:
                colors.highLight,
            },
          ]}
        >
          <Text
            style={[
              styles.matchesBadgeText,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            مجموع المباريات{' '}
            {weeks.reduce(
              (
                total,
                week
              ) =>
                total +
                week.matchesCount,
              0
            )}
          </Text>
        </View>
      </View>

      {/* LIST */}
      <View style={styles.list}>
        {weeks.map((week) => (
          <WeekCard
            key={week.id}
            title={week.title}
            date={week.date}
            matchesCount={
              week.matchesCount
            }
            onPress={() =>
              router.push({
                pathname:
                  '/(drawer)/assignments/week/[id]',
                params: {
                  id: week.id,
                },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 22,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
  },

  subHeading: {
    fontSize: 15,
    lineHeight: 22,
  },

  summaryCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,

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

  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 30,
    fontWeight: '800',
  },

  matchesBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },

  matchesBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },

  list: {
    marginTop: 6,
  },
});