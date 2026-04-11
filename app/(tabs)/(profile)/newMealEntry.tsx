import { createDataString, getTodayDate } from '@/components/RenderDays';
import { getTodayFromDb, updateDayEntryData } from '@/database/db';
import { Day, Entry } from '@/interfaces/interface';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Form to add a new entry to the database
// Make this look pretty later






 


async function submitMealEntry(time: string, value: string, description: string, oldDay: Day) {
  const newMealEntry: Entry = {
    type: "m",
    time: time,
    value: value,
    description: description
  }

  const newEntryData = oldDay.entryData + createDataString(newMealEntry);
  updateDayEntryData(newEntryData, oldDay.id.toString());
  


  router.back();
}

export const newEntry = () => {

  const [textTime, setTextTime] = useState('Useless Text');
  const [textCalories, setTextCalories] = useState('Useless Text');
  const [textDescription, setTextDescription] = useState('Useless Text');
  const [oldDay, setOldDay] = useState<Day [] | []>([]);

  const todayDate = getTodayDate();

  const loadData = async (date: string) => {
    const data = await (getTodayFromDb(date))
    setOldDay(data)
  }
  loadData(todayDate[0]);
    
  return (
    <SafeAreaProvider>
      <View>
        <TextInput
          onChangeText={setTextTime}
          value={textTime}
        />
        <TextInput
          onChangeText={setTextCalories}
          value={textCalories}
        />
        <TextInput
          onChangeText={setTextDescription}
          value={textDescription}
          multiline={true}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => submitMealEntry(textTime, textDescription, textCalories, oldDay[0])}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

export default newEntry;
const styles = StyleSheet.create({})