import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { postContact } from '../../api/firebase';
import { PageContext } from '../../context/PageContext';
import { ContactsContext } from '../../context/ContactsContext';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        maxWidth: 400,
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ContactsRegistrationForm({ contacts, success = () => {} }) {
    const classes = useStyles();
    const { openToastMessage } = useContext(PageContext);
    const { getContactsByPage } = useContext(ContactsContext);
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {
        name = '',
        mobile = '',
        group = '',
        memo = '',
        phone = '',
    } = contacts || {};

    const onSubmit = async (v) => {
        try {
            setErrorMessage('');
            const contact = await postContact({
                ...v,
                created_at: new Date().toISOString(),
            });
            openToastMessage(`${contact.name}님의 연락처가 등록되었습니다.`);
            getContactsByPage(contact.mobile);
            success();
        } catch (e) {
            setErrorMessage(
                '문제가 발생했습니다. 새로고침 후 다시 시도해주세요',
            );
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h2">연락처 등록</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="이름"
                name="name"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: name,
                    ...register('name', { required: true }),
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
                id="mobile"
                label="핸드폰 번호"
                name="mobile"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: mobile,
                    ...register('mobile', {
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
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="집 전화 번호"
                name="phone"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: phone,
                    ...register('phone'),
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="group"
                label="그룹"
                name="group"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: group,
                    ...register('group'),
                }}
            />
            <TextField
                multiline={true}
                variant="outlined"
                margin="normal"
                fullWidth
                id="memo"
                label="메모"
                name="memo"
                autoFocus
                autoComplete="off"
                inputProps={{
                    defaultValue: memo,
                    ...register('memo'),
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                등록
            </Button>
            <Typography component="div" color="error">
                {errorMessage}
            </Typography>
        </form>
    );
}

export default ContactsRegistrationForm;
