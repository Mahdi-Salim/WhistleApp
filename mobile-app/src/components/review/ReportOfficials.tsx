import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

import { t } from '@/utils/i18n';

type Props = {
  match: any;
};

export default function ReportOfficials({
  match,
}: Props) {

  const { theme } = useTheme();
  const colors = Colors[theme];

  return (

    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
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
        {t('refereeCrew')}
      </Text>

      <View style={styles.row}>
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {t('mainReferee')}
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: colors.text,
            },
          ]}
        >
          {match.referee}
        </Text>
      </View>

      <View style={styles.row}>
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {t('assistant1')}
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: colors.text,
            },
          ]}
        >
          {match.assistant1}
        </Text>
      </View>

      <View style={styles.row}>
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {t('assistant2')}
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: colors.text,
            },
          ]}
        >
          {match.assistant2}
        </Text>
      </View>

      <View style={styles.row}>
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {t('fourthOfficial')}
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: colors.text,
            },
          ]}
        >
          {match.fourthOfficial}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
  },

  value: {
    fontSize: 15,
    fontWeight: '700',
  },

});