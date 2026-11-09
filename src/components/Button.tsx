import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, radii, shadows } from '../theme/tokens';

type Variant = 'primary' | 'dark' | 'outline';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: Variant;
  icon?: React.ReactNode;
  style?: ViewStyle;
};

export function Button({ label, onPress, disabled, variant = 'primary', icon, style }: Props) {
  const isPrimary = variant === 'primary';
  const isDisabledPrimary = isPrimary && disabled;

  const backgroundColor = isDisabledPrimary
    ? colors.disabledBtnBg
    : isPrimary
    ? colors.primaryBlue
    : variant === 'dark'
    ? '#0F1520'
    : colors.cardSurface;

  const textColor = isDisabledPrimary
    ? colors.disabledBtnText
    : isPrimary || variant === 'dark'
    ? '#FFFFFF'
    : colors.navyInk;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        { backgroundColor },
        variant === 'outline' && styles.outline,
        isPrimary && !disabled ? shadows.primaryButtonGlow : null,
        style,
      ]}
    >
      {icon}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: radii.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.borderStandard,
  },
  label: {
    fontFamily: fonts.heading,
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
