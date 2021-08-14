import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ContactsRegistrationForm(props) {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();

    const onSubmit = (v) => {
        console.log(v);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                    defaultValue: '',
                    ...register('email'),
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                inputProps={{
                    defaultValue: '',
                    ...register('password'),
                }}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="자동 로그인"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                로그인
            </Button>
        </form>
    );
}

export default ContactsRegistrationForm;
