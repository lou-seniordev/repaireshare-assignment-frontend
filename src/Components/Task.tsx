import React, { memo } from 'react';

interface ITask {
	taskName: string;
	completed: boolean;
	handleTaskUpdate: (phaseIndex: number, taskIndex: number) => void;
	phaseIndex: number;
	taskIndex: number;
}

const Task = memo(({ taskName, completed, handleTaskUpdate, taskIndex, phaseIndex }: ITask) => {
	const handleUpdate = () => {
		handleTaskUpdate(phaseIndex, taskIndex);
	};
	return (
	 <div className="items-body-content">
		 <input checked={completed} onChange={handleUpdate} type="checkbox" className="checkbox"/>
		 <span className="itemList-span">{taskName}</span>
	 </div>
	);
});

export default Task;
