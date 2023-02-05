import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Phase from './Components/Phase';
import Task from './Components/Task';
import MessageBox from './Components/MessageBox';
import { toast, ToastContainer } from 'react-toastify';
import usePhaseStore from './store/usePhaseStore';
import useGetRandomFact from './networkQuery/useGetRandomFact';
import AddPhase from './Components/AddPhase';


const App = () => {
	const { phase, updatePhase } = usePhaseStore();
	
	const { makeQuery } = useGetRandomFact({
		onCompleted: ( data ) => {
			toast(data.text);
		}
	});
	
	const message = 'you Have not started you journey';
	
	/*
	 * This function updates a task's completion and its phase's completion status.
	 *  It sets the current phase to the next one if the updated phase was completed and was the current one.
	 *  The completion statuses are stored in the component's state using hooks and the function takes two arguments:
	 * phaseIndex and taskIndex to determine which task and phase to update.
	 * */
	const handleTaskUpdate = (phaseIndex: number, taskIndex: number) => {
		const updatedPhase = [...phase.list];
		updatedPhase[phaseIndex].tasks[taskIndex].completed = !updatedPhase[phaseIndex].tasks[taskIndex].completed;
		const allTasksCompleted = updatedPhase[phaseIndex].tasks.every(
		 (task: { completed: boolean }) => task.completed
		);
		if (allTasksCompleted) {
			updatedPhase[phaseIndex].completed = true;
			makeQuery();
		}
		updatePhase({ list: updatedPhase, activePhase: phaseIndex });
		
		if (updatedPhase[phaseIndex].completed && phaseIndex === phase.activePhase) {
			updatePhase({ list: updatedPhase, activePhase: phaseIndex + 1 });
		}
	};
	
	const handleAddPhase = (payload: IDataPhase) => {
		updatePhase({activePhase:phase.activePhase, list:[...phase.list, payload]})
	}
	
	return (
	 <>
		 <div className="wrapper">
			 <AddPhase addPhase={handleAddPhase}/>
			 <div className="container">
				 <div className="items">
					 <div className="items-head">
						 <p>My startup Progress</p>
						 <hr/>
					 </div>
					 <div className="items-body">
						 {phase.list.length === 0 ? <MessageBox message={message}/> : phase.list.map(((item:IDataPhase, phaseIndex:number) => (
							<Phase key={phaseIndex} code={phaseIndex + 1} disabled={phaseIndex > phase.activePhase || item.completed}
										 name={item.name} completed={item.completed}>
								{item.tasks.map((taskItem:IDataTasks, taskIndex:number) => (
								 <Task completed={taskItem.completed} key={taskIndex} taskIndex={taskIndex} phaseIndex={phaseIndex}
											 handleTaskUpdate={handleTaskUpdate} taskName={taskItem.taskName}/>
								))}
							</Phase>
						 )))}
					 </div>
				 </div>
			 </div>
		 </div>
		 
		 <ToastContainer/>
	 </>
	);
	
};


export default App;
