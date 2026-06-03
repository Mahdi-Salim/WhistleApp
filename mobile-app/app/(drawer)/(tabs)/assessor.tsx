import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/utils/i18n';


export default function Assessor() {
  const router = useRouter();
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const colors = Colors[theme];
  const isArabic = lang === 'ar';
  const stats = [
    {
      value: '18',
      label: isArabic
      ? 'المباريات'
      : 'matches',
    },
    {
      value: '12',
      label: isArabic
      ? 'التقارير المرسلة'
      : 'submitted Reports',
    },
    {
      value: '2025/26',
      label: isArabic
      ? 'الموسم'
      : 'Season',
    },
  ];
  const actions = [
    {
      title: isArabic
        ? 'تقييم مباراة'
        : 'Evaluate Match',
      icon: 'clipboard-check-outline',
      color: colors.primary,
      route: '/match-review' as const,
    },

    {
      title: t('assignments'),
      icon: 'calendar-clock-outline',
      color: colors.secondary,
      route: '/assignments' as const,
    },

    {
      title: isArabic
        ? 'قوانين اللعبة'
        : 'Laws of the Game',
      icon: 'book-open-page-variant-outline',
      color: colors.gold,
      route: '/laws' as const,
    },

    {
      title: t('profile'),
      icon: 'account-outline',
      color: colors.purple,
      route: '/profile' as const,
    },
  ];
  const updates = [
    {
      title: isArabic
        ? 'تم تكليفك بمباراة جديدة'
        : 'New assignment received',
      time: isArabic
        ? 'الآن'
        : 'Now',
      icon: 'clipboard-text-clock-outline',
      color: colors.primary,
    },

    {
      title: isArabic
        ? 'تم اعتماد آخر تقييم'
        : 'Latest evaluation approved',
      time: isArabic
        ? 'بانتظار المراجعة'
        : 'Pending review',
      icon: 'file-document-check-outline',
      color: colors.gold,
    },
  ];

  return (
    <ScrollView
    style={[
      styles.container,
      {
        backgroundColor: colors.background,
      },
    ]}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}>
    <View
        style={[
          styles.heroCard,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <MaterialCommunityIcons
        name="clipboard-account-outline"
        size={34}
        color={colors.heroText}/>
        <Text
          style={[
            styles.heroTitle,
            {
              color: colors.heroText,
              textAlign: isArabic ? 'right' : 'left',
            },
          ]}
        >
          {t('assessorWelcome')}
        </Text>

        <Text
          style={[
            styles.heroSubtitle,
            {
              color: colors.heroSubText,
              textAlign: isArabic ? 'right' : 'left',
            },
          ]}
        >
          {t('assessorHeroSubtitle')}
        </Text>

        <Text
          style={[
            styles.heroSeason,
            {
              color: colors.heroMuted,
              textAlign: isArabic ? 'right' : 'left',
            },
          ]}
        >
          {isArabic
            ? 'موسم 2025 / 2026'
            : 'Season 2025 / 2026'}
        </Text>

        <View style={styles.heroStats}>
          {stats.map((item) => (
            <View
              key={item.label}
              style={styles.statBox}
            >
              <Text
                style={[
                  styles.statNumber,
                  {
                    color: colors.heroText,
                  },
                ]}
              >
                {item.value}
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  {
                    color: colors.heroMuted,
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
            textAlign: isArabic ? 'right' : 'left',
          },
        ]}
      >
        {isArabic
          ? 'الوصول السريع'
          : 'Quick Access'}
      </Text>

      <View style={styles.actionsContainer}>
        {actions.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.text,
              },
            ]}
            onPress={() => router.push(item.route)}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={28}
              color={item.color}
            />

            <Text
              style={[
                styles.cardText,
                {
                  color: colors.text,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
            textAlign: isArabic ? 'right' : 'left',
          },
        ]}
      >
        {isArabic
          ? 'التكليف القادم'
          : 'Upcoming Assignment'}
      </Text>

      <View
        style={[
          styles.matchCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.teams,
            {
              color: colors.text,
            },
          ]}
        >
          {isArabic
            ? 'الوحدة VS الجيش'
            : 'Al Wehda VS Al Jaish'}
        </Text>

        <Text
          style={[
            styles.matchInfo,
            {
              color: colors.textSecondary,
              textAlign: isArabic ? 'right' : 'left',
            },
          ]}
        >
          📍 {isArabic ? 'ملعب الفيحاء' : 'Al Fayhaa Stadium'}
        </Text>

        <Text
          style={[
            styles.matchInfo,
            {
              color: colors.textSecondary,
              textAlign: isArabic ? 'right' : 'left',
            },
          ]}
        >
          🕒 {isArabic ? '20 سبتمبر 2026' : 'Sep 20, 2026'}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              flexDirection: isArabic
                ? 'row-reverse'
                : 'row',
            },
          ]}
          onPress={() =>
            router.push('/match-review')
          }
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: colors.heroText,
              },
            ]}
          >
            {isArabic
              ? 'فتح المباراة'
              : 'Open Match'}
          </Text>

          <MaterialCommunityIcons
          name="arrow-left"
          size={18}
          color={colors.heroText}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
            textAlign: isArabic ? 'right' : 'left',
          },
        ]}
      >
        {isArabic
          ? 'التقييمات المطلوبة'
          : 'Pending Evaluations'}
      </Text>

      <View
        style={[
          styles.pendingCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.pendingRow}>
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={22}
            color={colors.gold}
          />

          <Text
            style={[
              styles.pendingText,
              {
                color: colors.text,
              },
            ]}
          >
            {isArabic
              ? 'الوحدة × الجيش'
              : 'Al Wehda × Al Jaish'}
          </Text>
        </View>

        <View style={styles.pendingRow}>
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={22}
            color={colors.gold}
          />

          <Text
            style={[
              styles.pendingText,
              {
                color: colors.text,
              },
            ]}
          >
            {isArabic
              ? 'الكرامة × تشرين'
              : 'Al Karama × Tishreen'}
          </Text>
        </View>

        <Text
          style={[
            styles.pendingHint,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {isArabic
            ? 'يوجد تقريران بانتظار التقييم'
            : '2 reports waiting for evaluation'}
        </Text>
      </View>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
            textAlign: isArabic ? 'right' : 'left',
          },
        ]}
      >
        {isArabic
          ? 'آخر الإشعارات'
          : 'Latest Notifications'}
      </Text>

      {updates.map((item) => (
        <View
          key={item.title}
          style={[
            styles.noteCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              flexDirection: isArabic
                ? 'row-reverse'
                : 'row',
            },
          ]}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={22}
            color={item.color}
          />

          <View style={styles.noteBody}>
            <Text
              style={[
                styles.noteTitle,
                {
                  color: colors.text,
                  textAlign: isArabic
                    ? 'right'
                    : 'left',
                },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.noteTime,
                {
                  color: colors.textSecondary,
                  textAlign: isArabic
                    ? 'right'
                    : 'left',
                },
              ]}
            >
              {item.time}
            </Text>
          </View>
        </View>
      ))}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 36,
  },

  heroCard: {
    borderRadius: 28,
    padding: 24,
    marginTop: 20,
    marginBottom: 26,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
  },

  heroSubtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
  },

  heroSeason: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
  },

  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '800',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },

  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  card: {
    width: '48%',
    paddingVertical: 24,
    borderRadius: 22,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,

    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  cardText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  matchCard: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    marginBottom: 28,
  },

  teams: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },

  matchInfo: {
    marginTop: 6,
    fontSize: 15,
  },

  button: {
    marginTop: 22,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  buttonText: {
    fontWeight: '800',
    fontSize: 15,
  },

  pendingCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
  },

  pendingRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },

  pendingText: {
    fontSize: 15,
    fontWeight: '700',
  },

  pendingHint: {
    marginTop: 8,
    fontSize: 13,
  },

  noteCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    marginBottom: 14,
    alignItems: 'center',
    gap: 12,
  },

  noteBody: {
    flex: 1,
  },

  noteTitle: {
    fontSize: 15,
    fontWeight: '600',
  },

  noteTime: {
    marginTop: 5,
    fontSize: 13,
  },
});