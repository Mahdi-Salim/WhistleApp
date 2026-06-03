import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';

type Props = {
  status: string;
  setStatus: any;
};

export default function ReportActions({
  status,
  setStatus,
}: Props) {

  const { theme } = useTheme();
  const colors = Colors[theme];

  const isDraft =
    status === 'draft';

  const isFinished =
    status === 'finished';

  const isSubmitted =
    status === 'submitted';

  const handleFinishMatch = () => {

    Alert.alert(
      'إنهاء المباراة',
      'هل أنت متأكد من إنهاء المباراة؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },

        {
          text: 'إنهاء',
          style: 'destructive',

          onPress: () => {
            setStatus('finished');
          },
        },
      ]
    );
  };

  const handleSubmitReport = () => {

    Alert.alert(
      'إرسال التقرير',
      'بعد إرسال التقرير لن تتمكن من التعديل عليه',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },

        {
          text: 'إرسال',
          onPress: () => {
            setStatus('submitted');
          },
        },
      ]
    );
  };

  return (

    <View style={styles.container}>

      {/* Draft */}

      {isDraft && (

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                '#f59e0b',
            },
          ]}
          onPress={
            handleFinishMatch
          }
        >

          <Text style={styles.text}>
            إنهاء المباراة
          </Text>

        </TouchableOpacity>
      )}

      {/* Finished */}

      {isFinished && (

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                colors.primary,
            },
          ]}
          onPress={
            handleSubmitReport
          }
        >

          <Text style={styles.text}>
            إرسال التقرير الرسمي
          </Text>

        </TouchableOpacity>
      )}

      {/* Submitted */}

      {isSubmitted && (

        <View
          style={[
            styles.submittedCard,
            {
              backgroundColor:
                theme === 'dark'
                  ? '#0f1f17'
                  : '#dcfce7',

              borderColor:
                colors.primary,
            },
          ]}
        >

          <Text
            style={[
              styles.submittedTitle,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            تم إرسال التقرير
          </Text>

          <Text
            style={[
              styles.submittedText,
              {
                color:
                  colors.textSecondary,
              },
            ]}
          >
            التقرير أصبح مقفلًا
            ولا يمكن تعديله
          </Text>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 8,
    marginBottom: 40,
  },

  button: {
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  submittedCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
  },

  submittedTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  submittedText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },

});