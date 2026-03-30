import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0081C8', 
          tabBarInactiveTintColor: '#aaa',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home': 'home-outline'} size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="(home screen)"
        options={{
          title: 'Home Screen',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home': 'home-outline'} size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
