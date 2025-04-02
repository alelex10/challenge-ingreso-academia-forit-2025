import { ReactNode, useEffect, useState } from "react";
import { TaskType } from "../../types/taskType";
import { Link } from "react-router-dom";

const colors = {
	text: "text-[#242424]",
	background: "bg-[#FFC107]",
	rowOne: "bg-[#00BCD450]",
	rowTwo: "bg-[#FF704370]",
};
const fetchTasks = async (): Promise<Array<TaskType>> => {
	const response = await fetch("http://localhost:3000/api/tasks");
	const data = await response.json();
	return data;
};
//* color rew
const colorRow = (index: number) => (index % 2 === 0 ? "bg-primary" : "bg-secondary");

//* span header
const TaskListHeaderSpan = ({ children }: { children: ReactNode }) => {
	return <span className={`font-bold text-lg pb-3 ${colors.background}`}>{children}</span>;
};
//* header list tasks
const TaskListHeader = () => {
	return (
		<>
			<TaskListHeaderSpan>titulo</TaskListHeaderSpan>
			<TaskListHeaderSpan>descripcion</TaskListHeaderSpan>
			<TaskListHeaderSpan>fecha de creacion</TaskListHeaderSpan>
		</>
	);
};

const TaskList = () => {
	const [tasks, setTasks] = useState<Array<TaskType>>([]);

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
		<div className={`grid grid-cols-3 self-center ${colors.text} rounded-lg`}>
			<TaskListHeader />
			{tasks.map((task, index) => (
				<>
					<div
						key={task.id}
						className={`h-7 overflow-hidden truncate 
						${colorRow(index)}`}
					>
						<Link to={`/task`} state={{ task }}>
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
			))}
		</div>
	);
};

export default TaskList;
