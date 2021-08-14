import { useState, useEffect, useContext } from 'react';
import { formatLayoutOption } from '../services/LayoutService';
import { PageContext } from '../context/PageContext';
import { ContactsContext } from '../context/ContactsContext';
import { getContactByMobile, postContacts } from '../api/firebase';
import ContactsList from '../components/Contacts/List';
import { Container } from '@material-ui/core';
import SearchBar from '../components/Contacts/SearchBar';
import { PopupContext } from '../context/PopupContext';

function Home() {
    const { getContactsByPage, contacts, page } = useContext(ContactsContext);
    const { open, close } = useContext(PopupContext);

    const loadMore = () => {
        getContactsByPage(page === null ? 0 : page + 1);
    };
    const searchKeyword = (v) => {
        getContactsByPage(page === null ? 0 : page + 1, v);
        console.log(v);
    };

    useEffect(() => {
        loadMore();
    }, []);

    return (
        <Container>
            <SearchBar onClickRegister={open} searchKeyword={searchKeyword} />
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
