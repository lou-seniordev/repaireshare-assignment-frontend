import React from 'react';

interface IPhase {
	children: JSX.Element[] | JSX.Element,
	name: string
	code: number
	completed: boolean
	disabled: boolean
}



const Phase = ({children,name, code, completed, disabled}:IPhase) => {

	return (
	 <fieldset className="div-body" disabled={disabled}>
		 <div className="items-body-title">
			 <span className="items-body-number">{code}</span>
			 <strong>{name}</strong>
			 {completed && <span className="completed_checkmark">✓</span>}
		 </div>
		 {children}
	 </fieldset>
	);
};

export default Phase;
