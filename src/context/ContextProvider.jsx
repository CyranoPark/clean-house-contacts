import React from 'react';
import PageProvider from './PageContext';
import ContactsProvider from './ContactsContext';
import PopupProvider from './PopupContext';

function ContextProvider({ children }) {
    return (
        <PageProvider>
            <PopupProvider>
                <ContactsProvider>{children}</ContactsProvider>
            </PopupProvider>
        </PageProvider>
    );
}

export default ContextProvider;
