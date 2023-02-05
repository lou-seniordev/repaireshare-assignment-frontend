import React, { useState } from 'react';

interface IAddPhase {
	addPhase: (data: IDataPhase) => void;
}

const AddPhase = ({ addPhase }: IAddPhase) => {
	const [inputList, setInputList] = useState(['']);
	const [phaseName, setPhaseName] = useState('');
	const handleAddInput = () => {
		setInputList([...inputList, '']);
	};
	
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const updatedInputList = [...inputList];
		updatedInputList[index] = event.target.value;
		setInputList(updatedInputList);
	};
	
	const clearFields = () => {
		setInputList(['']);
		setPhaseName('');
	}
	
	const handleAddPhase = () => {
		const tasks = inputList.map((task) => ({
			completed: false,
			taskName: task
		}));
		const phase = {
			name: phaseName,
			tasks,
			completed: false,
		};
		addPhase(phase);
		clearFields()
	};
	
	return (
	 <div className="input_container">
		 <div className="phase_title_input_container">
			 <input value={phaseName} onChange={(event) => setPhaseName(event.target.value)} className="phase_input" placeholder="Phase Title"/>
		 </div>
		 {inputList.map((inputValue, index) => (
			<div key={index}>
				<input
				 placeholder="Task"
				 key={index}
				 value={inputValue}
				 onChange={event => handleInputChange(event, index)}
				/>
			</div>
		 ))}
		 <button className="add_task_button" onClick={handleAddInput}>+</button>
		 <button className="new_phase" onClick={handleAddPhase}>Add New Phase</button>
	 </div>
	);
};

export default AddPhase;
