import { Stack, Router } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from "react";


export default function _layout(){
return (

  <SafeAreaProvider>
    <Stack>
        <Stack.Screen name = "index"
          options={{headerShown: false}} /> 

  
  </Stack>
  </SafeAreaProvider>
  );
}
