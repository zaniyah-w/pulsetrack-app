import RenderDays, { getTodayDate, parseDataString } from "@/components/RenderDays";
import { addDayToDb, deleteFullDB, getTodayFromDb } from "@/database/db";
import { Day } from "@/interfaces/interface";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


function handlePress() {
  return null;
}

export default function ProfileScreen() {
  const router = useRouter();

  const [days, setDays] = useState<Day [] | []>([]);
  const formattedDate = getTodayDate();
  const [loading, setIsLoading] = useState<boolean | null>(true)

  // run every time screen is visbile
useFocusEffect( // Collect initial information from today
  useCallback(() => {
    setIsLoading(true)
    const loadDays = async () => {
      const todayData = await getTodayFromDb(formattedDate);
      setDays(todayData);
    };
    loadDays();
  }, [])
);

useEffect(() => { // When informaton comes, check for any errors
  const reloadDays = async () => {
    await addDayToDb(formattedDate, "", 0, 0);
    const todayData = await getTodayFromDb(formattedDate);
    setDays(todayData);
  };

  if (!days[0]) {
    reloadDays();
    return;
  }

  const allEntries = parseDataString(days[0].entryData);

  console.log(days);
  setIsLoading(false);
}, [days]);

  // params: {todayID: days[0].date}
  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>

      <View style = {{flex: 2, justifyContent: "center", alignItems: "center"}}> 
          <FlatList
          data={days}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <RenderDays day={item} />}
        />
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator />
        <Text>Loading...</Text>
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
        onPress={() => deleteFullDB()}>
          <Text style={styles.label}>Clear DB</Text>
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
        fontSize: 10,
        color: "black",
        fontWeight: "medium",
        alignItems: "center"
    }
});
