import React from 'react';
import PageProvider from './PageContext';

function ContextProvider({ children }) {
    return <PageProvider>{children}</PageProvider>;
}

export default ContextProvider;
