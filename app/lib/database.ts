import * as SQLite from "expo-sqlite";

import { Register } from "./interfaces";

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("db");
  return db;
};

export const createTables = async () => {
  const db = await openDatabase();

  db.execAsync(`
    CREATE TABLE IF NOT EXISTS register (id INTEGER PRIMARY KEY NOT NULL,day INT , month INT , year INT, date INT, read INT);
  `);
};

export const insertRegister = async (
  day: number,
  month: number,
  year: number,
  date: number,
  read: number,
) => {
  const db = await openDatabase();

  db.execAsync(
    `INSERT INTO register (day, month, year, date, read) VALUES (${day}, ${month}, ${year}, ${date}, ${read})`,
  );
};

export const deleteRegister = async (id: number) => {
  const db = await openDatabase();

  db.execAsync(`DELETE FROM register WHERE id = ${id}`);
};

export const getAllRegisters = async () => {
  const db = await openDatabase();

  const registers = await db.getAllAsync<Register>(`SELECT * FROM register`);

  return registers;
};
