import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function initDatabase() {
  let connection;

  try {
    // Vérifier que les variables d'environnement sont définies
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER || 'root';
    const dbName = process.env.DB_NAME || 'location_site';

    if (dbHost === 'votre-host' || dbUser === 'votre-user') {
      console.error('❌ Erreur : Vous devez remplacer les valeurs d\'exemple par vos vraies informations MySQL');
      console.error('\n📝 Exemple d\'utilisation :');
      console.error('DB_HOST=mysql.example.com DB_USER=monuser DB_PASSWORD=monpassword DB_NAME=location_site DB_PORT=3306 npm run init-db');
      console.error('\n💡 Ou créez un fichier .env.local avec :');
      console.error('DB_HOST=mysql.example.com');
      console.error('DB_USER=monuser');
      console.error('DB_PASSWORD=monpassword');
      console.error('DB_NAME=location_site');
      console.error('DB_PORT=3306');
      process.exit(1);
    }

    console.log('🔌 Connexion à MySQL...');
    console.log(`   Host: ${dbHost}`);
    console.log(`   User: ${dbUser}`);
    console.log(`   Database: ${dbName}`);
    connection = await mysql.createConnection(dbConfig);

    // Créer la base de données si elle n'existe pas
    console.log(`📦 Création de la base de données "${dbName}"...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.query(`USE ${dbName}`);

    console.log('🚀 Création des tables...');

    // Table des appartements
    await connection.query(`
      CREATE TABLE IF NOT EXISTS apartments (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        zone VARCHAR(50) NOT NULL,
        address TEXT NOT NULL,
        rooms INT NOT NULL,
        bathrooms INT NOT NULL,
        surface INT NOT NULL,
        price_per_day DECIMAL(10,2) NOT NULL,
        price_per_week DECIMAL(10,2) NOT NULL,
        available BOOLEAN DEFAULT TRUE,
        equipment JSON,
        coordinates JSON NOT NULL,
        images JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ Table apartments créée');

    // Table des voitures
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id VARCHAR(36) PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        type VARCHAR(100) NOT NULL,
        transmission VARCHAR(50) NOT NULL,
        seats INT NOT NULL,
        price_per_day DECIMAL(10,2) NOT NULL,
        price_per_week DECIMAL(10,2) DEFAULT NULL,
        fuel_type VARCHAR(50) DEFAULT NULL,
        mileage INT DEFAULT NULL,
        available BOOLEAN DEFAULT TRUE,
        features JSON,
        images JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ Table cars créée');

    // Table des images
    await connection.query(`
      CREATE TABLE IF NOT EXISTS images (
        id VARCHAR(36) PRIMARY KEY,
        entity_type VARCHAR(20) NOT NULL,
        entity_id VARCHAR(36) NOT NULL,
        url TEXT NOT NULL,
        alt_text VARCHAR(255) NOT NULL,
        order_index INT DEFAULT 0,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_entity (entity_type, entity_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ Table images créée');

    // Table des réservations
    await connection.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(36) PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        entity_id VARCHAR(36) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_phone VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        payment_method VARCHAR(100) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_dates (start_date, end_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ Table bookings créée');

    // Table des messages de contact
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        attachment_url TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ Table contact_messages créée');

    // Table des témoignages
    await connection.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL,
        rating INT NOT NULL,
        type VARCHAR(20) NOT NULL,
        date DATE NOT NULL,
        approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_approved (approved)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ Table testimonials créée');

    // Créer les index supplémentaires
    try {
      await connection.query('CREATE INDEX idx_apartments_zone ON apartments(zone)');
      await connection.query('CREATE INDEX idx_apartments_available ON apartments(available)');
      await connection.query('CREATE INDEX idx_cars_brand ON cars(brand)');
      await connection.query('CREATE INDEX idx_cars_available ON cars(available)');
      console.log('  ✓ Index supplémentaires créés');
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === 'ER_DUP_KEYNAME') {
        console.log('  ⚠ Index déjà existants, ignorés');
      } else {
        throw error;
      }
    }

    console.log('\n✅ Base de données initialisée avec succès!');

    // Vérifier que les tables existent
    const [tables] = await connection.query("SHOW TABLES") as [Array<{ [key: string]: string }>, unknown];

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

initDatabase().catch(console.error);

