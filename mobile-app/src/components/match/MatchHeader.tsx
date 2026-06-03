import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  match: any;
  homeGoals: number;
  awayGoals: number;
};

export default function MatchHeader({
  match,
  homeGoals,
  awayGoals,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            colors.card,

          borderColor:
            colors.border,
        },
      ]}
    >
      {/* SCORE */}
      <View style={styles.scoreContainer}>
        <Text
          style={[
            styles.team,
            {
              color: colors.text,
            },
          ]}
        >
          {match.homeTeam}
        </Text>

        <View
          style={[
            styles.scoreBox,
            {
              backgroundColor:
                colors.highLight,
            },
          ]}
        >
          <Text
            style={[
              styles.score,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            {homeGoals} - {awayGoals}
          </Text>
        </View>

        <Text
          style={[
            styles.team,
            {
              color: colors.text,
            },
          ]}
        >
          {match.awayTeam}
        </Text>
      </View>

      {/* INFO */}
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.sub,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
           {match.stadium} -{' '}
          {match.city}
        </Text>

        <Text
          style={[
            styles.sub,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          {' '}
          {new Date(
            match.dateTime
          ).toLocaleString()}
        </Text>

        <Text
          style={[
            styles.sub,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
           {match.referee}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 18,
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

  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 18,
  },

  team: {
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },

  scoreBox: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    marginHorizontal: 12,
  },

  score: {
    fontSize: 24,
    fontWeight: '900',
  },

  infoContainer: {
    gap: 8,
  },

  sub: {
    fontSize: 14,
    lineHeight: 20,
  },
});