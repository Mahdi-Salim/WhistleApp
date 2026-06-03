 import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export default function MatchEvents({
  events,
  canWriteReport,
  reportSubmitted,
  setShowModal,
}: any) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const getEventColor = (
    type: string
  ) => {
    switch (type) {
      case 'goal':
        return colors.primary;

      case 'yellowCard':
        return colors.warning;

      case 'redCard':
        return colors.danger;

      default:
        return colors.primary;
    }
  };

  const getEventIcon = (
    type: string
  ) => {
    switch (type) {
      case 'goal':
        return '⚽️';

      case 'yellowCard':
        return '🟨';

      case 'redCard':
        return '🟥';

      default:
        return '📌';
    }
  };

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
      {/* TITLE */}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        الأحداث
      </Text>

      {/* ADD BUTTON */}
      <TouchableOpacity
        disabled={
          !canWriteReport ||
          reportSubmitted
        }
        style={[
          styles.addButton,
          {
            backgroundColor:
              canWriteReport &&
              !reportSubmitted
                ? colors.primary
                : colors.border,

            opacity:
              !canWriteReport ||
              reportSubmitted
                ? 0.6
                : 1,
          },
        ]}
        onPress={() =>
          setShowModal(true)
        }
      >
        <Text style={styles.addText}>
          ➕ إضافة حدث
        </Text>
      </TouchableOpacity>

      {/* EVENTS */}
      {events.map(
        (
          e: any,
          index: number
        ) => (
          <View
            key={index}
            style={
              styles.timelineRow
            }
          >
            {/* LEFT */}
            <View
              style={
                styles.timelineLeft
              }
            >
              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor:
                      getEventColor(
                        e.type
                      ),
                  },
                ]}
              >
                <Text
                  style={
                    styles.timelineIcon
                  }
                >
                  {getEventIcon(
                    e.type
                  )}
                </Text>
              </View>

              {index !==
                events.length -
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

            {/* CONTENT */}
            <View
              style={[
                styles.eventContent,
                {
                  backgroundColor:
                    colors.background,

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
                    styles.eventMinute,
                    {
                      color:
                        getEventColor(
                          e.type
                        ),
                    },
                  ]}
                >
                  {e.minute}
                </Text>
                 <Text
                  style={[
                    styles.eventPlayer,
                    {
                      color:
                        colors.text,
                    },
                  ]}
                >
                  {e.player}
                </Text>
              </View>

              <Text
                style={[
                  styles.eventTeam,
                  {
                    color:
                      colors.textSecondary,
                  },
                ]}
              >
                {e.team ===
                'home'
                  ? 'الفريق الأول'
                  : 'الفريق الثاني'}
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
    padding: 18,
    borderRadius: 22,
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

  sectionTitle: {
    marginBottom: 14,
    fontWeight: '800',
    fontSize: 18,
  },

  addButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 18,
  },

  addText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  timelineRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginTop: 14,
  },

  timelineLeft: {
    alignItems: 'center',
    marginLeft: 12,
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
    marginTop: 4,
  },

  eventContent: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },

  eventHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eventMinute: {
    fontWeight: '800',
    fontSize: 16,
  },

  eventPlayer: {
    fontWeight: '700',
    fontSize: 15,
  },

  eventTeam: {
    marginTop: 6,
    fontSize: 13,
  },
});