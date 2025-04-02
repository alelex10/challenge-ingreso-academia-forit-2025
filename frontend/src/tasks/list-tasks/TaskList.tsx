import { useEffect, useState } from "react";
import { Task } from "../../types/taskType";

const MAX_LENGTH = 30;
const colors = {
	text: "text-[#242424]",
	background: "bg-[#FFC107]",
	rowOne: "bg-[#00BCD4]",
	rowTwo: "bg-[#FF7043]",
};
const fetchTasks = async (): Promise<Array<Task>> => {
	const response = await fetch("http://localhost:3000/api/tasks");
	const data = await response.json();
	return data;
};
//* header list tasks
const TaskListHeader = () => {
	return (
		<>
			<span className={`font-bold text-lg mb-3 `}>Titulo</span>
			<span className={`font-bold text-lg`}>descripcion</span>
			<span className={`font-bold text-lg`}>fecha de creacion</span>
		</>
	);
};

const TaskList = () => {
	const [tasks, setTasks] = useState<Array<Task>>([]);

	useEffect(() => {
		fetchTasks().then((data) => {
			setTasks(data);
		});

		setTasks([]);
	}, []);

	if (tasks.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={`grid grid-cols-3 self-center mx-auto ${colors.background} ${colors.text} rounded-lg`}>
			<TaskListHeader />
			{tasks.map((task, index) => (
				<>
					<p
						className={`h-7 overflow-hidden 
						${task.title.length > MAX_LENGTH && "after:content-['...']"}
						${index % 2 === 0 ? colors.rowOne : colors.rowTwo}`}
						key={task.id}
					>
						{task.title.length > MAX_LENGTH ? task.title.slice(0, MAX_LENGTH) : task.title}
					</p>
					<p
						className={`h-7 overflow-y-hidden 
						${task.description?.length > MAX_LENGTH && "after:content-['...']"}
						${index % 2 === 0 ? colors.rowOne : colors.rowTwo}`}
					>
						{task.description?.length > MAX_LENGTH ? task.description.slice(0, MAX_LENGTH) : task.description}
					</p>
					<p className={`${index % 2 === 0 ? colors.rowOne : colors.rowTwo}`}>{task.createdAt.toString()}</p>
				</>
			))}
		</div>
	);
};

export default TaskList;
