 import {  View,  Text, StyleSheet} from 'react-native';
import { Calendar, Clock3,  MapPin, User} from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  referee: string;
  assistant1: string;
  assistant2: string;
  fourthOfficial: string;
  assessor: string;
  isMyMatch?: boolean;
};

export default function MatchAssignmentCard({
  homeTeam,
  awayTeam,
  date,
  time,
  stadium,
  referee,
  assistant1,
  assistant2,
  fourthOfficial,
  assessor,
  isMyMatch = false,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            isMyMatch
              ? colors.highLight
              : colors.card,

          borderColor:
            isMyMatch
              ? colors.primary
              : colors.border,
        },
      ]}
    >
      {/* TOP */}
      <View style={styles.topRow}>
        <Text
          style={[
            styles.teams,
            {
              color: colors.text,
            },
          ]}
        >
          {homeTeam} × {awayTeam}
        </Text>

        {isMyMatch && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
          >
            <Text
              style={
                styles.badgeText
              }
            >
              مباراتك
            </Text>
          </View>
        )}
      </View>

      {/* INFO */}
      <View style={styles.infoRow}>
        <Calendar
          size={16}
          color={
            colors.textSecondary
          }
        />

        <Text
          style={[
            styles.infoText,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          {date}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Clock3
          size={16}
          color={
            colors.textSecondary
          }
        />

        <Text
          style={[
            styles.infoText,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          {time}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MapPin
          size={16}
          color={
            colors.textSecondary
          }
        />

        <Text
          style={[
            styles.infoText,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          {stadium}
        </Text>
      </View>

      {/* DIVIDER */}
      <View
        style={[
          styles.divider,
          {
            backgroundColor:
              colors.border,
          },
        ]}
      />

      {/* REFEREES */}
      <View style={styles.refereesSection}>
        <View style={styles.refRow}>
          <User
            size={15}
            color={colors.primary}
          />

          <Text
            style={[
              styles.refText,
              {
                color: colors.text,
              },
            ]}
          >
            حكم الساحة: {referee}
          </Text>
        </View>

        <View style={styles.refRow}>
          <User
            size={15}
            color={
              colors.textSecondary
            }
          />

          <Text
            style={[
              styles.refText,
              {
                color: colors.text,
              },
            ]}
          >
            المساعد الأول: {assistant1}
          </Text>
        </View>

        <View style={styles.refRow}>
          <User
            size={15}
            color={
              colors.textSecondary
            }
          />
[18/05/2026 12:19 AM] Mahdi Salim: <Text
            style={[
              styles.refText,
              {
                color: colors.text,
              },
            ]}
          >
            المساعد الثاني: {assistant2}
          </Text>
        </View>

        <View style={styles.refRow}>
          <User
            size={15}
            color={colors.primary}
          />

          <Text
            style={[
              styles.refText,
              {
                color: colors.text,
              },
            ]}
          >
            الحكم الرابع: {fourthOfficial}
          </Text>
        </View>

        <View style={styles.refRow}>
          <User
            size={15}
            color={colors.warning}
          />

          <Text
            style={[
              styles.refText,
              {
                color: colors.text,
              },
            ]}
          >
            مقيم الحكام: {assessor}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  teams: {
    fontSize: 19,
    fontWeight: '800',
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 14,
  },

  divider: {
    height: 1,
    marginVertical: 14,
  },

  refereesSection: {
    gap: 10,
  },

  refRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  refText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});