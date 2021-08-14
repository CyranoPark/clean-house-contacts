import React, { useState } from 'react';
import { defaultMenu } from '../services/LayoutService';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const initialState = {
    currentMenu: defaultMenu,
};
export const PageContext = React.createContext(null);

function PageProvider({ children }) {
    const [page, setPage] = useState(initialState);
    const [toastMessage, setToastMessage] = useState('');

    const initPage = () => setPage(initialState);
    const openToastMessage = (message) => setToastMessage(message);
    const handleClose = () => setToastMessage('');

    const changeMenu = (name) => {
        setPage({
            ...page,
            currentMenu: name,
        });
    };

    return (
        <PageContext.Provider
            value={{
                page,
                changeMenu,
                initPage,
                openToastMessage,
            }}
        >
            {children}
            <Snackbar
                open={!!toastMessage}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success">
                    {toastMessage}
                </Alert>
            </Snackbar>
        </PageContext.Provider>
    );
}

export default PageProvider;
