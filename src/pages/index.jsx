import { useEffect, useContext } from 'react';
import { formatLayoutOption } from '../services/LayoutService';
import { ContactsContext } from '../context/ContactsContext';
import ContactsList from '../components/Contacts/List';
import { Container } from '@material-ui/core';
import SearchBar from '../components/Contacts/SearchBar';
import { PopupContext } from '../context/PopupContext';

function Home() {
    const { getContactsByPage, contacts, initContact } =
        useContext(ContactsContext);
    const { open } = useContext(PopupContext);

    const searchKeyword = (v) => {
        getContactsByPage(v);
    };

    useEffect(() => {
        getContactsByPage();
    }, []);

    return (
        <Container>
            <SearchBar
                onClickRegister={() => {
                    initContact();
                    open();
                }}
                searchKeyword={searchKeyword}
            />
            <ContactsList contacts={contacts} />
        </Container>
    );
}

export async function getServerSideProps() {
    return {
        props: {
            ...formatLayoutOption({
                withHeader: true,
                title: '크린하우스 주소록',
            }),
        },
    };
}

export default Home;
