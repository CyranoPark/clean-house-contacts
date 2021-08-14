import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ListItems from './SideBarItems';
import { useMediaQuery } from '@material-ui/core';
import { useState } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: '0 10px 0 38px',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        paddingTop: 70,
    },
}));

function Header({ title }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const matches = useMediaQuery((theme) =>
        theme.breakpoints.down(theme.layout.breakPoint),
    );

    return (
        <>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    {/*{matches && (*/}
                    {/*    <IconButton*/}
                    {/*        edge="start"*/}
                    {/*        color="inherit"*/}
                    {/*        aria-label="open drawer"*/}
                    {/*        onClick={() => setOpen(!open)}*/}
                    {/*    >*/}
                    {/*        {open ? <CloseIcon /> : <MenuIcon />}*/}
                    {/*    </IconButton>*/}
                    {/*)}*/}
                </Toolbar>
                {/*{matches && open && <ListItems />}*/}
            </AppBar>
            {/*{!matches && (*/}
            {/*    <Drawer*/}
            {/*        open*/}
            {/*        variant="persistent"*/}
            {/*        classes={{*/}
            {/*            paper: classes.drawerPaper,*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <ListItems />*/}
            {/*    </Drawer>*/}
            {/*)}*/}
        </>
    );
}

export default Header;
