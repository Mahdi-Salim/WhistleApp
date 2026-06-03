 import {  View,  Text,  StyleSheet,} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';
import { t } from '@/utils/i18n';

type Props = {
  match: any;
  lineups: any;
  kits?: any;
};

export default function ReportLineups({
  match,
  lineups,
  kits,
}: Props) {

  const { theme } = useTheme();
  const colors = Colors[theme];

  const renderTeam = (
    teamKey: 'home' | 'away',
    teamName: string,
  ) => {

    const starters =
      lineups[teamKey]?.starters || [];

    const bench =
      lineups[teamKey]?.bench || [];

    const teamKits =
      kits?.[teamKey];

    return (

      <View
        style={[
          styles.teamCard,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
      >

        <Text
          style={[
            styles.teamName,
            {
              color: colors.text,
            },
          ]}
        >
          {teamName}
        </Text>

        {/* Kits */}

        {teamKits && (

          <View
            style={[
              styles.kitsContainer,
              {
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
              زي الفريق
            </Text>

            <View style={styles.kitsRow}>
              <KitItem
                label="القميص"
                value={teamKits.shirt}
                colors={colors}
              />

              <KitItem
                label="الشورت"
                value={teamKits.shorts}
                colors={colors}
              />

              <KitItem
                label="الجوارب"
                value={teamKits.socks}
                colors={colors}
              />
            </View>

            <Text
              style={[
                styles.goalkeeperTitle,
                {
                  color: colors.primary,
                },
              ]}
            >
              زي الحارس
            </Text>

            <View style={styles.kitsRow}>
              <KitItem
                label="القميص"
                value={
                  teamKits.goalkeeper?.shirt
                }
                colors={colors}
              />

              <KitItem
                label="الشورت"
                value={
                  teamKits.goalkeeper?.shorts
                }
                colors={colors}
              />

              <KitItem
                label="الجوارب"
                value={
                  teamKits.goalkeeper?.socks
                }
                colors={colors}
              />
            </View>

          </View>
        )}

        {/* Starters */}

        <Text
          style={[
            styles.sectionLabel,
            {
              color: colors.primary,
            },
          ]}
        >
          {t('starters')}
        </Text>

        {starters.map(
          (
            player: any,
            index: number,
          ) => (

            <Text
              key={index}
              style={[
                styles.playerText,
                {
                  color: colors.text,
                },
              ]}
            >
              • {player}
            </Text>
          )
        )}

        {/* Bench */}

        <Text
          style={[
            styles.sectionLabel,
            {
              color: '#f59e0b',
            },
          ]}
        >
          {t('bench')}
        </Text>

        {bench.map(
          (
            player: any,
            index: number,
          ) => (

            <Text
              key={index}
              style={[
                styles.playerText,
                {
                  color: colors.text,
                },
              ]}
            >
              • {player}
            </Text>
          )
        )}
 </View>
    );
  };

  return (

    <View>

      {renderTeam(
        'home',
        match.homeTeam,
      )}

      {renderTeam(
        'away',
        match.awayTeam,
      )}

    </View>
  );
}

function KitItem({
  label,
  value,
  colors,
}: any) {

  return (

    <View style={styles.kitItem}>

      <Text
        style={[
          styles.kitLabel,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.kitValue,
          {
            color: colors.text,
          },
        ]}
      >
        {value || '-'}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  teamCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },

  teamName: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 18,
    textAlign: 'center',
  },

  kitsContainer: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
  },

  kitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },

  goalkeeperTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 12,
    textAlign: 'center',
  },

  kitsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },

  kitItem: {
    flex: 1,
    alignItems: 'center',
  },

  kitLabel: {
    fontSize: 13,
    marginBottom: 6,
  },

  kitValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 8,
  },

  playerText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 22,
  },

});