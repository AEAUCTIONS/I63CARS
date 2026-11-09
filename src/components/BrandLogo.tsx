import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme/tokens';

type Props = {
  size?: number;
};

export function BrandLogo({ size = 38 }: Props) {
  return (
    <View style={styles.row}>
      <Text style={[styles.letter, { fontSize: size, color: colors.brandA }]}>A</Text>
      <Text style={[styles.letter, { fontSize: size, color: colors.brandE }]}>E</Text>
      <Text style={[styles.letter, { fontSize: size, color: colors.brandParts }]}>PARTS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  letter: {
    fontFamily: fonts.heading,
    letterSpacing: -1,
  },
});
