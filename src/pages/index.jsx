import { useState, useEffect, useContext } from 'react';
import { formatLayoutOption } from '../services/LayoutService';
import { PageContext } from '../context/PageContext';
import { ContactsContext } from '../context/ContactsContext';
import { getContactByMobile } from '../api/firebase';

function Home() {
    const { getContactsByPage, contacts } = useContext(ContactsContext);
    console.log(contacts);
    useEffect(() => {
        getContactsByPage(0);
        getContactByMobile('1009');
    }, []);

    return <div></div>;
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
