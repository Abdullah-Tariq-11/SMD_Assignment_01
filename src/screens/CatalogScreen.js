import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { catalog, categories } from '../data/catalog';
import { addState } from '../lib/schedule';
import { palette } from '../theme/palette';
import CourseRow from '../ui/CourseRow';
import Notice from '../ui/Notice';
import Pill from '../ui/Pill';

const SORTS = [
  { key: 'code', label: 'Code', compare: (a, b) => a.code.localeCompare(b.code) },
  { key: 'credits', label: 'Credits', compare: (a, b) => b.credits - a.credits },
];

export default function CatalogScreen({ planned, onToggle }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortKey, setSortKey] = useState('code');

  const sorter = SORTS.find((s) => s.key === sortKey).compare;
  const shown = catalog
    .filter((c) => category === 'All' || c.category === category)
    .filter((c) => `${c.code} ${c.title}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort(sorter);

  return (
    <View>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Search courses"
        placeholderTextColor={palette.muted}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.wrap}>
        {['All', ...categories].map((name) => (
          <Pill key={name} label={name} active={category === name} onPress={() => setCategory(name)} />
        ))}
      </View>

      <Text style={styles.label}>Sort by</Text>
      <View style={styles.wrap}>
        {SORTS.map((s) => (
          <Pill key={s.key} label={s.label} active={sortKey === s.key} onPress={() => setSortKey(s.key)} />
        ))}
      </View>

      <Text style={styles.count}>{shown.length} courses</Text>
      {shown.length === 0 ? (
        <Notice title="No courses found" message="Try another search or choose All categories." />
      ) : (
        shown.map((course) => (
          <CourseRow
            key={course.id}
            course={course}
            state={addState(course, planned)}
            onPress={() => onToggle(course)}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: palette.text,
  },
  label: { color: palette.muted, fontSize: 12, marginTop: 14, marginBottom: 8, textTransform: 'uppercase' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  count: { color: palette.muted, marginVertical: 8 },
});
