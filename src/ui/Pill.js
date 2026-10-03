import { Pressable, StyleSheet, Text } from 'react-native';
import { palette } from '../theme/palette';

export default function Pill({ label, active, onPress, tint = palette.accent }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        active && { backgroundColor: tint, borderColor: tint },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    marginRight: 8,
    marginBottom: 8,
  },
  pressed: { opacity: 0.65 },
  label: { color: palette.muted, fontWeight: '600' },
  activeLabel: { color: palette.onAccent },
});
