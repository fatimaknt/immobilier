import mysql from 'mysql2/promise';

// Configuration de la connexion MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'location_site',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
};

// Créer un pool de connexions pour de meilleures performances
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
    }
    return pool;
}

// Types pour les résultats MySQL
interface QueryResult {
    insertId?: number;
    affectedRows: number;
}

// Fonction utilitaire pour exécuter des requêtes
export async function query<T = unknown>(
    sql: string,
    params?: unknown[]
): Promise<T[]> {
    const connection = getPool();
    try {
        const [results] = await connection.execute(sql, params);
        return results as T[];
    } catch (error) {
        console.error('Erreur MySQL:', error);
        throw error;
    }
}

// Fonction pour obtenir une seule ligne
export async function queryOne<T = unknown>(
    sql: string,
    params?: unknown[]
): Promise<T | null> {
    const results = await query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
}

// Fonction pour exécuter des insertions et obtenir l'ID
export async function insert(sql: string, params?: unknown[]): Promise<number> {
    const connection = getPool();
    try {
        const [result] = await connection.execute(sql, params) as [QueryResult, unknown];
        return result.insertId || 0;
    } catch (error) {
        console.error('Erreur MySQL insert:', error);
        throw error;
    }
}

// Fonction pour exécuter des mises à jour
export async function update(sql: string, params?: unknown[]): Promise<number> {
    const connection = getPool();
    try {
        const [result] = await connection.execute(sql, params) as [QueryResult, unknown];
        return result.affectedRows;
    } catch (error) {
        console.error('Erreur MySQL update:', error);
        throw error;
    }
}

// Fonction pour exécuter des suppressions
export async function remove(sql: string, params?: unknown[]): Promise<number> {
    const connection = getPool();
    try {
        const [result] = await connection.execute(sql, params) as [QueryResult, unknown];
        return result.affectedRows;
    } catch (error) {
        console.error('Erreur MySQL delete:', error);
        throw error;
    }
}

// Fermer le pool de connexions (utile pour les tests)
export async function closePool(): Promise<void> {
    if (pool) {
        await pool.end();
        pool = null;
    }
}

