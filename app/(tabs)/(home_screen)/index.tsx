import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router"; 

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
    const progress = (Number(steps) / goal) ;

  return (
    <View style= {styles.container}>

        <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("step_calories")}>
            
        <Progress.Circle
        size = {150}
        progress={progress}
        thickness={12}
        color="#270787"
        showsText = {true}
        formatText={() => `${steps}/${goal}`}
        animated={true} />

        <Text style = {styles.label}>Steps For the Day: </Text>
    </TouchableOpacity>


    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },

    label: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        marginTop: 20,
    }
});
