import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/api/tasks", (req, res) => {
	const tasks = db.prepare("SELECT * FROM tasks").all();
	res.json(tasks);
});

router.post("/api/tasks", (req, res) => {
	const { title, description, completed } = req.body;
	const newTask = { title, description, completed: completed ? 1 : 0 };
	if (!newTask.title || !newTask.description) {
		return res.status(400).json({ message: "Title and description are required" });
	}

	const stmt = db.prepare("INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)");
	const result = stmt.run(newTask.title, newTask.description, newTask.completed);

	if (result.changes === 0) {
		return res.status(500).json({ message: "Error creating task" });
	}

	newTask.completed = !!newTask.completed;
	res.status(201).json({ message: "Task created", task: newTask });
});

router.put("/api/tasks/:id", (req, res) => {
	const { id } = req.params;
	const { title, description, completed } = req.body;
	const updatedTask = { title, description, completed: completed ? 1 : 0 };

	const stmt = db.prepare("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?");
	const result = stmt.run(updatedTask.title, updatedTask.description, updatedTask.completed, id);

	if (result.changes === 0) {
		return res.status(404).json({ message: "Task not found" });
	}

	updatedTask.completed = !!updatedTask.completed;
	res.status(200).json({ message: "Task updated", task: updatedTask });
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
