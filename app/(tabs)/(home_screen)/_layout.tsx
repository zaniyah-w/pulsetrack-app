import { Stack } from 'expo-router';
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout(){
return (

  <SafeAreaProvider>
    <Stack screenOptions={{headerShown: false}}>

        <Stack.Screen name = "index" options={{title: "Home", presentation: 'modal'}} /> 


        <Stack.Screen name = "steps" options={{title: "Steps", presentation: 'modal'}} /> 

        <Stack.Screen name = "calories" options={{title: "Calories"}} /> 
  
  </Stack>
  </SafeAreaProvider>
  );
}
