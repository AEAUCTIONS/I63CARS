import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { colors } from '../theme/tokens';

export function MailIcon({ color = colors.textMuted, size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={14} rx={2.5} stroke={color} strokeWidth={1.6} />
      <Path d="M4 7l8 6 8-6" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

export function BellShieldIcon({ color = colors.primaryBlue, size = 30 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 8a7 7 0 0 1 14 0v3l1.5 3h-17L5 11V8z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function AppleIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={(size * 19) / 16} viewBox="0 0 16 19" fill="#FFFFFF">
      <Path d="M13.1 10.1c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.9zM10.7 2.9c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.4z" />
    </Svg>
  );
}

export function GoogleIcon({ size = 17 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <Path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <Path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <Path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.42 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </Svg>
  );
}
