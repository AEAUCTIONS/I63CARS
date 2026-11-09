import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { BrandLogo } from '../components/BrandLogo';
import { colors, fonts } from '../theme/tokens';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen center>
      <View style={styles.glow} />
      <View style={styles.content}>
        <View style={styles.centerRow}>
          <BrandLogo size={38} />
        </View>
        <Text style={styles.tagline}>ALL PARTS. ONE PLACE.</Text>
        <Text style={styles.headline}>Every motorcycle part,{'\n'}one tap away.</Text>
        <Text style={styles.subcopy}>
          Genuine & aftermarket parts, trusted OEM shops, and service garages across the UAE &
          Saudi Arabia — or import any part from the USA.
        </Text>
        <Button label="Get Started" onPress={() => navigation.navigate('SignIn')} />
        <Text style={styles.signInRow}>
          Already have an account?{' '}
          <Text style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>
            Sign In
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    top: '8%',
    alignSelf: 'center',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(21,101,216,0.16)',
  },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  centerRow: {
    alignItems: 'center',
  },
  tagline: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.primaryBlue,
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 28,
  },
  headline: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: colors.navyInk,
    textAlign: 'center',
    lineHeight: 33,
    marginBottom: 12,
  },
  subcopy: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  signInRow: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
  },
  signInLink: {
    fontFamily: fonts.bodySemiBold,
    color: colors.primaryBlue,
  },
});
