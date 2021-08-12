import Router from 'next/router';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthUser } from '../../hooks/useAuthUser';
import FullScreenLoading from '../Loading/FullScreen';
import { useEffect } from 'react';
import Header from './Header';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    container: {
        display: 'flex',
        width: '100%',
        maxWidth: 1024,
        minHeight: '100%',
    },
}));

function Layout({ layoutOption, children }) {
    const classes = useStyles();
    const { pending, fail } = useAuthUser();
    const { withHeader } = layoutOption;

    useEffect(() => {
        if (fail) {
            Router.push('/login');
        }
    }, [fail]);

    return (
        <div className={classes.root}>
            {withHeader && <Header />}
            <Container component="main" className={classes.container}>
                {children}
                <FullScreenLoading open={pending} />
            </Container>
        </div>
    );
}

export default Layout;
