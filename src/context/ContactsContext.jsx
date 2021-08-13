import React, { useState } from 'react';
import { getContacts } from '../api/firebase';
import { contactsToArray } from '../services/ContactsService';

const initialState = [];
export const ContactsContext = React.createContext(null);

function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState(initialState);
    const [page, setPage] = useState(null);

    const getContactsByPage = async (next) => {
        if (page === next) return;

        const data = await getContacts(next);
        const contactsList = contactsToArray(data);

        setPage(next);
        setContacts(contacts.concat(contactsList));
    };

    return (
        <ContactsContext.Provider
            value={{
                contacts,
                getContactsByPage,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
}

export default ContactsProvider;
