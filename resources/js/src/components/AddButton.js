import React, { useState } from 'react';
import Dialog from './Dialog';

const AddButton = ({ title, content }) => {
	let [dialog, setStateDialog] = useState(false);

    return (
		<div>
			<button 
				className="border border-blue-400 hover:bg-blue-400 rounded-full p-2 text-sm focus:outline-none transition"
				onClick={() => setStateDialog(true)}
			>{title}</button>
			<Dialog
                title={title}
                content={content}
                state={dialog}
                handleDialog={setStateDialog}
            />
		</div>
    );
}

export default AddButton;