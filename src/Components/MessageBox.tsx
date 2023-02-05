import React from 'react';

const MessageBox = ({message}: {message:string}) => {
	return (
	 <div className="message">
		 {message}
	 </div>
	);
};
export default MessageBox;
