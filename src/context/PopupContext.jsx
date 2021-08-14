import React, { useState } from 'react';
import Popup from '../components/Popup';
import ContactsRegistrationForm from '../components/Form/ContactsRegistrationForm';
import SmsForm from '../components/Form/SMSForm';

export const PopupContext = React.createContext(null);

function PopupProvider({ children }) {
    const [openContactsRegister, setOpenContactsRegister] = useState(false);
    const [openSmsSender, setOpenSmsSender] = useState(false);

    const close = () => setOpenContactsRegister(false);
    const closeSms = () => setOpenSmsSender(false);

    return (
        <PopupContext.Provider
            value={{
                open: () => setOpenContactsRegister(true),
                close,
                openSms: () => setOpenSmsSender(true),
                closeSms,
            }}
        >
            {children}
            <Popup open={openContactsRegister} close={close}>
                <ContactsRegistrationForm success={close} />
            </Popup>
            <Popup open={openSmsSender} close={closeSms}>
                <SmsForm success={closeSms} />
            </Popup>
        </PopupContext.Provider>
    );
}

export default PopupProvider;
