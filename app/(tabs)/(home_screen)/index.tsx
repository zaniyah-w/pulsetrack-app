import { getTodayDate } from "@/components/RenderDays";
import { getSettings, getTodayFromDb, initDatabase, initializeSettings } from "@/database/db";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";


export default function Index() {


    const router = useRouter();

    const formattedDate = getTodayDate();

    const [steps, setSteps] = useState(0);
    const [stepsGoal, setStepsGoal] = useState(0);
    const [calories, setCalories] = useState(0);
    const [caloriesGoal, setCaloriesGoal] = useState(0);

    const [stepsProgress, setStepsProgress] = useState(0);
    const [caloriesProgress, setCaloriesProgress] = useState(0);
    const [loading, setIsLoading] = useState<Boolean | null>(true);
    const [activateCard, setActivateCard] = useState<"numOfSteps" | "calories" | null>(null);
    const handlePress = (type: "numOfSteps" | "calories") => {
        setActivateCard(type);
    };


    useFocusEffect(
        useCallback(() => {
            initDatabase(); // Run database for the first time, creating it if it doesnt exist
            initializeSettings(18000, 3000);

            const loadData = async () => {
                setIsLoading(true); // reset when screen refocuses
                // get today's data
                const today = await getTodayFromDb(formattedDate);

                if (today[0]) {
                    setSteps(Number(today[0].totalSteps));
                    setCalories(Number(today[0].totalCals));
                }

                // get settings
                const settings = await getSettings() as {
                    stepsGoal: number;
                    caloriesGoal: number;
                } | null;

                if (settings) {
                    setStepsGoal(settings.stepsGoal);
                    setCaloriesGoal(settings.caloriesGoal);
                    console.log("Settings", {
                    stepsGoal,
                    caloriesGoal,
                });
                }


                setIsLoading(false);
            };

            loadData();
        }, [formattedDate])
    );

    useEffect(() => {

        if (loading) return;
        if (!stepsGoal || !caloriesGoal) return;

        console.log("ANIMATION TRIGGERED", {
            loading,
            steps,
            stepsGoal,
            calories,
            caloriesGoal,
        });


        // --- STEPS ---
        const stepTimeout = setTimeout(() => {
            const stepRatio = Math.min(steps / stepsGoal, 1);
            setStepsProgress(stepRatio);
        }, 200);

        // --- CALORIES ---
        let start = 0;
        const duration = 800;
        const frameRate = 16;
        const totalFrames = duration / frameRate;

        const target = Math.min(calories / caloriesGoal, 1);
        const increment = target / totalFrames;

        const interval = setInterval(() => {
            start += increment;

            if (start >= target) {
                setCaloriesProgress(target);
                clearInterval(interval);
            } else {
                setCaloriesProgress(start);
            }
        }, frameRate);


        return () => {
            clearTimeout(stepTimeout);
            clearInterval(interval);
        };

    }, [loading, steps, stepsGoal, calories, caloriesGoal]);


    return (
        <View style={styles.container}>
            <Link href={"./steps"} asChild>
                <TouchableOpacity style={styles.card}
                    onPress={() => handlePress("numOfSteps")}>


                    <Progress.Circle
                        size={200}
                        progress={stepsProgress}
                        thickness={10}
                        color="#270787"
                        showsText={true}
                        formatText={() => `${steps}/${stepsGoal}`}
                        animated={true}
                        direction="clockwise"
                        borderWidth={3}
                        unfilledColor="#eeeeee37"

                        textStyle={{ fontSize: 24, fontWeight: '600', }} />

                    <Text style={styles.label}>Steps For the Day </Text>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.card} onPress={() => handlePress("calories")}>

                <Progress.Circle
                    size={200}
                    progress={caloriesProgress}
                    thickness={10}
                    color="#09b34d"
                    showsText={true}
                    formatText={() => `${calories}/${caloriesGoal}`}
                    animated={true}
                    direction="counter-clockwise"
                    borderWidth={3}
                    unfilledColor="#eeeeee37"

                    textStyle={{ fontSize: 24, fontWeight: '600', }} />

                <Text style={styles.label}>Calories Burned for the Day </Text>
            </TouchableOpacity>

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
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

    card: {
        fontSize: 18,
        color: "black",
        fontWeight: "medium",
        alignItems: "center"
    }
});
