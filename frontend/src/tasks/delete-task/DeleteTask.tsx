import { useLocation, useNavigate } from "react-router-dom";
import { TaskType } from "../../types/taskType";
const URL_API = "http://localhost:3000/api/tasks";
const fetchDeleteTask = async (taskId: number) => {
	const response = await fetch(`${URL_API}/${taskId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	console.log(data);

	return data;
};
export const DeleteTask = () => {
	const task: TaskType = useLocation().state.task;
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
				<h2 className="text-2xl font-semibold mb-4 text-gray-800">Eliminar tarea</h2>
				<p className="mb-4 text-gray-700">
					¿Estás seguro de que quieres eliminar la tarea: <span className="font-bold">{task.title}</span>?
				</p>
				<div className="flex justify-between">
					<span className="text-sm text-gray-500">Estado: {task.completed ? "Completado" : "Pendiente"}</span>
				</div>
				<div className="mt-6 flex justify-end">
					<button
						onClick={() => {
							fetchDeleteTask(task.id!);
							navigate("/");
						}}
						className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Borrar
					</button>
					<button
						onClick={() => {
							window.history.back();
						}}
						className="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
						type="button"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};
