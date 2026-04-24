PULSETRACK

Fitness app where you are able to:
1. Track/Record your steps
2. Plot locations for your next workout along with the steps and miles it would take to arrive there
3. Record Workouts in a log

Install Dependencies
1. install everything from package.json
2. install react-native-maps
3. install expo-sqlite

High-Level File Overview

app/(tabs)/(profile)/index.tsx
1. shows profile picture, settings for account settings like password, email, etc., dark/light mode, etc along with sign out button
2. when sign out button is clicked, it goes back to sign in screen

app/(tabs)/(home_screen)/index.tsx
1. home screen shows on render the amount of steps walked and the amount of calories you burned in exchange
2. shows butttons on the bottom of the screen to go to other factions of the app(profile, map, settings, home)

app/(tabs)/(workout_log)/index.tsx
1.Shows list of already added workouts and allows user to add more
2. shows add button where you can click, it shows a map, and you can plot points for your next workout
2.adds the route to flatlist along with the miles and the amount of steps it would take along with calories
