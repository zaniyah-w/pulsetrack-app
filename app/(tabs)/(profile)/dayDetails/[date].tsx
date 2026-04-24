import { createDataString, parseDataString } from '@/components/RenderDays';
import { getTodayFromDb, updateDayEntryData } from '@/database/db';
import { Day, Entry } from '@/interfaces/interface';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function DayDetails() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [day, setDay] = useState<Day>();
  const [loading, setIsLoading] = useState<Boolean>(true);


  const handleDeleteEntry = async (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);

    const newEntryData = updatedEntries.map(entry => createDataString(entry)).join("");

    // update DB
    if (day) {
      await updateDayEntryData(newEntryData, day.id.toString());
    }

    // update UI
    setEntries(updatedEntries);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true; // prevents state updates if screen unmounts

      const load = async () => {
        setIsLoading(true);

        if (!date) {
          setIsLoading(false);
          return;
        }

        const data = await getTodayFromDb(date);
        const currentDay = data[0];


        if (!isActive) return;

        if (!currentDay) {
          setEntries([]);
          setIsLoading(false);
          return;
        }

        setDay(currentDay);

        if (currentDay.entryData) {
          const parsed = parseDataString(currentDay.entryData);
          setEntries(parsed);

          if (!entries[entries.length - 1]) {
            handleDeleteEntry(entries.length - 1)
          }
        } else {
          setEntries([]);
        }

        setIsLoading(false);

        console.log(entries)
      };

      load();

      return () => {
        isActive = false; // cleanup when screen loses focus
      };
    }, [date])
  );

  return (

    <View style={styles.container}>

      {loading ? (
        <Text> Loading... </Text>
      ) : (
        <View>
          <Text style={styles.header}>{date}</Text>

          <FlatList
            data={entries}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <View style={styles.entryCard}>
                <View style={styles.row}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>

                {item.description ? (
                  <Text style={styles.description}>{item.description}</Text>
                ) : (
                  <Text style={styles.description}>No Description.</Text>
                )}

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteEntry(index)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>


              </View>
            )}
          />
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f5f7fb',
    paddingTop: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  listContent: {
    paddingBottom: 20,
  },

  entryCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },

  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4f46e5',
  },

  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});