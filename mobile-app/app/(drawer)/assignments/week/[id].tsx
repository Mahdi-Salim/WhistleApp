 import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

import MatchAssignmentCard from '@/components/assignments/MatchAssignmentCard';

export default function WeekAssignmentsScreen() {
  const { id } = useLocalSearchParams();

  const { theme } = useTheme();
  const colors = Colors[theme];

  const matches = [
    {
      id: 1,
      homeTeam: 'الوحدة',
      awayTeam: 'الجيش',
      date: 'الجمعة 8 سبتمبر',
      time: '8:00 pm',
      stadium: 'ملعب الفيحاء',
      referee: 'مهدي سليم',
      assistant1: 'خالد علي',
      assistant2: 'محمد حسن',
      fourthOfficial: 'سامر يوسف',
      assessor: 'أحمد علي',
      isMyMatch: true,
    },

    {
      id: 2,
      homeTeam: 'الكرامة',
      awayTeam: 'تشرين',
      date: 'السبت 9 سبتمبر',
      time: '6:00 pm',
      stadium: 'ملعب الباسل',
      referee: 'مهدي سليم',
      assistant1: 'خالد علي',
      assistant2: 'محمد حسن',
      fourthOfficial: 'سامر يوسف',
      assessor: 'أحمد علي',
      isMyMatch: false,
    },

    {
      id: 3,
      homeTeam: 'حطين',
      awayTeam: 'الوثبة',
      date: 'الأحد 10 سبتمبر',
      time: '5:30 pm',
      stadium: 'ملعب الحمدانية',
      referee: 'مهدي سليم',
      assistant1: 'خالد علي',
      assistant2: 'محمد حسن',
      fourthOfficial: 'سامر يوسف',
      assessor: 'أحمد علي',
      isMyMatch: false,
    },
  ];

  const myMatches = matches.filter(
    (match) => match.isMyMatch
  ).length;

  return (
    <ScrollView
      style={[
        Styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
      contentContainerStyle={
        Styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
      <View style={Styles.header}>
        <Text
          style={[
            Styles.heading,
            {
              color: colors.text,
            },
          ]}
        >
          تعيينات الأسبوع {id}
        </Text>

        <Text
          style={[
            Styles.subHeading,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          جدول المباريات والتكليفات
        </Text>
      </View>

      {/* SUMMARY CARD */}
      <View
        style={[
          Styles.summaryCard,
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
              Styles.summaryLabel,
              {
                color:
                  colors.textSecondary,
              },
            ]}
          >
            عدد المباريات
          </Text>

          <Text
            style={[
              Styles.summaryValue,
              {
                color: colors.text,
              },
            ]}
          >
            {matches.length}
          </Text>
        </View>

        <View
          style={[
            Styles.myMatchBadge,
            {
              backgroundColor:
                colors.highLight,
            },
          ]}
        >
          <Text
            style={[
              Styles.myMatchText,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            لديك {myMatches} مباراة
          </Text>
        </View>
      </View>

      {/* MATCHES */}
      <View style={Styles.matchesList}>
        {matches.map((match) => (
          <MatchAssignmentCard
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            date={match.date}
            time={match.time}
            stadium={match.stadium}
            referee={match.referee}
            assistant1={match.assistant1}
            assistant2={match.assistant2}
            fourthOfficial={
              match.fourthOfficial
            }
            assessor={match.assessor}
            isMyMatch={match.isMyMatch}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
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
    marginBottom: 22,

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
    fontSize: 28,
    fontWeight: '800',
  },

  myMatchBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },

  myMatchText: {
    fontSize: 13,
    fontWeight: '700',
  },

  matchesList: {
    marginTop: 4,
  },
});