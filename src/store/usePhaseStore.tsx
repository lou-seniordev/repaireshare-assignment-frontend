import React, { useEffect, useState } from 'react';


interface IStore {
	activePhase: number,
	list:Array<IDataPhase>
}


/*
*
* This custom hook UsePhaseStore retrieves and stores data in local storage.
* It returns the current state of the data and a function to update the state.
*  A useEffect hook retrieves the stored data from local storage on component mount.
* */

const usePhaseStore = (data?: IStore | undefined) => {
	const [phase, setPhase] = useState<IStore>(data || { activePhase: 0, list: [] });
	
	useEffect(() => {
		try {
			const storedPhase = localStorage.getItem('phase');
			if (storedPhase) {
				setPhase(JSON.parse(storedPhase));
			}
		} catch (e) {
		
		}
	}, []);
	
	const updatePhase = (payload: IStore) => {
		localStorage.setItem('phase', JSON.stringify(payload));
		setPhase(payload);
	};
	
	return { phase, updatePhase };
};

export default usePhaseStore;
