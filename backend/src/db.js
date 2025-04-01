import Database from 'better-sqlite3';

const dbPath = "E:\\PROGRAMACION\\Aprendiendo\\NodeJs\\3-fazt\\1-api-rest-sql-postgres\\database\\database.db";

const db = new Database(dbPath);

export default db;
