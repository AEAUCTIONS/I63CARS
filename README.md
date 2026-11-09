# AEPARTS

Motorcycle parts & service marketplace app for the UAE & Saudi Arabia (React Native + Expo).

Built from a design handoff (not committed here — ask the team for the source `.dc.html`
prototype, API spec, and garages seed data).

## Status

Auth flow only so far: Welcome → Sign In (email + UAE phone, OTP dispatch) → OTP verification →
placeholder landing screen. Everything else (Home, catalog, cart, garages, chat, seller
dashboard, USA import, etc.) is not yet built.

Auth is demo-only right now: OTP accepts any 6 digits, and there is no backend yet.

## Run it

```bash
npm install
npm run web      # fastest way to preview in a browser
npm run ios      # requires macOS
npm run android
```

## Structure

```
App.tsx                    entry point: font loading, navigation, toast provider
src/theme/tokens.ts         colors, type scale, spacing, radii, shadows (from the design handoff)
src/components/             shared primitives (Button, TextField, OtpInput, Screen, Toast, icons)
src/screens/                one file per screen
src/navigation/              React Navigation stack + route param types
```
