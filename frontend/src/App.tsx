import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskList from "./tasks/list-tasks/TaskList";
import { Task } from "./tasks/view-task/Task";
import FormTask from "./tasks/form/FormTask";
import { DeleteTask } from "./tasks/delete-task/DeleteTask";
/*   
 * Promp para chat gpt
 	* archivos a registrar
		* App.tsx: para las paginas
		* package.json
 	* 
*/
const router = createBrowserRouter([
	{
		path: "/",
		element: <TaskList />,
	},
	{
		path: "/task",
		element: <Task />,
	},
	{
		path: "/formTask",
		element: <FormTask />,
	},
	{
		path:"/deleteTask",
		element:<DeleteTask/>
	}
]);
function App() {
	return (
		<div className="max-w-[750px] m-auto">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
