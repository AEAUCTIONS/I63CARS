import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { colors, fonts, radii } from '../theme/tokens';

const LENGTH = 6;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpInput({ value, onChange }: Props) {
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const boxes = Array.from({ length: LENGTH }, (_, i) => {
    const filled = i < value.length;
    const active = i === value.length;
    const border = active ? colors.primaryBlue : filled ? 'rgba(21,101,216,0.45)' : colors.borderInput;
    return { char: value[i] ?? '', border };
  });

  return (
    <Pressable onPress={() => inputRef.current?.focus()} style={styles.wrap}>
      <View style={styles.row} pointerEvents="none">
        {boxes.map((box, i) => (
          <View key={i} style={[styles.box, { borderColor: box.border }]}>
            <Text style={styles.char}>{box.char}</Text>
          </View>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, LENGTH))}
        keyboardType="number-pad"
        maxLength={LENGTH}
        autoFocus
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  box: {
    flex: 1,
    height: 56,
    borderRadius: radii.otpBox,
    borderWidth: 1.5,
    backgroundColor: colors.inputSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  char: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.navyInk,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
});
