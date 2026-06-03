import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';
 
type props ={
    match: any;
    homeGoals: number;
    awayGoals: number;
};
export default function ReportHeader({
    match,
    homeGoals,
    awayGoals,

}: props ) {
    const {theme} = useTheme();
    const colors = Colors [theme];
    return (
    <View 
    style={[
        styles.headerCard,
        {
            backgroundColor: colors.card,
            borderColor: colors.border,
        },
    ]}>
        <Text 
        style={[
            styles.score,
            {
                color: colors.text,
            },
        ]}>
            {match.homeTeam}
            {' '}{homeGoals} - {awayGoals}{' '}
            {match.awayTeam}
        </Text>
        <Text 
        style={[
            styles.matchInfo,
            {
                color: colors.textSecondary,
            },
        ]}>
            {match.stadium} . {match.city}
        </Text>
        <Text 
        style={[
            styles.matchInfo,
            {
                color: colors.textSecondary,
            },
        ]}>
            {match.date} {match.time}
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    headerCard: {
        borderWidth: 1,
        borderRadius: 28,
        padding: 24,
        marginBottom: 18,
        alignItems: 'center',
    },
    score: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 10,
        textAlign: 'center',
    },
    matchInfo: {
        fontSize: 14,
        marginTop: 4,
    },
});