 import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  events: any[];
  setEvents: any;

  setShowModal: any;

  setEventType: any;
  setTeam: any;

  setPlayer: any;
  setPlayerOut: any;
  setPlayerIn: any;

  setMinute: any;

  setEditingIndex: any;
  setIsEditing: any;
};

export default function MatchTimeline({
  events,
  setEvents,

  setShowModal,

  setEventType,
  setTeam,

  setPlayer,
  setPlayerIn,
  setPlayerOut,

  setMinute,

  setEditingIndex,
  setIsEditing,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const sortedEvents = [...events].sort(
    (a, b) => a.minute - b.minute
  );

  const [selectedEvent, setSelectedEvent] =
    useState<any>(null);

  const [showActions, setShowActions] =
    useState(false);

  const getEventIcon = (type: string) => {
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

  const getEventColor = (type: string) => {
    switch (type) {
      case 'goal':
        return colors.success;

      case 'yellowCard':
        return '#fbbf24';

      case 'redCard':
        return colors.danger;

      case 'substitution':
        return '#3b82f6';

      default:
        return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        أحداث المباراة
      </Text>

      {sortedEvents.length === 0 && (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.empty,
              { color: colors.textSecondary },
            ]}
          >
            لا توجد أحداث حتى الآن
          </Text>
        </View>
      )}

      {sortedEvents.map((event, index) => (
        <TouchableOpacity
          key={index}
          style={styles.eventCard}
          activeOpacity={0.85}
          onLongPress={() => {
            setSelectedEvent({
              event,
              index,
            });

            setShowActions(true);
          }}
        >
          <View
            style={[
              styles.minuteBox,
              {
                backgroundColor: getEventColor(
                  event.type
                ),
              },
            ]}
          >
            <Text style={styles.minute}>
              {event.minute}
            </Text>
          </View>

          <View
            style={[
              styles.content,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.row}>
              <Text style={styles.icon}>
                {getEventIcon(event.type)}
              </Text>

              {event.type !==
              'substitution' ? (
                <Text
                  style={[
                    styles.player,
                    { color: colors.text },
                  ]}
                >
                  {event.player}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.player,
                    { color: colors.text },
                  ]}
                >
                  {event.playerOut}
                  {' ⬅️ '}
                  {event.playerIn}
                </Text>
              )}
            </View>
[18/05/2026 12:36 AM] Mahdi Salim: <Text
              style={[
                styles.teamText,
                {
                  color:
                    colors.textSecondary,
                },
              ]}
            >
              {event.team === 'home'
                ? 'الفريق الأول'
                : 'الفريق الثاني'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {showActions && (
        <BottomSheet
          index={0}
          snapPoints={['30%']}
          enablePanDownToClose
          onClose={() =>
            setShowActions(false)
          }
          backgroundStyle={{
            backgroundColor: colors.modal,
          }}
          handleIndicatorStyle={{
            backgroundColor:
              colors.textSecondary,
          }}
        >
          <View style={styles.actionsContainer}>
            {/* تعديل */}

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor:
                    colors.primary,
                },
              ]}
              onPress={() => {
                const current =
                  selectedEvent.event;

                setEventType(current.type);

                setTeam(current.team);

                setPlayer(
                  current.player || ''
                );

                setPlayerOut(
                  current.playerOut || ''
                );

                setPlayerIn(
                  current.playerIn || ''
                );

                setMinute(
                  String(current.minute)
                );

                setEditingIndex(
                  selectedEvent.index
                );

                setIsEditing(true);

                setShowModal(true);

                setShowActions(false);
              }}
            >
              <Text style={styles.actionText}>
                تعديل الحدث
              </Text>
            </TouchableOpacity>

            {/* حذف */}

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor:
                    colors.danger,
                },
              ]}
              onPress={() => {
                const filteredEvents =
                  events.filter(
                    (_: any, i: number) =>
                      i !==
                      selectedEvent.index
                  );

                setEvents(filteredEvents);

                setShowActions(false);
              }}
            >
              <Text style={styles.actionText}>
                حذف الحدث
              </Text>
            </TouchableOpacity>

            {/* إلغاء */}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                setShowActions(false)
              }
            >
              <Text
                style={[
                  styles.cancelText,
                  {
                    color:
                      colors.textSecondary,
                  },
                ]}
              >
                إلغاء
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },

  emptyCard: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
  },

  empty: {
    textAlign: 'center',
    fontSize: 14,
  },

  eventCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 14,
  },

  minuteBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  minute: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },

  content: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
    marginLeft: 12,
  },

  player: {
    fontWeight: '700',
    fontSize: 15,
  },

  teamText: {
    marginTop: 8,
    fontSize: 13,
  },

  actionsContainer: {
    padding: 20,
  },

  actionButton: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  cancelButton: {
    alignItems: 'center',
    marginTop: 6,
  },

  cancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
});