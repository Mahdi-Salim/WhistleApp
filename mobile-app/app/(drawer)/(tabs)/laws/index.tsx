import {  View,  Text,  StyleSheet, ScrollView,  TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import { BookOpen,  ChevronLeft} from 'lucide-react-native';
import { Laws } from '@/data/Laws';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export default function LawsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

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
      {/* TITLE */}

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        قانون اللعبة
      </Text>

      {/* LAWS */}

      {Laws.map((law) => (
        <TouchableOpacity
          key={law.id}
          activeOpacity={0.8}
          style={[
            styles.card,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
          onPress={() =>
            router.push(`/laws/${law.id}`)
          }
        >
          <View style={styles.leftSide}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    colors.cardIconBackground,
                },
              ]}
            >
              <BookOpen
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                {law.title}
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    color:
                      colors.textSecondary,
                  },
                ]}
              >
                {law.subtitle}
              </Text>
            </View>
          </View>

          <ChevronLeft
            size={22}
            color={
              colors.textSecondary
            }
          />
        </TouchableOpacity>
      ))}
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

  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 22,
  },

  card: {
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  textContainer: {
    flexShrink: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 14,
    lineHeight: 22,
  },
});