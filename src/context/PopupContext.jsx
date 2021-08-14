import React, { useState } from 'react';
import Popup from '../components/Popup';
import ContactsRegistrationForm from '../components/Form/ContactsRegistrationForm';

export const PopupContext = React.createContext(null);

function PopupProvider({ children }) {
    const [openContactsRegister, setOpenContactsRegister] = useState(false);

    const close = () => setOpenContactsRegister(false);

    return (
        <PopupContext.Provider
            value={{
                open: () => setOpenContactsRegister(true),
                close,
            }}
        >
            {children}
            <Popup open={openContactsRegister} close={close}>
                <ContactsRegistrationForm success={close} />
            </Popup>
        </PopupContext.Provider>
    );
}

export default PopupProvider;
