import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


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



export const steps = () => {
  return (
    <View>
        <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 20 }}>
                    <Text>{item.dayOfWeek.toString()}</Text>
                    <Text> Today, you walked {numOfSteps.toString()} steps!</Text>
                    <Text> That is equal to {numofMiles.toFixed(2).toString()} miles.</Text>
                    <Text> To get to your maximum step goal, here are some suggestions:</Text>

                </View>
            )}
        />
    </View>
)}

export default steps;

const styles = StyleSheet.create({})


