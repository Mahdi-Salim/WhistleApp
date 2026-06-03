import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

import { t } from '@/utils/i18n';

type Props = {
  events: any[];
  match: any;
};

export default function ReportEvents({
  events,
  match,
}: Props) {

  const { theme } = useTheme();
  const colors = Colors[theme];

  const sortedEvents = [...events].sort(
    (a, b) => a.minute - b.minute
  );

  const getEventIcon = (
    type: string,
  ) => {

    switch (type) {

      case 'goal':
        return '⚽️';

      case 'yellowCard':
        return '🟨';

      case 'redCard':
        return '🟥';

      case 'substitution':
        return '🔄';

      default:
        return '•';
    }
  };

  const getEventTitle = (
    event: any,
  ) => {

    if (
      event.type === 'substitution'
    ) {

      return `${event.playerOut} ⬅️ ${event.playerIn}`;
    }

    return event.player;
  };

  const getTeamName = (
    team: 'home' | 'away',
  ) => {

    return team === 'home'
      ? match.homeTeam
      : match.awayTeam;
  };

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
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {t('matchEvents')}
      </Text>

      {sortedEvents.length === 0 && (

        <Text
          style={[
            styles.emptyText,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          لا توجد أحداث
        </Text>
      )}

      {sortedEvents.map(
        (event, index) => (

          <View
            key={index}
            style={styles.timelineRow}
          >

            {/* Timeline */}

            <View
              style={
                styles.timelineSide
              }
            >

              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor:
                      colors.primary,
                  },
                ]}
              >

                <Text
                  style={
                    styles.timelineIcon
                  }
                >
                  {getEventIcon(
                    event.type
                  )}
                </Text>

              </View>

              {index !==
                sortedEvents.length -
                  1 && (

                <View
                  style={[
                    styles.timelineLine,
                    {
                      backgroundColor:
                        colors.border,
                    },
                  ]}
                />
              )}

            </View>

            {/* Content */}

            <View
              style={[
                styles.eventCard,
                {
                  backgroundColor:
                    theme === 'dark'
                      ? '#0b0f14'
                      : '#f3f4f6',

                  borderColor:
                    colors.border,
                },
              ]}
            >

              <View
                style={
                  styles.eventHeader
                }
              >

                <Text
                  style={[
                    styles.minute,
                    {
                      color:
                        colors.primary,
                    },
                  ]}
                >
                  {event.minute}
                </Text>

                <Text
                  style={[
                    styles.playerName,
                    {
                      color:
                        colors.text,
                    },
                  ]}
                >
                  {getEventTitle(
                    event
                  )}
                </Text>

              </View>
 <Text
                style={[
                  styles.teamText,
                  {
                    color:
                      colors
                        .textSecondary,
                  },
                ]}
              >
                {getTeamName(
                  event.team
                )}
              </Text>

            </View>

          </View>
        )
      )}

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

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },

  timelineRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  timelineSide: {
    alignItems: 'center',
    marginLeft: 14,
  },

  timelineDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timelineIcon: {
    fontSize: 18,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 50,
    marginTop: 4,
  },

  eventCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },

  eventHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  minute: {
    fontSize: 15,
    fontWeight: '800',
  },

  playerName: {
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },

  teamText: {
    marginTop: 8,
    fontSize: 13,
  },

});