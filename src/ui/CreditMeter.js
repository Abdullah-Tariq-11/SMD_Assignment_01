import { StyleSheet, Text, View } from 'react-native';
import { MAX_CREDITS, MIN_CREDITS } from '../constants';
import { palette } from '../theme/palette';

const describe = (credits) => {
  if (credits === 0) return { tone: palette.muted, text: 'No courses yet. Add some from the Catalog.' };
  if (credits < MIN_CREDITS) {
    return { tone: palette.warn, text: `${MIN_CREDITS - credits} more credits needed for a full-time load.` };
  }
  if (credits >= MAX_CREDITS) return { tone: palette.bad, text: 'You are at the credit limit.' };
  return { tone: palette.accent, text: `Full-time load. ${MAX_CREDITS - credits} credits of room left.` };
};

export default function CreditMeter({ credits }) {
  const { tone, text } = describe(credits);
  const fill = Math.min(credits / MAX_CREDITS, 1) * 100;
  const minMark = (MIN_CREDITS / MAX_CREDITS) * 100;

  return (
    <View>
      <View style={styles.row}>
        <Text style={[styles.big, { color: tone }]}>{credits}</Text>
        <Text style={styles.of}> / {MAX_CREDITS} credit hours</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${fill}%`, backgroundColor: tone }]} />
        <View style={[styles.mark, { left: `${minMark}%` }]} />
      </View>
      <Text style={[styles.text, { color: tone }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline' },
  big: { fontSize: 34, fontWeight: '800' },
  of: { color: palette.muted, fontSize: 14 },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.raised,
    marginTop: 8,
    overflow: 'hidden',
  },
  fill: { height: 10, borderRadius: 5 },
  mark: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: palette.text },
  text: { marginTop: 8, fontWeight: '600' },
});
