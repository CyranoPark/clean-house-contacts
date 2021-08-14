import React, { useState } from 'react';
import {
    deleteContact,
    getContactsByMobile,
    updateContact,
} from '../api/firebase';

const initialState = [];
export const ContactsContext = React.createContext(null);

function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState(initialState);
    const [selectedContact, setSelectedContact] = useState(null);

    const getContactsByPage = async (mobile) => {
        const data = await getContactsByMobile(mobile);
        setContacts(data);
    };
    const selectContact = (contact) => {
        setSelectedContact(contact);
    };
    const initContact = () => setSelectedContact(null);

    const modifyContact = async (id, contact) => {
        const updatedContact = {
            id,
            ...contact,
        };
        await updateContact(id, contact);
        const newContacts = contacts.map((item) => {
            if (item.id !== id) return item;

            return updatedContact;
        });

        setContacts(newContacts);
    };

    const deleteContactById = async (id) => {
        await deleteContact(id);
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    return (
        <ContactsContext.Provider
            value={{
                contacts,
                selectedContact,
                getContactsByPage,
                selectContact,
                initContact,
                deleteContactById,
                modifyContact,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
}

export default ContactsProvider;
