import { Day, Entry } from '@/interfaces/interface';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    <TouchableOpacity
      style={styles.dayCard}
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: '/dayDetails/[date]',
          params: { date: day.date }
        });
      }}
    >
      {!day.entryData ? (
        <View>
          <Text style={styles.dateText}>{day.date}</Text>
          <Text style={styles.emptyText}>Nothing Logged Today</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.dateText}>{day.date}</Text>
          <Text style={styles.statText}>
            Steps: <Text style={styles.statValue}>{day.totalSteps}</Text>
          </Text>
          <Text style={styles.statText}>
            Calories: <Text style={styles.statValue}>{Number(day.totalCals)}</Text>
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderDays;
const styles = StyleSheet.create({
  dayCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,

    // shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },

    // shadow (Android)
    elevation: 2,
  },

  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },

  statsContainer: {
    marginTop: 4,
  },

  statText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },

  statValue: {
    color: '#111827',
    fontWeight: '600',
  },

  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
});