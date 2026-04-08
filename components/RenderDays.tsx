import { Day, Entry } from '@/interfaces/interface';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

// "Day"s are already seperated by the database
// Each "Day" has an array of "Entry" objects saved in string format
// ~ -> Seperates workout/meal 1 from workout/meal 2
// | -> Seperates information in each workout/meal

// Convert entryData string into an array of Entry objects
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

const RenderDays = ({ day }: { day: Day }) => {

    const [entryType, setEntryType] = useState<string | null>(null); // T = Workout, F = Meal

  return (
    <View style={{ flexDirection: "row", padding: 10 }}>

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text>{day.date}</Text>
        <Text>{day.totalSteps}</Text>
        <Text>{day.totalCals}</Text>
      </View>

    </View>
)}

export default RenderDays;
