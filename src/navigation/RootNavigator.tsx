import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { HomePlaceholderScreen } from '../screens/HomePlaceholderScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Boots to Welcome — no guest access. Home is only reachable after OTP
// verification, per design_handoff_aeparts_marketplace/README.md.
export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Home" component={HomePlaceholderScreen} />
    </Stack.Navigator>
  );
}
