import { useState } from 'react';
import { t } from '@/utils/i18n';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';
import { Clock3 } from 'lucide-react-native';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

const defaultNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: t('notifTitle1'),
    description: t('notifDesc1'),
    time: t('notifTime1'),
    unread: true,
  },
  {
    id: 'notif-2',
    title: t('notifTitle2'),
    description: t('notifDesc2'),
    time: t('notifTime2'),
    unread: true,
  },
  {
    id: 'notif-3',
    title: t('notifTitle3'),
    description: t('notifDesc3'),
    time: t('notifTime3'),
    unread: false,
  },
  {
    id: 'notif-4',
    title: t('notifTitle4'),
    description: t('notifDesc4'),
    time: t('notifTime4'),
    unread: true,
  },
];

export default function Notifications() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    defaultNotifications
  );

  const unreadCount = notifications.filter((item) => item.unread).length;

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { backgroundColor: colors.card }]}> 
        <View style={styles.headerTextContainer}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>{t('notifications')}</Text>
          <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>{t('notificationsSubtitle')}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: colors.primary }]}> 
          <Text style={[styles.badgeText, { color: colors.white }]}>{unreadCount}</Text>
        </View>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => markAsRead(item.id)}
            style={[
              styles.notificationCard,
              {
                backgroundColor: colors.card,
                borderColor: item.unread ? colors.primary : colors.border,
              },
            ]}
          >
            <View style={styles.notificationHeader}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}> {item.title}</Text>
              <Clock3 size={18} color={colors.textSecondary} />
            </View>
            <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}> {item.description}</Text>
            <View style={styles.notificationFooter}>
              <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>{item.time}</Text>
              {item.unread && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 18,
    marginBottom: 12,
  },
  headerTextContainer: {
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  pageSubtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  separator: {
    height: 12,
  },
  notificationCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  notificationDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
});
