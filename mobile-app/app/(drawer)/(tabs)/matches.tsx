import { ScrollView,  StyleSheet,  Text, View,  TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { t } from '@/utils/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function Matches() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const matches = [
    {
      id: 1,
      teamA: 'الوحدة',
      teamB: 'الجيش',
      stadium: 'ملعب الفيحاء',
      date: 'الجمعة 10 نوفمبر',
      status: 'قريبًا',
    },
    {
      id: 2,
      teamA: 'الكرامة',
      teamB: 'تشرين',
      stadium: 'ملعب الباسل',
      date: 'الإثنين 13 نوفمبر',
      status: 'مؤكد',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          {t('matches')}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: colors.primary },
            ]}
          >
            {matches.length} مباراة
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textSecondary },
        ]}
      >
        {t('nextMatch')}
      </Text>

      {matches.length > 0 ? (
        matches.map((match) => (
          <TouchableOpacity
            key={match.id}
            activeOpacity={0.88}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() =>
              router.push('/match-details')
            }
          >
            {/* TEAMS */}
            <View style={styles.row}>
              <Text
                style={[
                  styles.team,
                  { color: colors.text },
                ]}
              >
                {match.teamA}
              </Text>

              <Text
                style={[
                  styles.vs,
                  {
                    color:
                      colors.textSecondary,
                  },
                ]}
              >
                VS
              </Text>

              <Text
                style={[
                  styles.team,
                  { color: colors.text },
                ]}
              >
                {match.teamB}
              </Text>
            </View>

            {/* MATCH INFO */}
            <Text
              style={[
                styles.meta,
                {
                  color:
                    colors.textSecondary,
                },
              ]}
            >
              📍 {match.stadium}
            </Text>

            <Text
              style={[
                styles.meta,
                {
                  color:
                    colors.textSecondary,
                },
              ]}
            >
              ⏰ {match.date}
            </Text>

            {/* FOOTER */}
            <View style={styles.footerRow}>
              <View
                style={[
                  styles.statusPill,
                  {
                    backgroundColor:
                      colors.backgroundSecondary,
                    borderColor:
                      colors.border, },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        colors.primary,
                    },
                  ]}
                >
                  {match.status}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.reportButton,
                  {
                    backgroundColor:
                      colors.successButton,
                  },
                ]}
                onPress={() =>
                  router.push({
                    pathname:
                      '/match-report',
                    params: {
                      matchId: match.id,
                    },
                  })
                }
              >
                <Text style={styles.reportText}>
                  📝 {t('MatchReport')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text
          style={[
            styles.empty,
            {
              color:
                colors.textSecondary,
            },
          ]}
        >
          لا توجد مباريات حالياً
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 30,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
  },

  badge: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
  },

  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },

  team: {
    fontSize: 19,
    fontWeight: '800',
  },

  vs: {
    fontSize: 13,
    fontWeight: '700',
  },

  meta: {
    fontSize: 14,
    marginTop: 5,
  },

  footerRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  reportButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  reportText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});