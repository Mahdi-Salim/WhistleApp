 import {View, Text,  StyleSheet,  ScrollView,  TouchableOpacity, TextInput} from 'react-native';
import { useMemo, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';
import { useMatch } from '@/context/MatchContext';

export default function LineupsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<
    'all' | 'starters' | 'bench' | 'selected'
  >('all');
  const [selectedTeam, setSelectedTeam] = useState<
    'home' | 'away'
  >('home');
  const { lineups, setLineups, kits, setKits } = useMatch();
  const kitColors =[
    'أخضر',
    'أبيض',
    'أسود',
    'أحمر',
    'أزرق',
    'أصفر',
    'برتقالي',
  ];
  const teams = {
    home: 'الوحدة',
    away: 'الجيش',
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const players = [
    { id: 1, number: 1, name: 'أحمد علي' },
    { id: 2, number: 3, name: 'محمد حسن' },
    { id: 3, number: 5, name: 'خالد يوسف' },
    { id: 4, number: 7, name: 'سامر محمود' },
    { id: 5, number: 9, name: 'عمر مصطفى' },
    { id: 6, number: 10, name: 'يزن شريف' },
    { id: 7, number: 11, name: 'باسل إبراهيم' },
    { id: 8, number: 14, name: 'رامي سليمان' },
    { id: 9, number: 18, name: 'وسيم أحمد' },
    { id: 10, number: 21, name: 'أنس خليل' },
    { id: 11, number: 25, name: 'نور الدين' },
    { id: 12, number: 30, name: 'فراس حمزة' },
  ];
  const toggleStarter = (id: number) => {
    const playerName = players.find((p) => p.id === id)?.name || String(id);
    const currentTeam = lineups[selectedTeam];
    const starters = currentTeam.starters.includes(playerName)
      ? currentTeam.starters.filter((p) => p !== playerName)
      : [...currentTeam.starters, playerName];
    const bench = currentTeam.bench.filter((p) => p !== playerName);
    setLineups({
      ...lineups,
      [selectedTeam]: {
        starters,
        bench,
      },
    });
  };
  const toggleBench = (id: number) => {
    const playerName = players.find((p) => p.id === id)?.name || String(id);
    const currentTeam = lineups[selectedTeam];
    const bench = currentTeam.bench.includes(playerName)
      ? currentTeam.bench.filter((p) => p !== playerName)
      : [...currentTeam.bench, playerName];
    const starters = currentTeam.starters.filter((p) => p !== playerName);
    setLineups({
      ...lineups,
      [selectedTeam]: {
        starters,
        bench,
      },
    });
  };
  const updateKit = (
    section: 
    | 'shirt'
    | 'shorts'
    | 'socks',
    color: string,
    goalkeeper = false
  ) =>{
    if (! goalkeeper){
      setKits({
        ...kits,
        [selectedTeam]: {
          ...kits[selectedTeam],
          [section]: color,
        },
      });
      return;
    }
     setKits({
      ...kits,
      [selectedTeam]: {
        ...kits[selectedTeam],
        goalkeeper: {
          ...kits[selectedTeam].goalkeeper,
          [section]: color,
        },
      },
     });
  };
   const filteredPlayers = useMemo(() => {
    let filtered = players.filter(
      (player) =>
        player.name.includes(search) ||
        player.number.toString().includes(search)
    );
    if (filter === 'starters') {
      filtered = filtered.filter((p) =>
        lineups[selectedTeam].starters.includes(p.name)
      );
    }
    if (filter === 'bench') {
      filtered = filtered.filter((p) =>
        lineups[selectedTeam].bench.includes(p.name)
      );
    }
    if (filter === 'selected') {
      filtered = filtered.filter(
        (p) =>
          lineups[selectedTeam].starters.includes(
            p.name
          ) ||
          lineups[selectedTeam].bench.includes(
            p.name
          )
      );
    }
    filtered.sort((a, b) => {
      const aStarter =
        lineups[selectedTeam].starters.includes(
          a.name
        );
     const bStarter =
        lineups[selectedTeam].starters.includes(
          b.name
        );
      if (aStarter && !bStarter) return -1;
      if (!aStarter && bStarter) return 1;
      return a.number - b.number;
    });

   return filtered;
  }, [
    players,
    search,
    filter,
    lineups,
    selectedTeam,
  ]);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        قوائم الفريقين
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        اختر اللاعبين الأساسيين والاحتياط
      </Text>
      {/* Team Switcher */}
      <View style={styles.teamSwitcher}>
        <TouchableOpacity
          style={[
            styles.teamButton,
            {
              backgroundColor:
                selectedTeam === 'home'
                  ? colors.primary
                  : colors.card,

              borderColor: colors.border,
            },
          ]}
          onPress={() =>
            setSelectedTeam('home')
          }
        >
          <Text style={styles.teamButtonText}>
            {teams.home}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.teamButton,
            {
              backgroundColor:
                selectedTeam === 'away'
                  ? colors.primary
                  : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() =>
            setSelectedTeam('away')
          }
        >
          <Text style={styles.teamButtonText}>
            {teams.away}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        placeholder="ابحث بالاسم أو الرقم"
        placeholderTextColor={
          colors.textSecondary
        }
        value={search}
        onChangeText={setSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
      />

      {/* Filters */}
     <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.filtersContainer
        } >
        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === 'all' && {
              backgroundColor: colors.primary,
            },
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' &&
                styles.activeFilterText,
            ]}
          >
            الكل
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === 'starters' && {
              backgroundColor: colors.primary,
            },
          ]}
          onPress={() =>
            setFilter('starters')
          }
        >
          <Text
            style={[
              styles.filterText,
              filter === 'starters' &&
                styles.activeFilterText,
            ]}
          >
            الأساسيون
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === 'bench' && {
              backgroundColor: '#f59e0b',
            },
          ]}
          onPress={() => setFilter('bench')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'bench' &&
                styles.activeFilterText,
            ]}
          >
            الاحتياط
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === 'selected' && {
              backgroundColor: colors.primary,
            },
          ]}
          onPress={() =>
            setFilter('selected')
          }
        >
          <Text
            style={[
              styles.filterText,
              filter === 'selected' &&
                styles.activeFilterText,
            ]}
          >
            المختارون
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Stats */}
      <View
        style={[
          styles.statsCard,
          {
            backgroundColor: colors.card,
borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              {
                color: colors.primary,
              },
            ]}
          >
            {
              lineups[selectedTeam].starters
                .length
            }
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            أساسي
          </Text>
        </View>

        <View style={styles.statsDivider} />

        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              {
                color: '#f59e0b',
              },
            ]}
          >
            {
              lineups[selectedTeam].bench
                .length
            }
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            احتياط
          </Text>
        </View>
      </View> 
      {/* Kits Section */} 
<View
  style={[
    styles.kitsCard,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
  ]}
>
  <Text
    style={[
      styles.kitsTitle,
      {
        color: colors.text,
      },
    ]}
  >
    ألوان الزي الرسمي
  </Text>

  {/* Main Kit */}

  <Text
    style={[
      styles.kitSectionTitle,
      {
        color: colors.textSecondary,
      },
    ]}
  >
    زي اللاعبين
  </Text>

  <View style={styles.kitRow}>
    {[
      {
        key: 'shirt',
        label: 'القميص',
      },
      {
        key: 'shorts',
        label: 'الشورت',
      },
      {
        key: 'socks',
        label: 'الجوارب',
      },
    ].map((item) => (
      <View
        key={item.key}
        style={styles.kitColumn}
      >
        <Text
          style={[
            styles.kitLabel,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          {item.label}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {kitColors.map((color) => {
            const selected =
              kits[selectedTeam][
                item.key as
                  | 'shirt'
                  | 'shorts'
                  | 'socks'
              ] === color;

            return (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorChip,
                  {
                    backgroundColor:
                      selected
                        ? colors.primary
                        : colors.background,

                    borderColor:
                      selected
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() =>
                  updateKit(
                    item.key as
                      | 'shirt'
                      | 'shorts'
                      | 'socks',
                    color
                  )
                }
              >
                <Text
                  style={[
                    styles.colorChipText,
                    {
                      color: selected
                        ? '#fff'
                        : colors.text,
                    },
                  ]}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    ))}
  </View>

  {/* Goalkeeper Kit */}

  <Text
    style={[
      styles.kitSectionTitle,
      {
        color: colors.textSecondary,
        marginTop: 18,
      },
    ]}
  >
    زي الحارس
  </Text>

  <View style={styles.kitRow}>
    {[
      {
        key: 'shirt',
        label: 'القميص',
      },
      {
        key: 'shorts',
        label: 'الشورت',
      },
      {
        key: 'socks',
        label: 'الجوارب',
      },
    ].map((item) => (
      <View
        key={item.key}
        style={styles.kitColumn}
      >
        <Text
          style={[
            styles.kitLabel,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          {item.label}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {kitColors.map((color) => {
            const selected =
              kits[selectedTeam]
                .goalkeeper[
                item.key as
                  | 'shirt'
                  | 'shorts'
                  | 'socks'
              ] === color;

            return (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorChip,
                  {
                    backgroundColor:
                      selected
                        ? '#f59e0b'
                        : colors.background,
                        borderColor:
                      selected
                        ? '#f59e0b'
                        : colors.border,
                  },
                ]}
                onPress={() =>
                  updateKit(
                    item.key as
                      | 'shirt'
                      | 'shorts'
                      | 'socks',
                    color,
                    true
                  )
                }
              >
                <Text
                  style={[
                    styles.colorChipText,
                    {
                      color: selected
                        ? '#fff'
                        : colors.text,
                    },
                  ]}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    ))}
  </View>
</View>
      {/* Players */}

      {filteredPlayers.map((player) => {
        const isStarter =
          lineups[
            selectedTeam
          ].starters.includes(player.name);

        const isBench =
          lineups[
            selectedTeam
          ].bench.includes(player.name);

        return (
          <View
            key={player.id}
            style={[
              styles.playerCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },

              isStarter && {
                borderColor: colors.primary,
                backgroundColor:
                  theme === 'dark'
                    ? '#0f1f17'
                    : '#dcfce7',
              },
            ]}
          >
            <View style={styles.playerInfo}>
              <View
                style={[
                  styles.numberBox,
                  {
                    backgroundColor:
                      colors.primary,
                  },
                ]}
              >
                <Text style={styles.numberText}>
                  {player.number}
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.playerName,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {player.name}
                </Text>

                {isStarter && (
                  <Text
                    style={[
                      styles.playerStatus,
                      {
                        color: colors.primary,
                      },
                    ]}
                  >
                    أساسي
                  </Text>
                )}

                {isBench && (
                  <Text
                    style={[
                      styles.playerStatus,
                      {
                        color: '#f59e0b',
                      },
                    ]}
                  >
                    احتياط
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isStarter && {
                    backgroundColor:
                      colors.primary,
                  },
                ]}
                onPress={() =>
                  toggleStarter(player.id)
                }
              >
                <Text style={styles.actionText}>
                  أساسي
                </Text>
              </TouchableOpacity>
             <TouchableOpacity
                style={[
                  styles.actionButton,
                  isBench && {
                    backgroundColor:
                      '#f59e0b',
                  },
                ]}
                onPress={() =>
                  toggleBench(player.id)
                }
              >
                <Text style={styles.actionText}>
                  احتياط
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 22,
  },

  teamSwitcher: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginBottom: 20,
  },

  teamButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },

  teamButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  searchInput: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
    fontSize: 15,
  },

  filtersContainer: {
    paddingBottom: 16,
    gap: 10,
  },

  filterChip: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },

  filterText: {
    color: '#d1d5db',
    fontWeight: '700',
    fontSize: 14,
  },

  activeFilterText: {
    color: '#fff',
  },

  statsCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 18,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '800',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
  },

  statsDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },

  playerCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
  },

  playerInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  numberBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },

  numberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  playerName: {
    fontSize: 16,
    fontWeight: '700',
  },

  playerStatus: {
    marginTop: 4,
    fontWeight: '700',
    fontSize: 13,
  },

  buttonsRow: {
    flexDirection: 'row-reverse',
    marginTop: 18,
    gap: 10,
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  kitsCard: {
  borderWidth: 1,
  borderRadius: 24,
  padding: 18,
  marginBottom: 20,
},

kitsTitle: {
  fontSize: 18,
  fontWeight: '800',
  marginBottom: 18,
},

kitSectionTitle: {
  fontSize: 14,
  fontWeight: '700',
  marginBottom: 12,
},

kitRow: {
  gap: 14,
},

kitColumn: {
  marginBottom: 12,
},

kitLabel: {
  fontSize: 13,
  fontWeight: '600',
  marginBottom: 8,
},

colorChip: {
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 999,
  borderWidth: 1,
  marginLeft: 10,
},

colorChipText: {
  fontWeight: '700',
  fontSize: 13,
},
});