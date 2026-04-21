import { Day, Entry } from '@/interfaces/interface';
import React from 'react';
import { Text, View } from 'react-native';

// "Day"s are already seperated by the database
// Each "Day" has an array of "Entry" objects saved in string format
// ~ -> Seperates workout/meal 1 from workout/meal 2
// | -> Seperates information in each workout/meal

// Convert entryData string into an array of Entry objects


export function parseDataString(fullData: string): Entry[] {
  return fullData.split('~').map((value) => {
    const splitString = value.split("|");

    return {
      type: splitString[0],
      time: splitString[1],
      value: splitString[2],
      description: splitString[3]
    };
  });
}

export function createDataString(entry: Entry) {
  const type = entry.type.toString();
  const time = entry.time.toString();
  const value = entry.value.toString();
  const description = entry.description;

  return type + "|" + time + "|" + value + "|" + description + "~";
}

export function getTodayDate() {
      const todayDate = new Date();
    const day = todayDate.getDate();
    const month = todayDate.getMonth() + 1; 
    const year = todayDate.getFullYear();
    if (day < 10) {
      return `${month}|0${day}|${year}` // add leading 0 to day for formatting
    } else {
      return `${month}|${day}|${year}`
    }
}

const RenderDays = ({ day }: { day: Day }) => {



  return (

    
    <View style={{ flexDirection: "row", padding: 10 }}>

      {!day.entryData ? (
        <View>
        <Text>Nothing Logged Today</Text>
        </View>
      ) : (
        <View>
          <Text>Date: {day.date}</Text>
          <Text>Total Steps: {day.totalSteps}</Text>
          <Text>Total Calories: {Number(day.totalCals)}</Text>
        </View>
      )}
      

    </View>
)}

export default RenderDays;
