import { Stack, Router } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function _layout(){
return (

  <SafeAreaProvider>
    <Stack screenOptions={{headerShown: false}}>

        <Stack.Screen name = "steps" options={{title: "Steps"}} /> 

        <Stack.Screen name = "calories" options={{title: "Calories"}} /> 
  
  </Stack>
  </SafeAreaProvider>
  );
}
