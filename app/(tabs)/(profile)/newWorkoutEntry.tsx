import { createDataString } from '@/components/RenderDays';
import { getTodayFromDb, updateDayEntryData, updateDayTotalSteps } from '@/database/db';
import { Day, Entry } from '@/interfaces/interface';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Form to add a new entry to the database
// TODO:
// 1. Make this look pretty
// 2. Input Validation for text entries









async function submitWorkoutEntry(time: string, value: string, description: string, oldDay: Day) {
  const newWorkoutEntry: Entry = {
    type: "w",
    time: time,
    value: value,
    description: description
  }

  console.log("value raw:", JSON.stringify(value));
  console.log("value as number:", Number(value));

  const oldSteps = Number(oldDay.totalSteps)
  const newSteps = oldSteps + Number(value);
  const newEntryData = oldDay.entryData + createDataString(newWorkoutEntry);
  await updateDayEntryData(newEntryData, oldDay.id.toString());
  await updateDayTotalSteps(newSteps, oldDay.id.toString())



  router.back();
}

function convertTo24Hour(hour: string, minute: string, period: 'AM' | 'PM') {
  let h = Number(hour);
  const m = minute.padStart(2, '0');

  if (period === 'PM' && h !== 12) {
    h += 12;
  }

  if (period === 'AM' && h === 12) {
    h = 0;
  }

  return `${h.toString().padStart(2, '0')}:${m}`;
}



export const newWorkoutEntry = () => {

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [textSteps, setTextSteps] = useState('');
  const [textDescription, setTextDescription] = useState('');
  const [oldDay, setOldDay] = useState<Day[] | []>([]);

  const { todayID } = useLocalSearchParams<{ todayID: string }>();
  const loadData = async (date: string) => {
    const data = await (getTodayFromDb(date))
    setOldDay(data)
  }

  useEffect(() => {
    if (!todayID) return;
    loadData(todayID);
  }, [todayID]);

  const togglePeriod = () => {
    setPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'));
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>

        <View style={styles.formCard}>
          <Text style={styles.label}>Time</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>

            <TextInput
              style={[styles.input, { flex: 1, textAlign: 'center' }]}
              value={hour}
              onChangeText={setHour}
              keyboardType="numeric"
              maxLength={2}
              placeholder="HH"
            />

            <Text style={{ fontSize: 18 }}>:</Text>

            <TextInput
              style={[styles.input, { flex: 1, textAlign: 'center' }]}
              value={minute}
              onChangeText={setMinute}
              keyboardType="numeric"
              maxLength={2}
              placeholder="MM"
            />

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={togglePeriod}
            >
              <Text style={styles.toggleText}>{period}</Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.label}>Steps</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTextSteps}
            value={textSteps}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            onChangeText={setTextDescription}
            value={textDescription}
            multiline
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !oldDay[0] && styles.buttonDisabled
          ]}
          disabled={!oldDay[0]}
          onPress={() => {
            if (!oldDay[0]) return;
            const time24 = convertTo24Hour(hour, minute, period);

            submitWorkoutEntry(time24, textSteps, textDescription, oldDay[0]);
          }}
        >
          <Text style={styles.buttonText}>
            {!oldDay[0] ? "Loading..." : "Submit"}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaProvider>
  )
}

export default newWorkoutEntry;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
    justifyContent: 'space-between',
  },

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonDisabled: {
    backgroundColor: '#a5b4fc',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  toggleText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});