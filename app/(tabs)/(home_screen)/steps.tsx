import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

// const {numOfSteps} = useLocalSearchParams(); Dynamic rendering not working for some reason
const numOfSteps = Math.floor(10000/7); // Placeholder value for testing purposes, replace with dynamic value when possible
const numofMiles = Number(numOfSteps) * 0.000473484848;

const DATA = [
{ id: '1', dayOfWeek: 'Tuesday', title: 'First Item' },
{ id: '2', dayOfWeek: 'Wednesday', title: 'Second Item' },
{ id: '3', dayOfWeek: 'Thursday', title: 'Second Item' },
{ id: '4', dayOfWeek: 'Friday', title: 'Second Item' },
{ id: '5', dayOfWeek: 'Saturday', title: 'Second Item' },
{ id: '6', dayOfWeek: 'Sunday', title: 'Second Item' },
];



export const step_calories = () => {
  return (
    <View>
        <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 20 }}>
                    <text>{item.dayOfWeek}</text>
                    <text> Today, you walked {numOfSteps} steps!</text>
                    <text> That is equal to {numofMiles.toFixed(2)} miles.</text>
                    <text> To get to your maximum step goal, here are some suggestions:</text>

                </View>
            )}
        />
    </View>
)}

export default step_calories

const styles = StyleSheet.create({})


