
export interface Day {
  id: number;
  date: string;
  entryData: string;
  totalSteps: string;
  totalCals: string;
};

export interface Entry {
    type: string; // w = workout, m = meal
    time: string; // time of day this takes place
    value: string; // this will represent steps taken for workouts, or calories consumed for meals
    description: string; // create textbox for user to log what they did
}
