import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/tokens';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  center?: boolean;
};

export function Screen({ children, style, center }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.flex, center && styles.centered, style]}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  flex: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
  },
});
