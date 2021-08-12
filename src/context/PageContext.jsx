import React, { useState } from 'react';
import { defaultMenu } from '../services/LayoutService';

const initialState = {
    currentMenu: defaultMenu,
};
export const PageContext = React.createContext(null);

function PageProvider({ children }) {
    const [page, setPage] = useState(initialState);

    const initPage = () => setPage(initialState);
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
            }}
        >
            {children}
        </PageContext.Provider>
    );
}

export default PageProvider;
