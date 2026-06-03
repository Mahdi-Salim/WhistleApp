import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

type Props = {
  status:
    | 'pending'
    | 'lineups_ready'
    | 'finished'
    | 'submitted';
};

export default function ReportStatus({
  status,
}: Props) {

  const { theme } = useTheme();
  const colors = Colors[theme];

  const getStatusText = () => {

    switch (status) {

      case 'pending':
        return 'بانتظار التشكيلات';

      case 'lineups_ready':
        return 'التشكيلات جاهزة';

      case 'finished':
        return 'المباراة منتهية';

      case 'submitted':
        return 'تم إرسال التقرير';

      default:
        return '';
    }
  };

  const getStatusColor = () => {

    switch (status) {

      case 'pending':
        return '#f59e0b';

      case 'lineups_ready':
        return '#3b82f6';

      case 'finished':
        return '#22c55e';

      case 'submitted':
        return '#ef4444';

      default:
        return colors.primary;
    }
  };

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
          styles.label,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        حالة المباراة
      </Text>

      <Text
        style={[
          styles.value,
          {
            color: getStatusColor(),
          },
        ]}
      >
        {getStatusText()}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    marginBottom: 8,
  },

  value: {
    fontSize: 18,
    fontWeight: '800',
  },

});