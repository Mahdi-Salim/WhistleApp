import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { useState } from 'react';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

type Props = {
  getAvailablePlayers: any;
  player: string;
  setPlayer: any;
};

export default function PlayerSelector({
  getAvailablePlayers,
  player,
  setPlayer,
}: Props) {
  const [search, setSearch] = useState('');

  const { theme } = useTheme();
  const colors = Colors[theme];

  const filteredPlayers = getAvailablePlayers().filter((p: any) =>
    p.number?.toString().includes(search)
  );

  return (
    <View>
      <TextInput
        placeholder="أدخل رقم اللاعب"
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

      <ScrollView
        style={styles.playersContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredPlayers.map((p: any) => {
          const isSelected = player === p.name;

          return (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.85}
              style={[
                styles.playerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
                isSelected && {
                  borderColor: colors.primary,
                  backgroundColor: colors.primary + '20',
                },
              ]}
              onPress={() => setPlayer(p.name)}
            >
              <View style={styles.playerRow}>
                <View
                  style={[
                    styles.numberBadge,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.backgroundSecondary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.numberText,
                      {
                        color: isSelected
                          ? '#fff'
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    #{p.number}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.playerText,
                    {
                      color: isSelected
                        ? colors.primary
                        : colors.text,
                    },
                  ]}
                >
                  {p.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredPlayers.length === 0 && (
          <View
            style={[
              styles.emptyBox,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.emptyText,
                { color: colors.textSecondary },
              ]}
            >
              لا يوجد لاعب بهذا الرقم
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  playersContainer: {
    maxHeight: 220,
    marginBottom: 18,
  },

  searchInput: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    fontSize: 15,
    borderWidth: 1,
    textAlign: 'right',
  },

  playerCard: {
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
  },

  playerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
 numberBadge: {
    minWidth: 58,
    height: 34,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    paddingHorizontal: 10,
  },

  numberText: {
    fontSize: 13,
    fontWeight: '700',
  },

  playerText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
  },

  emptyBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 14,
    fontWeight: '600',
  },
});