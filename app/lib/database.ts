import * as SQLite from "expo-sqlite";

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("db");
  return db;
};

export const createTables = async () => {
  const db = await openDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS register (id INTEGER PRIMARY KEY NOT NULL,day INT , month INT , year INT, date INT, read INT);
  `);
};
