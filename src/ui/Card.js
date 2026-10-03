import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../theme/palette';

export default function Card({ title, note, children }) {
  return (
    <View style={styles.card}>
      {title && <Text style={styles.title}>{title}</Text>}
      {note && <Text style={styles.note}>{note}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: palette.line,
  },
  title: { color: palette.text, fontSize: 16, fontWeight: '700' },
  note: { color: palette.muted, marginTop: 2, marginBottom: 8 },
});
