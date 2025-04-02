import {useEffect, useState } from "react";
import { TaskType } from "../../types/taskType";
import { Link } from "react-router-dom";

const fetchTasks = async (): Promise<Array<TaskType>> => {
	const response = await fetch("http://localhost:3000/api/tasks");
	const data = await response.json();
	return data;
};
const TaskList = () => {
	const [tasks, setTasks] = useState<Array<TaskType>>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchTasks();
			setTasks(data);
		};

		fetchData();
	}, []);

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
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TaskList;
/* 
						<tr key={task.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm text-gray-900">
									<Link to={`/task`} state={{ task }} className="hover:text-blue-500">
							{task.title}
						</Link>
					</div>
					<p
						key={task.id}
						className={`h-7 truncate
						${colorRow(index)}`}
					>
						{task.description}
					</p>
					<p key={task.id} className={`${colorRow(index)}`}>
						{task.createdAt.toString()}
					</p>
				</>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm text-gray-900">{task.description}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm text-gray-900">{new Date(task.createdAt).toLocaleDateString()}</div>
							</td>
						</tr>
			))}
		</div>
	);
};

export default TaskList; */

