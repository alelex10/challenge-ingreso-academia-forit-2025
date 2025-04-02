import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskList from "./tasks/list-tasks/TaskList";
import { Task } from "./tasks/view-task/Task";

const router = createBrowserRouter([
	{
		path: "/",
		element: <TaskList />,
		/* children: [
			{
				path: "task",
				element: <Task />,
			},
		], */
	},
	{
		path: "/task",
		element: <Task />,
	},
]);
function App() {
	return (
		<div className="max-w-[750px] m-auto">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
