interface IDataPhase {
	name: string;
	completed: boolean;
	tasks: Array<IDataTasks>;
}

interface IDataTasks {
	completed: boolean;
	taskName: string;
}


interface IRandomFactsResponse {
	id: string
	text:string
	source: string
}
