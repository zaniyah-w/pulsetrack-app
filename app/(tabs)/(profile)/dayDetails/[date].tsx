import { parseDataString } from '@/components/RenderDays';
import { getTodayFromDb } from '@/database/db';
import { Entry } from '@/interfaces/interface';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function DayDetails() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!date) return;

      const day = await getTodayFromDb(date);
      if (!day[0]?.entryData) return;

      const parsed = parseDataString(day[0].entryData);
      setEntries(parsed);
    };

    load();
  }, [date]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{date}</Text>

      <FlatList
        data={entries}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>

            {item.time ? (
              <View>
                <View style={styles.row}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>

                <Text style={styles.description}>{item.description}</Text>
              </View>
            ) : (
              <Text style={styles.description}>Nothing logged today.</Text>
            )}

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});