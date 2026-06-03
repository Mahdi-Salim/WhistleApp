 import { View,  Text,  StyleSheet,  ScrollView, TouchableOpacity,  TextInput,} from 'react-native';
import { useState } from 'react';
import MatchHeader from '@/components/match/MatchHeader';
import MatchEvents from '@/components/match/MatchEvents';
import AddEventModal from '@/components/match/AddEventModal';
import MatchTimeline from '@/components/match/MatchTimeLine';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useMatch } from '@/context/MatchContext';

export default function MatchReport() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { match, setMatch, events, setEvents, notes, setNotes } = useMatch();
  const [editingindex, setEditingIndex] =
    useState<number | null>(null);
  const [isEditing, setIsEditing] =
    useState(false);
  const [showModal, setShowModal] =
    useState(false);
  const [eventType, setEventType] = useState<
    'goal' | 'yellowCard' | 'redCard' | 'substitution'
  >('goal');
  const [team, setTeam] =
    useState<'home' | 'away'>('home');
  const [player, setPlayer] = useState('');
  const [playerOut, setPlayerOut] =
    useState('');
  const [playerIn, setPlayerIn] =
    useState('');
  const [minute, setMinute] =
    useState('');
  const players = {
    home: [
      {
        id: 1,
        number: 9,
        name: 'لاعب الوحدة 1',
        status: 'onField',
      },
      {
        id: 2,
        number: 10,
        name: 'لاعب الوحدة 2',
        status: 'onField',
      },
      {
        id: 3,
        number: 18,
        name: 'لاعب الوحدة 3',
        status: 'bench',
      },
    ],

    away: [
      {
        id: 4,
        number: 7,
        name: 'لاعب الجيش 1',
        status: 'onField',
      },
      {
        id: 5,
        number: 11,
        name: 'لاعب الجيش 2',
        status: 'onField',
      },
      {
        id: 6,
        number: 22,
        name: 'لاعب الجيش 3',
        status: 'bench',
      },
    ],
  };

  const getAvailablePlayers = () => {
    const teamPlayers = players[team];

    if (eventType === 'goal') {
      return teamPlayers.filter(
        (p) => p.status === 'onField'
      );
    }

    if (
      eventType === 'yellowCard' ||
      eventType === 'redCard'
    ) {
      return teamPlayers.filter(
        (p) => p.status !== 'substituted_out'
      );
    }

    return teamPlayers;
  };

  const homeGoals = events.filter(
    (e) =>
      e.type === 'goal' &&
      e.team === 'home'
  ).length;

  const awayGoals = events.filter(
    (e) =>
      e.type === 'goal' &&
      e.team === 'away'
  ).length;

  const matchStart = new Date(
    match.dateTime
  );

  const now = new Date();

  const diffMinutes =
    (now.getTime() -
      matchStart.getTime()) /
    (1000 * 60);

  const canWriteReport =
    diffMinutes >= 90;
  const reportSubmitted = match.reportSubmitted;

  const handleSubmit = () => {
    setMatch({ reportSubmitted: true });
  };

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor:
              colors.background,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <MatchHeader
          match={match}
          homeGoals={homeGoals}
          awayGoals={awayGoals}
        />

        {/* STATUS */}

        <View
          style={[
            styles.statusBox,
            {
              backgroundColor:
 colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >
          {!canWriteReport && (
            <Text
              style={[
                styles.warning,
                {
                  color:
                    colors.warning,
                },
              ]}
            >
              لا يمكنك كتابة التقرير قبل
              انتهاء المباراة 
            </Text>
          )}

          {canWriteReport &&
            !reportSubmitted && (
              <Text
                style={[
                  styles.success,
                  {
                    color:
                      colors.success,
                  },
                ]}
              >
                يمكنك الآن كتابة التقرير
              </Text>
            )}

          {reportSubmitted && (
            <Text
              style={[
                styles.locked,
                {
                  color:
                    colors.danger,
                },
              ]}
            >
              تم إرسال التقرير ✔️
            </Text>
          )}
        </View>

        {/* EVENTS */}

        <MatchEvents
          events={events}
          canWriteReport={canWriteReport}
          reportSubmitted={
            reportSubmitted
          }
          setShowModal={setShowModal}
        />

        {/* TIMELINE */}

        <MatchTimeline
          events={events}
          setEvents={setEvents}
          setShowModal={setShowModal}
          setEventType={setEventType}
          setTeam={setTeam}
          setPlayer={setPlayer}
          setPlayerIn={setPlayerIn}
          setPlayerOut={setPlayerOut}
          setMinute={setMinute}
          setEditingIndex={
            setEditingIndex
          }
          setIsEditing={setIsEditing}
        />

        {/* NOTES */}

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
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
              },
            ]}
          >
            ملاحظات الحكم
          </Text>

          <TextInput
            placeholder="اكتب ملاحظاتك هنا..."
            placeholderTextColor={
              colors.textSecondary
            }
            multiline
            value={notes}
            onChangeText={setNotes}
            editable={!reportSubmitted}
            style={[
              styles.input,
              {
                backgroundColor:
                  colors.inputBackground,
                color: colors.text,
              },
            ]}
          />
        </View>

        {/* SUBMIT */}

        <TouchableOpacity
          disabled={
            !canWriteReport ||
            reportSubmitted
          }
          onPress={handleSubmit}
          style={[
            styles.button,
            {
              backgroundColor:
                colors.primary,
            },

            (!canWriteReport ||
              reportSubmitted) &&
              styles.disabledButton,
          ]}
        >
          <Text
            style={styles.buttonText}
          >
            {reportSubmitted
              ? 'تم الإرسال'
              : 'إرسال التقرير'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL */}

      <AddEventModal
        showModal={showModal}
        setShowModal={setShowModal}
        eventType={eventType}
        setEventType={setEventType}
        team={team}
        setTeam={setTeam}
        player={player}
        setPlayer={setPlayer}
        playerOut={playerOut}
        setPlayerOut={setPlayerOut}
        playerIn={playerIn}
        setPlayerIn={setPlayerIn}
        minute={minute}
        setMinute={setMinute}
        events={events}
        setEvents={setEvents}
        getAvailablePlayers={
          getAvailablePlayers
        }
        match={match}
        editingindex={editingindex}
        setEditingIndex={
          setEditingIndex
        }
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    padding: 18,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
  },

  statusBox: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
  },

  warning: {
    textAlign: 'center',
    fontWeight: '700',
  },

  success: {
    textAlign: 'center',
    fontWeight: '700',
  },

  locked: {
    textAlign: 'center',
    fontWeight: '700',
  },

  sectionTitle: {
    marginBottom: 12,
    fontWeight: '800',
    fontSize: 17,
  },

  input: {
    padding: 16,
    borderRadius: 18,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 15,
  },

  button: {
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 40,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});