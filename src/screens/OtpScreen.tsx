import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { OtpInput } from '../components/OtpInput';
import { BellShieldIcon } from '../components/icons';
import { useToast } from '../components/Toast';
import { colors, fonts } from '../theme/tokens';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export function OtpScreen({ navigation, route }: Props) {
  const { email, phone } = route.params;
  const { showToast } = useToast();
  const [otp, setOtp] = useState('');

  const complete = otp.length === 6;

  const resendOtp = () => showToast('New code sent');

  const verifyOtp = () => {
    // Demo accepts any 6-digit code, per design spec — a real OTP decoder
    // API replaces this on the backend.
    if (!complete) return showToast('Enter the 6-digit code');
    showToast('Signed in ✓');
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <Screen center>
      <View style={styles.content}>
        <View style={styles.iconTile}>
          <BellShieldIcon />
        </View>
        <Text style={styles.title}>Enter the code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{'\n'}
          <Text style={styles.strong}>+971 {phone}</Text> and <Text style={styles.strong}>{email}</Text>.
        </Text>

        <OtpInput value={otp} onChange={setOtp} />

        <Text style={styles.resendRow}>
          Didn't get it?{' '}
          <Text style={styles.resendLink} onPress={resendOtp}>
            Resend code
          </Text>{' '}
          · <Text style={styles.muted}>Demo: any 6 digits</Text>
        </Text>

        <Button label="Verify & continue" onPress={verifyOtp} disabled={!complete} />
        <Text style={styles.back} onPress={() => navigation.goBack()}>
          ← Change email or number
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 26,
    paddingVertical: 30,
  },
  iconTile: {
    width: 60,
    height: 60,
    borderRadius: 17,
    backgroundColor: 'rgba(21,101,216,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.navyInk,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  strong: {
    fontFamily: fonts.bodyBold,
    color: colors.navyInk,
  },
  resendRow: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 24,
  },
  resendLink: {
    fontFamily: fonts.bodySemiBold,
    color: colors.primaryBlue,
  },
  muted: {
    color: colors.textMuted,
  },
  back: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});
