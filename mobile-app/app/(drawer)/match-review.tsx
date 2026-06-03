import { StyleSheet, ScrollView} from 'react-native';
import { t } from '@/utils/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useMatch } from '@/context/MatchContext';
import { Colors } from '@/constants/theme';
import ReportHeader from '@/components/review/ReportHeader';
import ReportStatus from '@/components/review/ReportStatus';
import ReportOfficials from '@/components/review/ReportOfficials';
import ReportLineups from '@/components/review/ReportLineups';
import ReportEvents from '@/components/review/ReportEvents';
import ReportActions from '@/components/review/ReportActions';

export default function MatchReviewScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { match,
     lineups,
      events,
    status,
    kits,
  setStatus, } = useMatch();
  const homeGoals = events.filter(
    (event) => event.type === 'goal' && event.team === 'home'
  ).length;
  const awayGoals = events.filter(
    (event) => event.type === 'goal' && event.team === 'away'
  ).length;

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
       <ReportHeader
        match={match}
        homeGoals={homeGoals}
        awayGoals={awayGoals}/>
      {/*status*/}
      <ReportStatus
      status={status}/>
      {/*Refrees*/}
      <ReportOfficials
      match={match}/>
    {/*Lineups*/}
    <ReportLineups
    match={match}
    lineups={lineups}
    kits={kits}/>
      {/* Events */}
     <ReportEvents
     events={events}
     match={match}/>
   {/* Actions */}
   <ReportActions
   status={status}
   setStatus={setStatus}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
});