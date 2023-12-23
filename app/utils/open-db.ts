import * as SQLite from "expo-sqlite";

export const openDatabase = () => {
  const db = SQLite.openDatabase("db.db");
  return db;
};
