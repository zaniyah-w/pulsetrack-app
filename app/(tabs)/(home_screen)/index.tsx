import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router"; 
import React, { useEffect, useState } from "react";
import step_calories from "./step_calories";

function getStepsForday(){
    const minSteps = 100;
    const maxSteps = 18000
    return Math.floor(Math.random() *(maxSteps - minSteps + 1)) + minSteps;
}

function getCaloriesForDay() {
  const minCalories = 50;
  const maxCalories = 3000;
  return Math.floor(Math.random() * (maxCalories - minCalories + 1)) + minCalories;
}

export default function Index() {


    const router = useRouter();

    const steps = getStepsForday();
    const cals = getCaloriesForDay();
    const goal = 18000;  
    const maxCals = 3000;

    const[activateCard, setActivateCard] = useState<"steps"|"calories"|null>(null);

    const handlePress = (type: "steps" | "calories") => {setActivateCard(type);
    };
    
    const [progress_display, setProgress] = useState(0);

    const [cals_display, setCals_display] = useState(0);

    useEffect(() => {

        const steptimeOut = setTimeout(() => {
            setProgress(steps/goal);
        }, 300);

        let start = 0;
        const duration = 1000;
        const increment = cals / (duration / 16);

        const interval = setInterval(() => {
            start = start + increment;
            if (start >= cals){
                setCals_display(cals/maxCals);
                clearInterval(interval);
            }else{
                setCals_display(Math.floor(start));
            }

        },16);

        return () => {
            clearTimeout(steptimeOut);
            clearInterval(interval);
        };

    },[]);

  return (
    <View style= {styles.container}>

        <TouchableOpacity style={styles.card}
        onPress={() => handlePress("steps")}>
            
        <Progress.Circle
        size = {200}
        progress={progress_display}
        thickness={10}
        color="#270787"
        showsText = {true}
        formatText={() => `${steps}/${goal}`}
        animated = {true} 
        direction="clockwise"
        borderWidth={3}
        unfilledColor="#eeeeee37"
        
        textStyle={{ fontSize: 24, fontWeight: '600', }}/>

        <Text style = {styles.label}>Steps For the Day </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.card} onPress={() => handlePress("calories")}>

        <Progress.Circle
        size = {200}
        progress={cals_display}
        thickness={10}
        color="#09b34d"
        showsText = {true}
        formatText={() => `${cals}/${maxCals}`}
        animated={true} 
        direction="counter-clockwise" 
        borderWidth ={3}
        unfilledColor="#eeeeee37"
        
        textStyle={{ fontSize: 24, fontWeight: '600', }}/>

        <Text style = {styles.label}>Calories Burned for the Day </Text>
    </TouchableOpacity>

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
