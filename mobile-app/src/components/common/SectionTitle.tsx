import {Text, StyleSheet} from 'react-native';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext'; 
import { useLanguage } from '@/context/LanguageContext';    

type Prosps = {
  title: string;
};

export default function SectionTitle({ title }: Prosps) {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const colors = Colors[theme];

  return (
    <Text
      style={[
        styles.title,
        {
            color: colors.text,
            textAlign: lang === 'ar' ? 'right' : 'left',
        },
      ]}
      >
        {title}
      </Text>
  );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 14,
    },
});