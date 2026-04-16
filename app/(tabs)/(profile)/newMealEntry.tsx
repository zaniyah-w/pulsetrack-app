import { createDataString } from '@/components/RenderDays';
import { getTodayFromDb, updateDayEntryData, updateDayTotalCals } from '@/database/db';
import { Day, Entry } from '@/interfaces/interface';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Form to add a new entry to the database
// TODO:
// 1. Make this look pretty
// 2. Input Validation for text entries






 


async function submitMealEntry(time: string, value: string, description: string, oldDay: Day) {
  const newMealEntry: Entry = {
    type: "m",
    time: time,
    value: value,
    description: description
  }

  console.log("value raw:", JSON.stringify(value));
  console.log("value as number:", Number(value));

  const oldCals = Number(oldDay.totalCals)
  const newCals = oldCals + Number(value);
  const newEntryData = oldDay.entryData + createDataString(newMealEntry);
  await updateDayEntryData(newEntryData, oldDay.id.toString());
  await updateDayTotalCals(newCals, oldDay.id.toString())
  


  router.back();
}


export const newEntry = () => {

  const [textTime, setTextTime] = useState('Useless Text');
  const [textCalories, setTextCalories] = useState('Useless Text');
  const [textDescription, setTextDescription] = useState('Useless Text');
  const [oldDay, setOldDay] = useState<Day [] | []>([]);

  const { todayID } = useLocalSearchParams<{ todayID: string }>();
  const loadData = async (date: string) => {
    const data = await (getTodayFromDb(date))
    setOldDay(data)
  }

  useEffect(() => {
    if (!todayID) return;
    loadData(todayID);
  }, [todayID]);
    
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
          onPress={() => {
            if (!oldDay[0]) return;
            submitMealEntry(textTime, textCalories, textDescription, oldDay[0]);
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

export default newEntry;
const styles = StyleSheet.create({})