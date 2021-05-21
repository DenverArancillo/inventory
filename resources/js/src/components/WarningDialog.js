import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Dialog from './Dialog';

const WarningDialog = () => {
    const history = useHistory();
    let [dialog, setStateDialog] = useState(true);

    const closeWarningDialog = state => {
        setStateDialog(state)
        history.push('/')
    }

    const content = handleDialog => {
        const doClose = event => handleDialog(false);

        return (
            <div>
                You have no access.
                <div className="flex items-center justify-end">
                    <button className="bg-blue-400 rounded-md border-2 border-blue-400 text-white px-3 py-1 text-base focus:outline-none" type="submit" onClick={doClose}>Ok</button>
                </div>
            </div>
        )
    }

    return (
        <Dialog
            title="Warning"
            content={content}
            state={dialog}
            handleDialog={closeWarningDialog}    
        />
    )
}

export default WarningDialog;