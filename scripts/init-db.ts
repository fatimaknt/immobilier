import mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: parseInt(process.env.DB_PORT || '3306'),
  multipleStatements: true, // Permet d'exécuter plusieurs requêtes SQL
};

async function initDatabase() {
  let connection;
  
  try {
    console.log('🔌 Connexion à MySQL...');
    connection = await mysql.createConnection(dbConfig);
    
    // Créer la base de données si elle n'existe pas
    const dbName = process.env.DB_NAME || 'location_site';
    console.log(`📦 Création de la base de données "${dbName}"...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.query(`USE ${dbName}`);
    
    // Lire le fichier SQL
    const sqlPath = path.join(process.cwd(), 'mysql-schema.sql');
    console.log(`📄 Lecture du fichier SQL: ${sqlPath}`);
    
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Le fichier ${sqlPath} n'existe pas`);
    }
    
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    
    // Nettoyer le SQL : supprimer les lignes USE et CREATE DATABASE
    let cleanedSql = sql
      .replace(/CREATE DATABASE[^;]+;/gi, '')
      .replace(/USE[^;]+;/gi, '');
    
    // Exécuter le SQL complet avec multipleStatements
    console.log(`🚀 Exécution du schéma SQL...`);
    
    try {
      await connection.query(cleanedSql);
      console.log(`  ✓ Schéma SQL exécuté avec succès`);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string; sql?: string };
      // Ignorer les erreurs de table/index déjà existant
      if (err.code === 'ER_TABLE_EXISTS_ERROR' || 
          err.code === 'ER_DUP_ENTRY' || 
          err.code === 'ER_DUP_KEYNAME' ||
          err.code === 'ER_NO_SUCH_TABLE') {
        console.log(`  ⚠ Certaines tables/index peuvent déjà exister, continuation...`);
      } else {
        console.error(`  ✗ Erreur SQL:`, err.message);
        if (err.sql) {
          console.error(`  SQL problématique:`, err.sql.substring(0, 200));
        }
        throw error;
      }
    }
    
    console.log('✅ Base de données initialisée avec succès!');
    
    // Vérifier que les tables existent
    const [tables] = await connection.query(
      "SHOW TABLES"
    ) as [Array<{ [key: string]: string }>, unknown];
    
    console.log('\n📊 Tables créées:');
    tables.forEach((table) => {
      const tableName = Object.values(table)[0];
      console.log(`  - ${tableName}`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Exécuter l'initialisation
initDatabase().catch(console.error);

