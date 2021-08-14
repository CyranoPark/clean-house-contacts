import { useState } from 'react';
import Router from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signInWithEmailAndPassword } from '../api/firebase';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (user) => {
        try {
            await signInWithEmailAndPassword(user);
            Router.push('/');
        } catch (e) {
            setErrorMessage('로그인에 실패하였습니다.');
        }
    };

    return (
        <Container component="div" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                    {errorMessage && (
                        <Typography component="p" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                </form>
            </div>
        </Container>
    );
}

export default Login;
