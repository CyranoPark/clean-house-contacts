import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { postContact, postMessageHistory } from '../../api/firebase';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ContactsContext } from '../../context/ContactsContext';
import { byteCount, removeDashInString } from '../../services/ContactsService';
import { PageContext } from '../../context/PageContext';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        maxWidth: 400,
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        margin: theme.spacing(3, 0, 2),
    },
}));

const from = process.env.NEXT_PUBLIC_SMS_CALLING_NUMBER;

function SmsForm({ success }) {
    const classes = useStyles();
    const { selectedContact, initContact } = useContext(ContactsContext);
    const { openToastMessage } = useContext(PageContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [contentSize, setContentSize] = useState(0);
    const contentField = register('content');

    const onSubmit = async (v) => {
        const values = {
            to: removeDashInString(v.to),
            from: removeDashInString(from),
            content: v.content,
        };
        console.log(values);
        try {
            const { data } = await axios.post('/api/message', values);
            await postMessageHistory({
                values,
                ...data,
            });
            openToastMessage(
                `${selectedContact.name}님에게 문자 전송을 완료하였습니다.`,
            );
            success();
        } catch (e) {
            setErrorMessage(
                '문제가 발생했습니다. 새로고침 후 다시 시도해주세요',
            );
            success();
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h2">메시지 보내기</Typography>
            <TextField
                disabled
                variant="outlined"
                margin="normal"
                fullWidth
                id="from"
                label="핸드폰 번호"
                name="from"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: process.env.NEXT_PUBLIC_SMS_CALLING_NUMBER,
                    ...register('from', {
                        pattern: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/i,
                        required: true,
                    }),
                }}
            />
            {errors.name && errors.name.type === 'required' && (
                <Typography component="div" color="error">
                    필수 작성 항목입니다.
                </Typography>
            )}
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="to"
                label="핸드폰 번호"
                name="to"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: selectedContact.mobile || '',
                    ...register('to', {
                        pattern: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/i,
                        required: true,
                    }),
                }}
            />
            {errors.mobile && errors.mobile.type === 'pattern' && (
                <Typography component="div" color="error">
                    전화번호 형식을 맞춰주세요 (ex. 010-0000-0000)
                </Typography>
            )}
            {errors.mobile && errors.mobile.type === 'required' && (
                <Typography component="div" color="error">
                    필수 작성 항목입니다.
                </Typography>
            )}
            <TextField
                multiline={true}
                variant="outlined"
                margin="normal"
                fullWidth
                id="content"
                label="문자 내용"
                name="content"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: '',
                    ...contentField,
                    onChange: (e) => {
                        setContentSize(byteCount(e.target.value));
                        contentField.onChange(e);
                    },
                }}
            />
            <span>{contentSize}/80 Byte</span>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                보내기
            </Button>

            <Typography component="div" color="error">
                {errorMessage}
            </Typography>
        </form>
    );
}

export default SmsForm;
