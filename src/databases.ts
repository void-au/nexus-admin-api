import { Pool } from "pg";

/**
 * Start up a connection to the database
 * 
 * Testing: Postgresql
 */
export const connect_db = async () => {
    const database_type = process.env.DATABASE;
    console.log("Database type: ", database_type);

    switch (database_type) {
        case "postgres":
            return await connect_pg();
            break;
        default:
            console.log("No database type specified.");
            break;
    }
}

/**
 * Connect to a Postgresql database
 */
export const connect_pg = async () => {
    const pool = new Pool({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT)
    });

    try {
        await pool.connect();
        console.log("Connected to Postgresql database.");
    } catch (error) {
        console.log("Error connecting to Postgresql database.");
        console.log(error);
    }

    return {
        database_type: "postgresql",
        pool: pool,
    }
}