import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

export const PORT = process.env.PORT;

const corsOptions = {
	origin: process.env.FRONTEND_URL, // Reemplaza con la URL de tu frontend
};

app.use(cors(corsOptions)); // Usa cors con las opciones configuradas
app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});
