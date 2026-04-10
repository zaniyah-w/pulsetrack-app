import { getTodayDate } from '@/components/RenderDays';
import { getTodayFromDb } from '@/database/db';
import { Entry } from '@/interfaces/interface';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Form to add a new entry to the database
// Make this look pretty later

const [textTime, setTextTime] = useState('Useless Text');
const [textCalories, setTextCalories] = useState('Useless Text');
const [textDescription, setTextDescription] = useState('Useless Text');



async function submitMealEntry() {
  const newMealEntry: Entry = {
    type: "m",
    time: textTime,
    value: textCalories,
    description: textDescription
  }

  try {
    const oldEntryData  = await getTodayFromDb(getTodayDate())[0];
  } catch (e) {
    return null
  }


  router.push("/index")
}

export const newEntry = () => {

  const {todayID} = useLocalSearchParams();
    
  return (
    <SafeAreaProvider>
      <View>
        <TextInput
          onChangeText={setTextTime}
          value={"Enter the time of the meal."}
        />
        <TextInput
          onChangeText={setTextCalories}
          value={"Enter toal calories."}
        />
        <TextInput
          onChangeText={setTextDescription}
          value={"Enter a description of your meal."}
          multiline={true}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => submitMealEntry()}>
          <Text>New Workout Entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

export default newEntry;
const styles = StyleSheet.create({})