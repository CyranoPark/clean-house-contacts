import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    cell: {
        fontSize: '1.1rem',
    },
}));

const Cell = ({ children }) => (
    <TableCell className={useStyles().cell} size="medium" align="center">
        {children}
    </TableCell>
);

function ContactsList({ contacts }) {
    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <Cell>이름</Cell>
                    <Cell>전화번호</Cell>
                    <Cell>그룹</Cell>
                    <Cell>기타</Cell>
                    <Cell></Cell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                        <Cell>{contact.name}</Cell>
                        <Cell>{contact.mobile}</Cell>
                        <Cell>{contact.group}</Cell>
                        <Cell>{contact.memo}</Cell>
                        <Cell>
                            <Button size="large" color="primary">
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
