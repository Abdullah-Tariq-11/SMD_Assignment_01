import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../theme/palette';

export default function Notice({ title, message }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 22,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: palette.line,
    marginBottom: 14,
  },
  title: { color: palette.text, fontWeight: '700', fontSize: 16 },
  message: { color: palette.muted, marginTop: 6, textAlign: 'center' },
});
