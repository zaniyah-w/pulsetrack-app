import RenderDays from '@/components/RenderDays';
import { getDaysFromDb } from '@/database/db';
import { Day } from '@/interfaces/interface';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';



export default function fullLog() {
  const router = useRouter();

  const [days, setDays] = useState<Day [] | []>([]);
  const [loading, setIsLoading] = useState<boolean | null>(true)

  // run every time screen is visbile
useFocusEffect( // Collect initial information from today
  useCallback(() => {
    setIsLoading(true)
    const loadDays = async () => {
      const fullData = await getDaysFromDb();
      setDays(fullData);
    };
    loadDays();
  }, [])
);

useEffect(() => {
console.log(days);
  setIsLoading(false);
}, [days]);

  return (
    <View>
        {loading ? (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator />
                <Text>Loading...</Text>
              </View>
            ) : (
                <FlatList
                data={days}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <RenderDays day={item} />}
                />
              )
        }
    </View>
  )
}


const styles = StyleSheet.create({})