import { useRef, useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { MAX_CREDITS } from './src/constants';
import { catalog, initialPlan } from './src/data/catalog';
import { addState, totalCredits } from './src/lib/schedule';
import CatalogScreen from './src/screens/CatalogScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import PlanScreen from './src/screens/PlanScreen';
import { palette } from './src/theme/palette';
import Pill from './src/ui/Pill';
import Toast from './src/ui/Toast';

const TABS = [
  { key: 'catalog', label: 'Catalog' },
  { key: 'plan', label: 'My Plan' },
  { key: 'insights', label: 'Insights' },
];

export default function App() {
  const [tab, setTab] = useState('catalog');
  const [planIds, setPlanIds] = useState(initialPlan);
  const [fee, setFee] = useState({ scholarship: '0', installments: 1 });
  const [toast, setToast] = useState(null);
  const scroller = useRef(null);

  const planned = catalog.filter((c) => planIds.includes(c.id));

  const showTab = (key) => {
    setTab(key);
    scroller.current?.scrollTo({ y: 0, animated: false });
  };

  const say = (text) => setToast({ text, stamp: Date.now() });

  const toggleCourse = (course) => {
    const state = addState(course, planned);
    if (state.kind === 'added') {
      setPlanIds((prev) => prev.filter((id) => id !== course.id));
      say(`${course.code} removed`);
    } else if (state.kind === 'ok') {
      setPlanIds((prev) => [...prev, course.id]);
      say(`${course.code} added`);
    } else {
      say(state.detail);
    }
  };

  const clearPlan = () => {
    setPlanIds([]);
    say('Plan cleared');
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={palette.bg} />
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.kicker}>SEMESTER BUILDER</Text>
            <Text style={styles.title}>Plan My Semester</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalCredits(planned)}/{MAX_CREDITS} cr</Text>
          </View>
        </View>
        <View style={styles.tabs}>
          {TABS.map((t) => (
            <Pill key={t.key} label={t.label} active={tab === t.key} onPress={() => showTab(t.key)} />
          ))}
        </View>
      </View>

      <Toast message={toast} />

      <ScrollView ref={scroller} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {tab === 'catalog' && <CatalogScreen planned={planned} onToggle={toggleCourse} />}
        {tab === 'plan' && (
          <PlanScreen planned={planned} fee={fee} onFeeChange={setFee} onToggle={toggleCourse} onClear={clearPlan} />
        )}
        {tab === 'insights' && <InsightsScreen planned={planned} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.bg },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 12 : 56,
    paddingHorizontal: 16,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kicker: { color: palette.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: palette.text, fontSize: 24, fontWeight: '800' },
  badge: {
    backgroundColor: palette.raised,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: palette.accent,
  },
  badgeText: { color: palette.accent, fontWeight: '800' },
  tabs: { flexDirection: 'row', marginTop: 14 },
  content: { padding: 16, paddingBottom: 48 },
});
