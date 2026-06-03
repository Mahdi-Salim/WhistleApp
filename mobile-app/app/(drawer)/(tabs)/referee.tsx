import {  View,  Text,  StyleSheet,  TouchableOpacity,  ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { User, BookOpen, ClipboardList,  ChevronLeft} from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/utils/i18n';
import SectionTitle from '@/components/common/SectionTitle';
import QuickActionCard from '@/components/main/QuickActionsCard';
import HeaderCard from '@/components/main/HeaderCard';


export default function Referee() {
  const router = useRouter();
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const colors = Colors[theme];
  const actions =[
   {
    title: t('matches'),
    icon: 'whistle',
    color: colors.primary,
    route: '/matches',
  },
  {
    title: t('profile'),
    icon: 'account-outline',
    color: colors.secondary,
    route: '/profile',
  },
  {
    title: t('LOFTG'),
    icon: 'book-open-page-variant-outline',
    color: colors.gold,
    route: '/laws',
  },
  {
    title: t('assignments'),
    icon: 'clipboard-clock-outline',
    color: colors.purple,
    route: '/assignments',
  }
  ]

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <View
        style={[
          styles.heroCard,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.heroTitle,
            {
              color: colors.heroText,
            },
          ]}>
          أهلاً أحمد 👋
        </Text>

        <Text
          style={[
            styles.heroSubtitle,
            {
              color: colors.heroSubText,
            },
          ]}
        >
          لديك مباراة اليوم الساعة 7:00 مساءً
        </Text>

        <View style={styles.heroStats}>
          <View style={styles.statBox}>
            <Text
              style={[
                styles.statNumber,
                {
                  color: colors.heroText,
                },
              ]}
            >
              24
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.heroMuted,
                },
              ]}
            >
              مباراة
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text
              style={[
                styles.statNumber,
                {
                  color: colors.heroText,
                },
              ]}
            >
              4.8
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.heroMuted,
                },
              ]}
            >
              تقييم
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text
              style={[
                styles.statNumber,
                {
                  color: colors.heroText,
                },
              ]}
            >
              2024
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.heroMuted,
                },
              ]}
            >
              الموسم
            </Text>
          </View>
        </View>
      </View>

      {/* QUICK ACTIONS */}
      <SectionTitle title="الوصول السريع" />
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
          onPress={() => router.push(item.route as any)}>
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

      {/* NEXT MATCH */}
      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          المباراة القادمة
        </Text>
      </View>

      <View
        style={[
          styles.matchCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}

      >
        <View style={styles.matchTeams}>
          <Text
            style={[
              styles.teamName,
              {
                color: colors.text,
              },
            ]}
          >
            الوحدة
          </Text>

          <Text
            style={[
              styles.vs,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            VS
          </Text>

          <Text
            style={[
              styles.teamName,
              {
                color: colors.text,
              },
            ]}
          >
            الجيش
          </Text>
        </View>

        <Text
          style={[
            styles.matchInfo,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          📍 ملعب الفيحاء
        </Text>

        <Text
          style={[
            styles.matchInfo,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          🕒 20 سبتمبر 2024 - 7:00 مساءً
        </Text>

        <TouchableOpacity
          style={[
            styles.reportButton,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.reportButtonText,
              {
                color: colors.heroText,
              },
            ]}
            onPress={() => router.push('/match-report')}
          >
            فتح التقرير
          </Text>

          <ChevronLeft
            size={18}
            color={colors.heroText}
          />
        </TouchableOpacity>
      </View>
       {/* NOTIFICATIONS */}
      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          آخر الإشعارات
        </Text>
      </View>

      <View
        style={[
          styles.notificationCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={styles.notificationIcon}>
          🟢
        </Text>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.notificationText,
              {
                color: colors.text,
              },
            ]}
          >
            تم تعيينك لمباراة جديدة
          </Text>

          <Text
            style={[
              styles.notificationTime,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            منذ ساعتين
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  },

  sectionHeader: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
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
  },

  matchCard: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    marginBottom: 28,
  },

  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  teamName: {
    fontSize: 22,
    fontWeight: '800',
  },

  vs: {
    marginHorizontal: 14,
    fontSize: 14,
    fontWeight: '700',
  },

  matchInfo: {
    marginTop: 6,
    fontSize: 15,
  },

  reportButton: {
    marginTop: 22,
    paddingVertical: 14,
    borderRadius: 16,

    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 6,
  },

  reportButtonText: {
    fontWeight: '800',
    fontSize: 15,
  },

  notificationCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    marginBottom: 30,

    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  notificationIcon: {
    fontSize: 18,
    marginLeft: 12,
  },

  notificationText: {
    fontSize: 15,
    fontWeight: '600',
  },

  notificationTime: {
    marginTop: 5,
    fontSize: 13,
  },
});