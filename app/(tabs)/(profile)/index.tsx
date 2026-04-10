import RenderDays, { getTodayDate } from "@/components/RenderDays";
import { addDayToDb, getTodayFromDb } from "@/database/db";
import { Day } from "@/interfaces/interface";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


function handlePress() {
  return null;
}

export default function ProfileScreen() {
  const router = useRouter();

  const [days, setDays] = useState<Day [] | []>([]);

  // run every time screen is visbile
  useFocusEffect(() => {
    const formattedDate = getTodayDate();

    const loadDays = async () => {
      const todayData = await getTodayFromDb(formattedDate);
      setDays(todayData);
    }
    loadDays()

    if (!days[0]) { // Meaning today's day in database is completely blank, we need to create it
      addDayToDb(formattedDate, "", 0, 0);
      loadDays()
    }
  })

  // params: {todayID: days[0].date}
  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>

      <View style = {{flex: 3, justifyContent: "center", alignItems: "center"}}> 
          <FlatList
          data={days}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <RenderDays day={item} />}
        />
      </View>

      {!days[0] ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity style={styles.card}
        onPress={() => router.push('./newWorkoutEntry')}>
            <Text style={styles.label}>New Workout Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}
        onPress={() => router.push({pathname:'./newMealEntry'})}>
            <Text style={styles.label}>New Meal Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}
        onPress={() => router.push('./full_log')}>
          <Text style={styles.label}>View Full Log</Text>
        </TouchableOpacity>
      </View>
      ) : (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity style={styles.card}
        onPress={() => router.push('./newWorkoutEntry')}>
            <Text style={styles.label}>New Workout Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}
        onPress={() => router.push({pathname:'./newMealEntry', params: {todayID: days[0].date}})}>
            <Text style={styles.label}>New Meal Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}
        onPress={() => router.push('./full_log')}>
          <Text style={styles.label}>View Full Log</Text>
        </TouchableOpacity>
      </View>
      )}

      
    </View>
    
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },

    label: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 80,
    },

    card:{
        fontSize: 18,
        color: "black",
        fontWeight: "medium",
        alignItems: "center"
    }
});