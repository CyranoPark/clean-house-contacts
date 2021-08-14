import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import React, { useContext, useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { ContactsContext } from '../../context/ContactsContext';
import { PopupContext } from '../../context/PopupContext';
import { PageContext } from '../../context/PageContext';
import SimplePopup from '../Popup/SimplePopup';

const useStyles = makeStyles((theme) => ({
    cell: {
        fontSize: '1.0rem',
        padding: 5,
    },
    deleteButton: {
        color: theme.palette.error.main,
    },
    bottomLine: {
        borderBottom: '1.5px solid gray',
    },
}));

const Cell = ({ size, children }) => (
    <TableCell
        className={useStyles().cell}
        size={size || 'medium'}
        align="center"
    >
        {children}
    </TableCell>
);

function ContactsList({ contacts }) {
    const classes = useStyles();
    const { open, openSms } = useContext(PopupContext);
    const { openToastMessage } = useContext(PageContext);
    const { selectContact, deleteContactById, selectedContact } =
        useContext(ContactsContext);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const matches = useMediaQuery((theme) =>
        theme.breakpoints.down(theme.layout.breakPoint),
    );
    const deleteContact = async () => {
        try {
            await deleteContactById(selectedContact.id);
            openToastMessage(
                `${selectedContact.name}님의 연락처가 삭제되었습니다.`,
            );
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Table size="medium">
                <TableHead>
                    <TableRow className={classes.bottomLine}>
                        <Cell>이름</Cell>
                        <Cell>전화번호</Cell>
                        {!matches && <Cell size="small"></Cell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((contact) => {
                        if (matches) {
                            return (
                                <React.Fragment key={contact.id}>
                                    <TableRow>
                                        <Cell>{contact.name}</Cell>
                                        <Cell>{contact.mobile}</Cell>
                                    </TableRow>
                                    <TableRow className={classes.bottomLine}>
                                        <Cell>
                                            <Button
                                                size={
                                                    matches ? 'small' : 'large'
                                                }
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
                                                size={
                                                    matches ? 'small' : 'large'
                                                }
                                                onClick={() =>
                                                    deleteContact(contact)
                                                }
                                            >
                                                삭제
                                            </Button>
                                        </Cell>
                                        <Cell>
                                            <Button
                                                size={
                                                    matches ? 'small' : 'large'
                                                }
                                                color="primary"
                                                onClick={() => {
                                                    selectContact(contact);
                                                    openSms();
                                                }}
                                            >
                                                문자발송
                                            </Button>
                                        </Cell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        }

                        return (
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
                                        onClick={() => {
                                            selectContact(contact);
                                            setOpenDeleteDialog(true);
                                        }}
                                    >
                                        삭제
                                    </Button>
                                    <Button
                                        size={matches ? 'small' : 'large'}
                                        color="primary"
                                        onClick={() => {
                                            selectContact(contact);
                                            openSms();
                                        }}
                                    >
                                        문자발송
                                    </Button>
                                </Cell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <SimplePopup
                open={openDeleteDialog}
                handleClose={() => setOpenDeleteDialog(false)}
                handleAgree={() => deleteContact(selectedContact)}
                title="정말 삭제하시겠습니까?"
                description="삭제 후 복구는 되지 않습니다"
            />
        </>
    );
}

export default ContactsList;
