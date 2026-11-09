import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { BrandLogo } from '../components/BrandLogo';
import { MailIcon, AppleIcon, GoogleIcon } from '../components/icons';
import { useToast } from '../components/Toast';
import { colors, fonts } from '../theme/tokens';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validEmail = (value: string) => EMAIL_RE.test(value.trim());
const validPhone = (value: string) => value.replace(/\D/g, '').length >= 7;

export function SignInScreen({ navigation }: Props) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const emailValid = useMemo(() => validEmail(email), [email]);
  const phoneValid = useMemo(() => validPhone(phone), [phone]);
  const canSend = emailValid && phoneValid;

  const socialSignIn = (provider: 'apple' | 'google') => {
    setEmail(provider === 'apple' ? 'khalid.rider@icloud.com' : 'khalid.rider@gmail.com');
    showToast((provider === 'apple' ? 'iCloud' : 'Google') + ' account connected — verify your phone');
  };

  const sendOtp = () => {
    if (!emailValid) return showToast('Enter a valid email');
    if (!phoneValid) return showToast('Enter a valid number');
    showToast('Code sent to your phone');
    navigation.navigate('Otp', { email, phone });
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <BrandLogo size={26} />
        <Text style={styles.title}>Sign in to continue</Text>
        <Text style={styles.subtitle}>
          Sign in with iCloud or Google, or enter your email. Either way, we'll text a one-time
          code to your phone to verify it's you.
        </Text>

        <View style={styles.socialGroup}>
          <Button
            label="Continue with iCloud"
            variant="dark"
            icon={<AppleIcon />}
            onPress={() => socialSignIn('apple')}
          />
          <Button
            label="Continue with Google"
            variant="outline"
            icon={<GoogleIcon />}
            onPress={() => socialSignIn('google')}
          />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or with email</Text>
          <View style={styles.dividerLine} />
        </View>

        <TextField
          label="EMAIL ADDRESS"
          icon={<MailIcon />}
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          valid={emailValid}
        />

        <TextField
          label="MOBILE NUMBER"
          prefix={<Text style={styles.phonePrefix}>🇦🇪 +971</Text>}
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9 ]/g, ''))}
          placeholder="50 123 4567"
          keyboardType="phone-pad"
          valid={phoneValid}
        />
        <Text style={styles.helper}>A 6-digit code will be sent by SMS. Standard rates may apply.</Text>

        <Button label="Send verification code" onPress={sendOtp} disabled={!canSend} />
        <Text style={styles.legal}>By continuing you agree to AEPARTS' Terms & Privacy Policy.</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 26,
    paddingVertical: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.navyInk,
    marginTop: 6,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 22,
  },
  socialGroup: {
    gap: 10,
    marginBottom: 18,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderStandard,
  },
  dividerText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textMuted,
  },
  phonePrefix: {
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.navyInk,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: colors.borderStandard,
  },
  helper: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
    marginTop: -8,
    marginBottom: 24,
  },
  legal: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 16,
  },
});
