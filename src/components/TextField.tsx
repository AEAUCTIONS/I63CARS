import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts, radii } from '../theme/tokens';

type Props = TextInputProps & {
  label: string;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  valid?: boolean;
};

export function TextField({ label, icon, prefix, valid, style, ...inputProps }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, valid && styles.fieldValid]}>
        {icon}
        {prefix}
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, style]}
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.textMuted,
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.inputSurface,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: radii.button,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  fieldValid: {
    borderColor: colors.validBorder,
  },
  input: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.navyInk,
    padding: 0,
  },
});
