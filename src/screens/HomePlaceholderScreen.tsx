import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { BrandLogo } from '../components/BrandLogo';
import { colors, fonts } from '../theme/tokens';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Placeholder landing screen. The full Home experience (hero, promo carousel,
// bike wizard, categories, popular parts, featured shops) is out of scope for
// this pass — see design_handoff_aeparts_marketplace/README.md, Build priority #2.
export function HomePlaceholderScreen({}: Props) {
  return (
    <Screen center>
      <View style={styles.content}>
        <BrandLogo size={30} />
        <Text style={styles.title}>You're signed in ✓</Text>
        <Text style={styles.subtitle}>
          The full Home screen (bike catalog, garages, cart, and everything else) is next up.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.navyInk,
    marginTop: 18,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
