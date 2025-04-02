import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

const corsOptions = {
	origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
};

app.use(cors(corsOptions)); // Usa cors con las opciones configuradas
app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});
