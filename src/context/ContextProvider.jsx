import React from 'react';
import PageProvider from './PageContext';
import ContactsProvider from './ContactsContext';
import PopupProvider from './PopupContext';

function ContextProvider({ children }) {
    return (
        <PageProvider>
            <ContactsProvider>
                <PopupProvider>{children}</PopupProvider>
            </ContactsProvider>
        </PageProvider>
    );
}

export default ContextProvider;
