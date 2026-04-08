import RenderDays from "@/components/RenderDays";
import { getDaysFromDb } from "@/database/db";
import { Day } from "@/interfaces/interface";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";



export default function ProfileScreen() {

  const [days, setDays] = useState<Day [] | []>([]);

  // run every time screen is visbile
  useFocusEffect(() => {
    const loadDays = async () => {
      const newDays = await getDaysFromDb()
      setDays(newDays)
    }
    loadDays()
  })

  return (
    <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={days}
        keyExtractor={(day) => day.id.toString()}
        renderItem={({item}) => (<RenderDays day={item}/>)}
    />
    </View>
  );
}