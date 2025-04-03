import { useEffect, useState } from "react";
import { TaskType } from "../../types/taskType";
import { Link } from "react-router-dom";

const dataFormUpdate = (task: TaskType) => {
	return {
		formTitle: "Actualizar tarea",
		textBotton: "Actualizar",
		task: task,
	};
};

const fetchTasks = async (): Promise<Array<TaskType>> => {
	const response = await fetch("http://localhost:3000/api/tasks");
	const data = await response.json();
	return data;
};
const TaskList = () => {
	const [tasks, setTasks] = useState<Array<TaskType>>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchTasks()
			.then((data) => setTasks(data))
			.catch((error) => setError("No se pudo conectar con la API: " + error));
	}, []);
	if (error) {
		return <div className="text-center py-4">Error: {error}</div>;
	}
	if (tasks.length === 0) {
		return <div className="text-center py-4">Loading...</div>;
	}

	return (
		<div className="w-full">
			<table className="table-fixed">
				<thead className="bg-gray-50">
					<tr className="w-full">
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titulo</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Descripcion
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Creado el
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{tasks.map((task, index) => (
						<tr key={task.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
							<td className="px-6 py-4 ">
								<div className="text-sm text-gray-900 line-clamp-1">
									<Link to={`/task`} state={{ task }} className="hover:text-blue-500">
										{task.title}
									</Link>
								</div>
							</td>
							<td className="px-6 py-4 ">
								<div className="text-sm text-gray-900 line-clamp-1">{task.description}</div>
							</td>
							<td className="px-6 py-4 ">
								<div className="text-sm text-gray-900">{new Date(task.createdAt).toLocaleDateString()}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<Link
									to={`/formTask`}
									state={dataFormUpdate(task)}
									className="text-indigo-600 hover:text-indigo-900 px-2"
								>
									Editar
								</Link>
								<Link to={`/deleteTask`} state={{ task }} className="text-red-600 hover:text-red-900 px-2">
									Eliminar
								</Link>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={4}>
							<Link
								to="/formTask"
								state={{ formTitle: "Crear Tarea", textBotton: "Crear" }}
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							>
								Crear Tarea
							</Link>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default TaskList;
