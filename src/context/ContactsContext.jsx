import React, { useState } from 'react';
import { getContactsByMobile } from '../api/firebase';

const initialState = [];
export const ContactsContext = React.createContext(null);

function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState(initialState);

    const getContactsByPage = async (mobile) => {
        const data = await getContactsByMobile(mobile);
        setContacts(data);
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
