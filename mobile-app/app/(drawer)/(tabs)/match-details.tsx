import {  View,  Text,  StyleSheet,  ScrollView} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useMatch } from '@/context/MatchContext';
import { Colors } from '@/constants/theme';
import { t } from '@/utils/i18n';

export default function MatchDetails() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { match, events } = useMatch();
  const homeGoals = events.filter(e => e.type === 'goal' && e.team === 'home').length;
  const awayGoals = events.filter(e => e.type === 'goal' && e.team === 'away').length;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.teams,
            { color: colors.text },
          ]}
        >
          {match.homeTeam} {homeGoals} - {awayGoals} {match.awayTeam}
        </Text>

        <Text
          style={[
            styles.meta,
            { color: colors.textSecondary },
          ]}
        >
          📍 {match.stadium}
        </Text>

        <Text
          style={[
            styles.meta,
            { color: colors.textSecondary },
          ]}
        >
          ⏰ {match.date} {match.time}
        </Text>
      </View>

      {/* Rating */}
      <View
        style={[
          styles.ratingCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.ratingValue,
            { color: colors.text },
          ]}
        >
          {match.rating}
        </Text>

        <Text
          style={[
            styles.ratingLabel,
            { color: colors.textSecondary },
          ]}
        >
          / 10
        </Text>

        <Text
          style={[
            styles.status,
            { color: colors.success },
          ]}
        >
          {match.status}
        </Text>
      </View>

      {/* Evaluation */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          {t('DetailedEvaluation')}
        </Text>

        <View style={styles.evalRow}>
          <Text
            style={[
              styles.evalLabel,
              { color: colors.textSecondary },
            ]}>
            {t('decisions')}
          </Text>

          <Text
            style={[
              styles.evalValue,
              { color: colors.text },
            ]}
          >
            {match.evaluation.decisions}
          </Text>
        </View>

        <View style={styles.evalRow}>
          <Text
            style={[
              styles.evalLabel,
              { color: colors.textSecondary },
            ]}
          >
            {t('fitness')}
          </Text>

          <Text
            style={[
              styles.evalValue,
              { color: colors.text },
            ]}
          >
            {match.evaluation.fitness}
          </Text>
        </View>

        <View style={styles.evalRow}>
          <Text
            style={[
              styles.evalLabel,
              { color: colors.textSecondary },
            ]}
          >
            {t('positioning')}
          </Text>

          <Text
            style={[
              styles.evalValue,
              { color: colors.text },
            ]}
          >
            {match.evaluation.positioning}
          </Text>
        </View>
<View style={styles.evalRow}>
          <Text
            style={[
              styles.evalLabel,
              { color: colors.textSecondary },
            ]}
          >
            {t('control')}
          </Text>

          <Text
            style={[
              styles.evalValue,
              { color: colors.text },
            ]}
          >
            {match.evaluation.control}
          </Text>
        </View>
      </View>

      {/* Notes */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          {t('notes')}
        </Text>

        <Text
          style={[
            styles.notes,
            { color: colors.textSecondary },
          ]}
        >
          {match.notes}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    marginBottom: 20,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  teams: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  meta: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 4,
  },

  ratingCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  ratingValue: {
    fontSize: 44,
    fontWeight: '800',
  },

  ratingLabel: {
    fontSize: 16,
    marginTop: 4,
  },

  status: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
  },

  section: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 1,
  },

  sectionTitle: {
    fontWeight: '800',
    marginBottom: 16,
    fontSize: 18,
  },

  evalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  evalLabel: {
    fontSize: 15,
  },

  evalValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  notes: {
    lineHeight: 24,
    fontSize: 15,
  },
});