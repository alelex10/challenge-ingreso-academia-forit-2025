import { TaskType } from "../../types/taskType";
import { formatDate } from "../../utils/date-formater";
import { useLocation } from "react-router-dom";

export const Task = () => {
	const task: TaskType = useLocation().state.task;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
				<h2 className="text-2xl font-semibold mb-4 text-gray-800">{task.title}</h2>
				<div className="mb-4">
					<p className="text-gray-700 leading-relaxed">{task.description}</p>
				</div>
				<div className="flex items-center justify-between mb-4">
					<span className="text-sm text-gray-500">Created At: {formatDate(task.createdAt)}</span>
					<span className="text-sm text-gray-500">Status: {task.completed ? "Completed" : "Pending"}</span>
				</div>
				{/* Add more details here as needed */}
			</div>
		</div>
	);
};
