import { Pressable, StyleSheet, Text, View } from 'react-native';
import { categoryColor, palette } from '../theme/palette';
import { formatSessions } from '../lib/schedule';

const buttonFor = (state) => {
  if (state.kind === 'added') return { label: 'Remove', style: 'remove', enabled: true };
  if (state.kind === 'ok') return { label: 'Add', style: 'add', enabled: true };
  return { label: state.kind === 'clash' ? 'Clash' : 'Full', style: 'blocked', enabled: false };
};

export default function CourseRow({ course, state, onPress }) {
  const button = buttonFor(state);
  const tint = categoryColor[course.category];

  return (
    <View style={styles.row}>
      <View style={[styles.stripe, { backgroundColor: tint }]} />
      <View style={styles.body}>
        <Text style={styles.code}>
          {course.code}  ·  {course.credits} cr  ·  <Text style={{ color: tint }}>{course.category}</Text>
        </Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.sessions}>{formatSessions(course)}</Text>
        {state.detail && <Text style={styles.warning}>{state.detail}</Text>}
      </View>
      <Pressable
        disabled={!button.enabled}
        onPress={onPress}
        style={({ pressed }) => [styles.button, styles[button.style], pressed && styles.pressed]}
      >
        <Text style={[styles.buttonText, button.style === 'add' && styles.addText]}>
          {button.label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    marginBottom: 10,
    overflow: 'hidden',
  },
  stripe: { width: 5, alignSelf: 'stretch' },
  body: { flex: 1, padding: 12 },
  code: { color: palette.muted, fontSize: 12, fontWeight: '600' },
  title: { color: palette.text, fontSize: 16, fontWeight: '700', marginTop: 2 },
  sessions: { color: palette.muted, fontSize: 12, marginTop: 4 },
  warning: { color: palette.bad, fontSize: 12, marginTop: 4, fontWeight: '600' },
  button: {
    minWidth: 68,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 12,
  },
  add: { backgroundColor: palette.accent },
  remove: { backgroundColor: palette.raised, borderWidth: 1, borderColor: palette.bad },
  blocked: { backgroundColor: palette.raised, opacity: 0.55 },
  pressed: { opacity: 0.65 },
  buttonText: { color: palette.text, fontWeight: '700' },
  addText: { color: palette.onAccent },
});
