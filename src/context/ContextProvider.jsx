import React from 'react';
import PageProvider from './PageContext';
import ContactsProvider from './ContactsContext';

function ContextProvider({ children }) {
    return (
        <PageProvider>
            <ContactsProvider>{children}</ContactsProvider>
        </PageProvider>
    );
}

export default ContextProvider;
