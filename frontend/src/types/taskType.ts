export interface TaskType {
	id?: number;
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
}

export interface TaskFormType {
	formTitle: string;
	textBotton: string;
	task: TaskType;
}
