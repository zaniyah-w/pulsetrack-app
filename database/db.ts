/* 
Create and export database
Create and export function to initialize favorites table inside database
    Each favorites item should consist of the following properities: 
        id (INTEGER), name (TEXT), image (TEXT), specs(TEXT)

Create and export function that adds a character to the favorites table

Create and export function that removes a character from the favorites table

Create and export function that reads and returns all data from the favorites table 
*/
import * as SQLite from "expo-sqlite";
import { Day } from "../interfaces/interface";

// Create DB and export
export const db = SQLite.openDatabaseSync("favorites.db");

//Create and export function to initialize days table inside database
export const initDatabase = async () => {
  try {
    // from the db we just created, use execAsync to create new table
    await db.execAsync(`
            PRAGMA journal_mode = WAL;
            
            CREATE TABLE IF NOT EXISTS days (
                id INTEGER PRIMARY KEY,
                date TEXT,
                entryData TEXT,
                totalSteps TEXT,
                totalCals TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
        `);
  } catch (e) {
    console.log("Error: ", e);
  }
};

// Create and export function that adds a day to the days table
export const addDayToDb = async (day: Day) => {
    // try to add char to favorites
    try {
        await db.runAsync(
            `INSERT INTO days (id, date, entryData, totalSteps, totalCals)
            VALUES (?, ?, ?, ?, ?)`,
            [day.id, day.date, day.entryData, day.totalSteps, day.totalCals]
        );
    } catch (e) {
        console.log("addDayToDb: ", e)
    }
};

// Create and export function that reads and returns all data from the days table 
export const getDaysFromDb = async (): Promise<Day []> => {
    try {
        // get results from db
        const result = await db.getAllAsync<Day>(
            `SELECT * FROM days
            ORDER BY created_at DESC`
        );
        return result
    } catch (e) {
        console.log("getDaysFromDb: ", e)
        return []
    }
}

// Only returns information from current date
export const getTodayFromDb = async (date: string): Promise<Day []> => {
    try {
        // get results from db
        const result: Day [] = await db.getAllAsync<Day>(
            `SELECT * FROM days WHERE date = ?`, [date]);
        return result
    } catch (e) {
        console.log("getTodayFromDb: ", e)
        const result: Day [] = []
        return result
    }
}

// Delete day from database
export const deleteDayFromDb = async (id: number) => {

    try {
        await db.runAsync(`DELETE FROM days WHERE id = ?`,
            [id]
        );
    } catch (e) {
        console.log("deleteDaysFromDb Error: ", e)
    }
}

// Update entryData from database
export const updateDayEntryData = async (id: number, entryData: string) => {

    try {
        await db.runAsync(`UPDATE days SET entryData = ? WHERE id = ?`, [entryData, id]);
    } catch (e) {
        console.log("updateDay Error: ", e);
    }
}

export const updateDayTotalSteps = async (id: number, totalSteps: string) => {

    try {
        await db.runAsync(`UPDATE days SET totalSteps = ? WHERE id = ?`, [totalSteps, id]);
    } catch (e) {
        console.log("updateDay Error: ", e);
    }
}

export const updateDayTotalCals = async (id: number, totalCals: string) => {

    try {
        await db.runAsync(`UPDATE days SET totalCals = ? WHERE id = ?`, [totalCals, id]);
    } catch (e) {
        console.log("updateDay Error: ", e);
    }
}