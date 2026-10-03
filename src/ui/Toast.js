import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { palette } from '../theme/palette';

export default function Toast({ message }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!message) return;
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: false }),
      Animated.delay(1700),
      Animated.timing(opacity, { toValue: 0, duration: 320, useNativeDriver: false }),
    ]).start();
  }, [message]);

  if (!message) return null;

  return (
    <Animated.View pointerEvents="none" style={[styles.toast, { opacity }]}>
      <Text style={styles.text}>{message.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 110,
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: palette.raised,
    borderWidth: 1,
    borderColor: palette.accent,
    zIndex: 10,
  },
  text: { color: palette.text, textAlign: 'center', fontWeight: '600' },
});
