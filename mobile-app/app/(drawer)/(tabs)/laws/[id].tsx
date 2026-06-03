import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Laws } from '@/data/Laws';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
export default function LawsDetailsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { id } = useLocalSearchParams();
  const law = Laws.find(
    (item) => item.id === id
  );
  if (!law) {
    return (
      <View
        style={[
          styles.notFound,
          {
            backgroundColor:
              colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.notFoundText,
            {
              color: colors.text,
            },
          ]}
        >
          نص القانون غير موجود
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}

      <View
        style={[
          styles.headerCard,
          {
            backgroundColor:
              colors.primary,
          },
        ]}
      >
        <Text style={styles.title}>
          {law.title}
        </Text>

        <Text
          style={[
            styles.subTitle,
            {
              color:
                colors.successBackground,
            },
          ]}
        >
          {law.subtitle}
        </Text>
      </View>

      {/* BODY */}

      <View
        style={[
          styles.bodyCard,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.contentText,
            {
              color:
                colors.text,
            },
          ]}
        >
          {law.content}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  headerCard: {
    borderRadius: 30,
    padding: 26,
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 10,
    lineHeight: 40,
  },

  subTitle: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 28,
  },

  bodyCard: {
    borderRadius: 26,
    padding: 24,
    borderWidth: 1,
  },

  contentText: {
    fontSize: 18,
    lineHeight: 34,
    fontWeight: '500',
  },

  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFoundText: {
    fontSize: 20,
    fontWeight: '700',
  },
});