 import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import BottomSheet, {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { useMemo, useRef } from 'react';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

import PlayerSelector from './PlayerSelector';

type Props = {
  showModal: boolean;
  setShowModal: any;

  eventType: any;
  setEventType: any;

  team: any;
  setTeam: any;

  player: string;
  setPlayer: any;

  playerOut: string;
  setPlayerOut: any;

  playerIn: string;
  setPlayerIn: any;

  minute: string;
  setMinute: any;

  getAvailablePlayers: any;

  match: any;

  events: any[];
  setEvents: any;

  editingindex: number | null;
  setEditingIndex: any;

  isEditing: boolean;
  setIsEditing: any;
};

export default function AddEventModal({
  showModal,
  setShowModal,

  eventType,
  setEventType,

  team,
  setTeam,

  player,
  setPlayer,

  playerOut,
  setPlayerOut,

  playerIn,
  setPlayerIn,

  minute,
  setMinute,

  getAvailablePlayers,

  match,

  events,
  setEvents,

  editingindex,
  setEditingIndex,

  isEditing,
  setIsEditing,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['85%'], []);

  return (
    <>
      {showModal && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => setShowModal(false)}
          backgroundStyle={{
            backgroundColor: colors.modal,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.textSecondary,
          }}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* نوع الحدث */}

            <Text
              style={[
                styles.modalTitle,
                { color: colors.text },
              ]}
            >
              نوع الحدث
            </Text>

            <View style={styles.eventTypeGrid}>
              <TouchableOpacity
                style={[
                  styles.eventTypeCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                  eventType === 'goal' && {
                    backgroundColor: colors.successLight,
                    borderColor: colors.success,
                  },
                ]}
                onPress={() => setEventType('goal')}
              >
                <Text style={styles.eventEmoji}>⚽️</Text>

                <Text
                  style={[
                    styles.eventLabel,
                    { color: colors.text },
                  ]}
                >
                  هدف
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.eventTypeCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                  eventType === 'yellowCard' && {
                    backgroundColor: 'rgba(251,191,36,0.15)',
                    borderColor: '#fbbf24',
                  },
                ]}
                onPress={() => setEventType('yellowCard')}
              >
                <Text style={styles.eventEmoji}>🟨</Text>

                <Text
                  style={[
                    styles.eventLabel,
                    { color: colors.text },
                  ]}
                >
                  إنذار
                </Text>
              </TouchableOpacity>
           <TouchableOpacity
                style={[
                  styles.eventTypeCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                  eventType === 'redCard' && {
                    backgroundColor: colors.dangerLight,
                    borderColor: colors.danger,
                  },
                ]}
                onPress={() => setEventType('redCard')}
              >
                <Text style={styles.eventEmoji}>🟥</Text>

                <Text
                  style={[
                    styles.eventLabel,
                    { color: colors.text },
                  ]}
                >
                  طرد
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.eventTypeCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                  eventType === 'substitution' && {
                    backgroundColor: colors.successLight,
                    borderColor: colors.success,
                  },
                ]}
                onPress={() =>
                  setEventType('substitution')
                }
              >
                <Text style={styles.eventEmoji}>🔄</Text>

                <Text
                  style={[
                    styles.eventLabel,
                    { color: colors.text },
                  ]}
                >
                  تبديل
                </Text>
              </TouchableOpacity>
            </View>

            {/* الفريق */}

            <Text
              style={[
                styles.modalTitle,
                { color: colors.text },
              ]}
            >
              الفريق
            </Text>

            <View
              style={[
                styles.segmentContainer,
                {
                  backgroundColor: colors.cardSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  team === 'home' && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setTeam('home')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color:
                        team === 'home'
                          ? '#fff'
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {match.homeTeam}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  team === 'away' && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setTeam('away')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color:
                        team === 'away'
                          ? '#fff'
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {match.awayTeam}
                </Text>
              </TouchableOpacity>
            </View>

            {/* اللاعبين */}

            {eventType !== 'substitution' ? (
              <>
                <Text
                  style={[
                    styles.modalTitle,
                    { color: colors.text },
                  ]}
                >
                  اللاعب
                </Text>
[18/05/2026 12:33 AM] Mahdi Salim: <PlayerSelector
                  getAvailablePlayers={
                    getAvailablePlayers
                  }
                  player={player}
                  setPlayer={setPlayer}
                />
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.modalTitle,
                    { color: colors.text },
                  ]}
                >
                  اللاعب الخارج
                </Text>

                <PlayerSelector
                  getAvailablePlayers={() =>
                    getAvailablePlayers().filter(
                      (p: any) =>
                        p.status === 'onField'
                    )
                  }
                  player={playerOut}
                  setPlayer={setPlayerOut}
                />

                <Text
                  style={[
                    styles.modalTitle,
                    { color: colors.text },
                  ]}
                >
                  اللاعب الداخل
                </Text>

                <PlayerSelector
                  getAvailablePlayers={() =>
                    getAvailablePlayers().filter(
                      (p: any) =>
                        p.status === 'bench'
                    )
                  }
                  player={playerIn}
                  setPlayer={setPlayerIn}
                />
              </>
            )}

            {/* الدقيقة */}

            <Text
              style={[
                styles.modalTitle,
                { color: colors.text },
              ]}
            >
              الدقيقة
            </Text>

            <TextInput
              placeholder="مثال: 45"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={minute}
              onChangeText={setMinute}
              style={[
                styles.minuteInput,
                {
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
            />

            {/* حفظ */}

            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => {
                const newEvent = {
                  type: eventType,
                  team,

                  player:
                    eventType === 'substitution'
                      ? null
                      : player,

                  playerOut:
                    eventType === 'substitution'
                      ? playerOut
                      : null,

                  playerIn:
                    eventType === 'substitution'
                      ? playerIn
                      : null,

                  minute: Number(minute),
                };

                if (
                  isEditing &&
                  editingindex !== null
                ) {
                  const updatedEvents = [...events];

                  updatedEvents[editingindex] =
                    newEvent;

                  setEvents(updatedEvents);
                } else {
                  setEvents([
                    ...events,
                    newEvent,
                  ]);
                }

                setShowModal(false);

                setPlayer('');
                setPlayerOut('');
                setPlayerIn('');
                setMinute('');

                setIsEditing(false);
                setEditingIndex(null);
              }}
            >
              <Text style={styles.saveButtonText}>
                {isEditing
                  ? 'حفظ التعديلات'
                  : 'حفظ الحدث'}
              </Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </>
  );
}
 const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    paddingBottom: 60,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 18,
  },

  eventTypeGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  eventTypeCard: {
    width: '48%',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },

  eventEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },

  eventLabel: {
    fontWeight: '700',
    fontSize: 15,
  },

  segmentContainer: {
    flexDirection: 'row-reverse',
    borderRadius: 18,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
  },

  segmentButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  segmentText: {
    fontWeight: '700',
    fontSize: 15,
  },

  minuteInput: {
    padding: 14,
    borderRadius: 16,
    fontSize: 15,
    marginTop: 4,
    borderWidth: 1,
  },

  saveButton: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});