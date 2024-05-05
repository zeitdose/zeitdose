--- You should run this query using psql < setup_db.sql`
IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'zeitdosedb') THEN
    CREATE DATABASE zeitdosedb;
    CREATE USER zeitdose WITH PASSWORD '123456';
    GRANT ALL PRIVILEGES ON DATABASE zeitdosedb TO zeitdose;
    GRANT USAGE ON SCHEMA public TO zeitdose;
END IF;



