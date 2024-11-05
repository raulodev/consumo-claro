import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { Register } from "./interfaces";

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("db", {
    useNewConnection: true,
  });
  return db;
};

export const createTables = async () => {
  if (Platform.OS === "web") return;

  const db = await openDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS register (id INTEGER PRIMARY KEY NOT NULL,day INT , month INT , year INT, date INT, read INT , image TEXT);
  `);
};

export const insertRegister = async (
  day: number,
  month: number,
  year: number,
  date: number,
  read: number,
  image?: string,
) => {
  const db = await openDatabase();
  if (Platform.OS === "web") return;
  await db.execAsync(
    `INSERT INTO register (day, month, year, date, read , image) VALUES (${day}, ${month}, ${year}, ${date}, ${read}, '${image}')`,
  );
};

export const updateRegister = async (id: number, read: number, image?: string) => {
  if (Platform.OS === "web") return;
  const db = await openDatabase();
  await db.execAsync(`UPDATE register SET  read = ${read}, image = '${image}' WHERE id = ${id}`);
};

export const deleteRegister = async (id: number) => {
  if (Platform.OS === "web") return;
  const db = await openDatabase();
  await db.execAsync(`DELETE FROM register WHERE id = ${id}`);
};

export const getAllRegisters = async () => {
  if (Platform.OS === "web") return [];

  const db = await openDatabase();
  const registers = await db.getAllAsync<Register>(`SELECT * FROM register`);
  return registers;
};
