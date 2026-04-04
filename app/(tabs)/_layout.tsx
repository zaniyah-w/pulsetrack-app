import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0f64e3', 
          tabBarInactiveTintColor: '#ccc9c9',
      }}>

      <Tabs.Screen
        name="(home_screen)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home': 'home-outline'} size={24} color={color} />
        }}/>

      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person': 'person-outline'} size={24} color={color} />
        }}/>

      <Tabs.Screen
        name="(workout_log)"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'journal': 'journal-outline'} size={24} color={color} />
        }}/>
        
    </Tabs>
  );
}
