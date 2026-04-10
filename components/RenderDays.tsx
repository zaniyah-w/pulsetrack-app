import { Day, Entry } from '@/interfaces/interface';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

// "Day"s are already seperated by the database
// Each "Day" has an array of "Entry" objects saved in string format
// ~ -> Seperates workout/meal 1 from workout/meal 2
// | -> Seperates information in each workout/meal

// Convert entryData string into an array of Entry objects

const [entryType, setEntryType] = useState<string | null>(null); // T = Workout, F = Meal

function parseDataString(fullData: string) { // will take in a entryData string from each Day
    const dataStrings = fullData.split('~'); // data should look like: ["...|...|...|...", "...|...|...|...", "...|...|...|..."]
    const entryArray: Entry [] = [];

    dataStrings.forEach((value, index, array) => {
        const splitString = value.split("|");
        const newEntry: Entry = {
            type: splitString[0],
            time: splitString[1],
            value: splitString[2],
            description: splitString[3]
        }

        entryArray.push(newEntry);

        return entryArray;
});
}

export function createDataString(entry: Entry) {
  const type = entry.type.toString();
  const time = entry.time.toString();
  const value = entry.value.toString();
  const description = entry.description;

  return type + "|" + time + "|" + value + "|" + description;
}

export function getTodayDate() {
      const todayDate = new Date();
    const day = todayDate.getDate();
    const month = todayDate.getMonth() + 1; 
    const year = todayDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`; // Collect today's date to load profile

    return formattedDate;
}

const RenderDays = ({ day }: { day: Day }) => {



  return (
    
    <View style={{ flexDirection: "row", padding: 10 }}>
      <Text>Date: {day.date}</Text>
      <Text>Total Steps: {day.totalSteps}</Text>
      <Text>Total Calories: {day.totalCals}</Text>
      

    </View>
)}

export default RenderDays;
