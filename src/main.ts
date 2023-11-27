import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connect_db } from "./databases";
import { connect } from "http2";
dotenv.config();

const app = express();

export const start = async () => {
    setup_app(app);

    const db = await connect_db();
    console.log("Got the database: ", db);

    db?.pool.query("SELECT * FROM User", (err, res) => {
        if (err) {
            console.log("Error querying the database.");
            console.log(err);
        } else {
            console.log("Got the database response: ", res.rows);
        }
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}...`);
    });
}

export const setup_app = (app: express.Application) => {
    app.disable('x-powered-by'); // Disable the x-powered-by header
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

start();