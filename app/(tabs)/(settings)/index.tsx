import { deleteFullDB, getSettings, initializeSettings, updateSettings } from '@/database/db';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function SettingsScreen() {
    const [stepsGoal, setStepsGoal] = useState('');
    const [caloriesGoal, setCaloriesGoal] = useState('');
    const [loading, setLoading] = useState(true);
    const [confirmReset, setConfirmReset] = useState(false);

    // Load settings on mount
    useEffect(() => {
        const loadSettings = async () => {
            const data = await getSettings();

            if (data) {
                setStepsGoal(String(data.stepsGoal));
                setCaloriesGoal(String(data.caloriesGoal));
            }

            setLoading(false);
        };

        loadSettings();
    }, []);

    const handleSave = async () => {
        const steps = Number(stepsGoal);
        const cals = Number(caloriesGoal);

        if (isNaN(steps) || isNaN(cals)) {
            alert("Please enter valid numbers");
            return;
        }

        await updateSettings(steps, cals);

        alert("Settings saved");
    };

    const handleResetPress = async () => {
        if (!confirmReset) {
            setConfirmReset(true);
            return;
        }

        await deleteFullDB();
        setConfirmReset(false);

        await initializeSettings(10000, 2000);

        alert("Database cleared");
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            <Text style={styles.label}>Daily Step Goal</Text>
            <TextInput
                style={styles.input}
                value={stepsGoal}
                onChangeText={setStepsGoal}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Daily Calorie Goal</Text>
            <TextInput
                style={styles.input}
                value={caloriesGoal}
                onChangeText={setCaloriesGoal}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.dangerButton,
                    confirmReset && styles.dangerButtonConfirm
                ]}
                onPress={handleResetPress}
            >
                <Text style={styles.dangerButtonText}>
                    {confirmReset ? "CONFIRM RESET" : "Reset Database"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f7fb',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        color: '#6b7280',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4f46e5',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },

    dangerButton: {
        marginTop: 30,
        backgroundColor: '#dc2626',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },

    dangerButtonConfirm: {
        backgroundColor: '#991b1b', // darker red for warning state
    },

    dangerButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});