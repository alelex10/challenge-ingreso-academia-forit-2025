import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/api/tasks",  (req, res) => {
	const tasks = db.prepare("SELECT * FROM tasks").all();
	res.json(tasks);
});

router.post("/api/tasks", (req, res) => {
	const { title, description } = req.body;
	const newTask = { title, description };
	

	const stmt = db.prepare("INSERT INTO tasks (title, description) VALUES (?, ?)");
	stmt.run(newTask.title, newTask.description);
	res.status(201).json({ message: "Task created", task: newTask });

});

router.put("/api/tasks/:id", (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;
	const stmt = db.prepare("UPDATE tasks SET title = ?, description = ? WHERE id = ?");
	const result = stmt.run(title, description, id);

	if (result.changes === 0) {
		return res.status(404).json({ message: "Task not found" });
	}

	res.status(200).json({ message: "Task updated" });
});

router.delete("/api/tasks/:id", (req, res) => {
	const { id } = req.params;
	const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
	const result = stmt.run(id);
	
	if (result.changes === 0) {
		return res.status(404).json({ message: "Task not found" });
	}

	res.status(200).json({ message: "Task deleted" });
});

export default router;
