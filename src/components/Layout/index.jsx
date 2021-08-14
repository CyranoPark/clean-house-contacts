import Router from 'next/router';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthUser } from '../../hooks/useAuthUser';
import FullScreenLoading from '../Loading/FullScreen';
import { useEffect } from 'react';
import Header from './Header';
import classNames from 'classnames';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100%',
        minHeight: '100vh',
    },
    container: {
        display: 'flex',
        width: '100%',
        maxWidth: 1024,
        minHeight: '100%',
        paddingRight: 0,
        paddingLeft: 0,
    },
    withHeader: {
        paddingTop: 80,
    },
}));

function Layout({ layoutOption, children }) {
    const classes = useStyles();
    const { pending, fail } = useAuthUser();
    const { withHeader, title } = layoutOption;

    useEffect(() => {
        if (fail) {
            Router.push('/login');
        }
    }, [fail]);

    return (
        <div className={classes.root}>
            {withHeader && <Header title={title} />}
            <Container
                component="main"
                className={classNames(
                    classes.container,
                    withHeader && classes.withHeader,
                )}
            >
                {children}
                <FullScreenLoading open={pending} />
            </Container>
        </div>
    );
}

export default Layout;
