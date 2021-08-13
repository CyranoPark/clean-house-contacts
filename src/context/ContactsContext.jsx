import React, { useState } from 'react';
import { getContacts, getContactsByMobile } from '../api/firebase';

const initialState = [];
export const ContactsContext = React.createContext(null);

function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState(initialState);
    const [page, setPage] = useState(null);

    const getContactsByPage = async (next, mobile) => {
        if (page === next) return;

        const data = await getContactsByMobile(next, mobile);
        console.log(data);
        setPage(next);
        // setContacts(contacts.concat(data));
        setContacts(data);
    };

    return (
        <ContactsContext.Provider
            value={{
                page,
                contacts,
                getContactsByPage,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
}

export default ContactsProvider;
