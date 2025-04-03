import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import taskRoutes from "./routes/task.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
	origin: process.env.REACT_APP_CLIENT_URL, // Reemplaza con la URL de tu frontend
};

app.use(cors(corsOptions)); // Usa cors con las opciones configuradas
app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});
