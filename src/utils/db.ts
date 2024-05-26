import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Conexão com o banco de dados
const dbPromise = open({
    filename: '../hack.db',
    driver: sqlite3.Database
});



export default dbPromise;