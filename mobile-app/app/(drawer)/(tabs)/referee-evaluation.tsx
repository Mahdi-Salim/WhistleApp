import { use, useState } from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/theme';
import RefereeTabs from '@/components/assessor/RefereeTabs';
import RefereeEvaluationCard from '@/components/assessor/RefereeEvaluationCard';
import NotesCard from '@/components/assessor/NotesCard';
import EvaluationSummaryCard from '@/components/assessor/EvaluationSummaryCard';
import EvaluationActionsCard from '@/components/assessor/EvaluationActionsCard';
import Referee from './referee';

type RefereeKey =
  | 'referee'
  | 'assistant1'
  | 'assistant2'
  | 'fourthOfficial';

export default function RefereeEvaluation() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const [selectedReferee, setSelectedReferee] =
    useState<RefereeKey>('referee');

  const [evaluations, setEvaluations] =
    useState({
      referee: {
        positioning: 0,
        decisions: 0,
        control: 0,
        fitness: 0,
      },

      assistant1: {
        positioning: 0,
        decisions: 0,
        control: 0,
        fitness: 0,
      },

      assistant2: {
        positioning: 0,
        decisions: 0,
        control: 0,
        fitness: 0,
      },

      fourthOfficial: {
        positioning: 0,
        decisions: 0,
        control: 0,
        fitness: 0,
      },
    });
    const handleScoreChange = (
        referee: RefereeKey,
        critertion:
        | 'positioning'
        | 'decisions'
        | 'control'
        | 'fitness',
        value: number
       ) => {
        setEvaluations((prev) => ({
            ...prev,
            [referee]: {
                ...prev[referee],
                [critertion]: value,
            },
        }));
       };
       const [notes, setNotes] = useState('');
       const handleSaveDraft = () => {
        console.log('Draft Saved');
       };
       const handleSubmit = () => {
        console.log('Evaluation Submitted');
       };
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
    >
      <RefereeTabs
        selected={selectedReferee}
        onSelect={setSelectedReferee}
      />
      
      <RefereeEvaluationCard
      title={
        selectedReferee === 'referee'
        ? 'الحكم الرئيسي'
        : selectedReferee === 'assistant1'
        ? 'المساعد الأول'
        : selectedReferee === 'assistant2'
        ? 'المساعد الثاني'
        : 'الحكم الرابع'
      }
      name={
        selectedReferee === 'referee'
        ? 'محمد'
        : selectedReferee === 'assistant1'
        ? 'علي'
        : selectedReferee === 'assistant2'
        ? 'أحمد'
        : 'عمر'
      }
      score={evaluations[selectedReferee]}
        onChange={(criterion, value) => 
            handleScoreChange(
                selectedReferee,
                criterion,
                value
            )
        }/>
        <NotesCard
        value={notes}
        onChangeText={setNotes}/>

        <EvaluationSummaryCard
        evaluations={evaluations}/>

        <EvaluationActionsCard
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}/>
        
      {/* سنضع البطاقة هنا بالخطوة التالية */}
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