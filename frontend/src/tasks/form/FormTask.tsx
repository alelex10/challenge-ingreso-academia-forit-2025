import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskFormType, TaskType } from "../../types/taskType";

const URL_API = "http://localhost:3000/api/tasks";

const urlApi=(taskId?: number)=>{
	if(taskId){
		return `${URL_API}/${taskId}`
	}else{
		return URL_API
	}
}

const fetchTask = async (dataValues: TaskType, taskId?: number) => {
	const response = await fetch(`${urlApi(taskId)}`, {
		method: taskId ? "PUT" : "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataValues),
	});
	const data = await response.json();
	return data;
};

const FormTask = () => {
	const dataForm: TaskFormType = useLocation().state;

	const [title, setTitle] = useState(dataForm.task?.title || "");
	const [description, setDescription] = useState(dataForm.task?.description || "");
	const [completed, setCompleted] = useState(dataForm.task?.completed || false);

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		
		const updatedTask: TaskType = {
			id: dataForm.task?.id,
			title: title || "",
			description: description || "",
			completed: completed ? true : false,
			createdAt: dataForm.task?.createdAt || new Date(),
		};
		console.log(updatedTask);
		try {
			await fetchTask(updatedTask, dataForm.task.id );
			navigate("/");
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold mb-4">{dataForm.formTitle}</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
							Title:
						</label>
						<input
							type="text"
							id="title"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter task title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
							Description:
						</label>
						<textarea
							id="description"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa una edscipcion para la tarea"
							value={description || ""}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
						<div className="flex items-center">
							<label className="mr-4">
								<input
									type="radio"
									name="status"
									value={1}
									className="mr-2"
									checked={completed}
									onChange={() => setCompleted(true)}
								/>
								Completado
							</label>
							<label>
								<input
									type="radio"
									name="status"
									value={1}
									className="mr-2"
									checked={!completed}
									onChange={() => setCompleted(false)}
								/>
								Pendiente
							</label>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
              focus:shadow-outline cursor-pointer"
							type="submit"
						>
							{dataForm.textBotton}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormTask;
