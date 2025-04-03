import { ChangeEvent, useEffect, useState } from "react";
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
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchTasks()
			.then((data) => setTasks(data))
			.catch((error) => setError("No se pudo conectar con la API: " + error));
	}, []);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

	if (error) {
		return <div className="text-center py-4 text-red-600">Error: {error}</div>;
	}

	if (tasks.length === 0) {
		return <div className="text-center py-4">Cargando...</div>;
	}

	return (
		<div className="w-full p-4">
			<div className="mb-4 flex justify-between gap-2">
				<input
					type="text"
					placeholder="Buscar tarea..."
					className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					onChange={handleSearch}
				/>
				<Link
					to="/formTask"
					state={{ formTitle: "Crear Tarea", textBotton: "Crear" }}
					className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
				>
					Crear Tarea
				</Link>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Descripción
							</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Creado el
							</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredTasks.map((task, index) => (
							<tr key={task.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
								<td className="px-4 py-2">
									<div className="text-sm text-gray-900 line-clamp-1">
										<Link to={`/task`} state={{ task }} className="hover:text-blue-500 transition-colors duration-200">
											{task.title}
										</Link>
									</div>
								</td>
								<td className="px-4 py-2">
									<div className="text-sm text-gray-900 line-clamp-1">{task.description}</div>
								</td>
								<td className="px-4 py-2">
									<div className="text-sm text-gray-900">{new Date(task.createdAt).toLocaleDateString()}</div>
								</td>
								<td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
									<Link
										to={`/formTask`}
										state={dataFormUpdate(task)}
										className="text-indigo-600 hover:text-indigo-900 px-2 transition-colors duration-200"
									>
										Editar
									</Link>
									<Link
										to={`/deleteTask`}
										state={{ task }}
										className="text-red-600 hover:text-red-900 px-2 transition-colors duration-200"
									>
										Eliminar
									</Link>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={4} className="p-4"></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default TaskList;
