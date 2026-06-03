 import React from 'react';
import { View, Text,  StyleSheet,  ScrollView,  TouchableOpacity} from 'react-native';
import { Colors } from '@/constants/theme';
import { t } from '@/utils/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function Profile() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const referee = {
    name: 'أحمد محمد',
    role: 'حكم ساحة',
    degree: 'درجة أولى',
    status: 'عامل',
    phone: '0999999999',
    address: 'دمشق',
    birthDate: '1998-05-10',
    afcNumber: 'AFC-12345',
    matches: 24,
    averageRating: 8.2,
    lastRating: 7.8,
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      showsVerticalScrollIndicator={false} >
      {/* HEADER */}
      <View
        style={[
          styles.headerCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              {
                color: colors.heroText,
              },
            ]}
          >
            أ
          </Text>
        </View>

        <Text
          style={[
            styles.name,
            {
              color: colors.text,
            },
          ]}
        >
          {referee.name}
        </Text>

        <Text
          style={[
            styles.subInfo,
            {
              color: colors.textSecondary,
            },
          ]}>
          {referee.role} • {referee.degree}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: colors.successBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: colors.primary,
              },
            ]}
          >
            {referee.status}
          </Text>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('matches')}
          </Text>

          <Text
            style={[
              styles.statValue,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.matches}
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('AverageRating')}
          </Text>

          <Text
            style={[
              styles.statValue,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.averageRating}
          </Text>
        </View>

        <View
          style={[
 styles.statCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('LastRating')}
          </Text>

          <Text
            style={[
              styles.statValue,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.lastRating}
          </Text>
        </View>
      </View>

      {/* PERSONAL INFO */}
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
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
          {t('PersonalInfo')}
        </Text>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('Phone')}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.phone}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('Address')}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.address}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('BirthDate')}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.birthDate}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {t('AFCNumber')}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: colors.text,
              },
            ]}
          >
            {referee.afcNumber}
          </Text>
        </View>
      </View>
      {/* ACTIONS */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            styles.outlineBtn,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
            },
          ]}
        >
          <Text
            style={[
              styles.actionOutlineText,
              {
                color: colors.danger,
              },
            ]}
          >
            {t('Logout')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  headerCard: {
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 24,

    paddingVertical: 24,
    paddingHorizontal: 18,

    shadowOpacity: 0.05,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  avatar: {
    width: 82,
    height: 82,

    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 16,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: '800',
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
  },

  subInfo: {
    fontSize: 15,
    marginTop: 6,
  },

  statusBadge: {
    marginTop: 14,

    paddingHorizontal: 16,
    paddingVertical: 6,

    borderRadius: 999,
    borderWidth: 1,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,

    marginVertical: 18,
  },

  statCard: {
    flex: 1,

    borderWidth: 1,
    borderRadius: 18,

    paddingVertical: 16,

    alignItems: 'center',

    shadowOpacity: 0.04,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 1,
  },

  statLabel: {
    fontSize: 12,
    marginBottom: 6,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },

  sectionCard: {
    borderWidth: 1,
    borderRadius: 24,

    padding: 18,

    shadowOpacity: 0.04,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',

    marginBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 10,

    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
  },

  label: {
    fontSize: 14,
  },

  value: {
    fontWeight: '700',
    fontSize: 14,
  },

  actionsRow: {
    marginTop: 20,
    marginBottom: 30,
  },

  actionBtn: {
    borderRadius: 16,

    paddingVertical: 14,

    alignItems: 'center',
  },

  outlineBtn: {
    borderWidth: 1,
  },

  actionOutlineText: {
    fontWeight: '800',
    fontSize: 15,
  },
});