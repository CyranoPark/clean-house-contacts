import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { ContactsContext } from '../../context/ContactsContext';
import { PopupContext } from '../../context/PopupContext';
import { PageContext } from '../../context/PageContext';

const useStyles = makeStyles((theme) => ({
    cell: {
        fontSize: '1.0rem',
        padding: 10,
    },
    deleteButton: {
        color: theme.palette.error.main,
    },
}));

const Cell = ({ children }) => (
    <TableCell className={useStyles().cell} size="medium" align="center">
        {children}
    </TableCell>
);

function ContactsList({ contacts }) {
    const classes = useStyles();
    const { open } = useContext(PopupContext);
    const { openToastMessage } = useContext(PageContext);
    const { selectContact, deleteContactById } = useContext(ContactsContext);
    const matches = useMediaQuery((theme) =>
        theme.breakpoints.down(theme.layout.breakPoint),
    );
    const deleteContact = async (contact) => {
        try {
            await deleteContactById(contact.id);
            openToastMessage(`${contact.name}님의 연락처가 삭제되었습니다.`);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <Cell>이름</Cell>
                    <Cell>전화번호</Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                        <Cell>{contact.name}</Cell>
                        <Cell>{contact.mobile}</Cell>
                        <Cell>
                            <Button
                                size={matches ? 'small' : 'large'}
                                color="secondary"
                                onClick={() => {
                                    selectContact(contact);
                                    open();
                                }}
                            >
                                수정
                            </Button>
                            <Button
                                className={classes.deleteButton}
                                size={matches ? 'small' : 'large'}
                                onClick={() => deleteContact(contact)}
                            >
                                삭제
                            </Button>
                        </Cell>
                        <Cell>
                            <Button
                                size={matches ? 'small' : 'large'}
                                color="primary"
                            >
                                문자발송
                            </Button>
                        </Cell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ContactsList;
