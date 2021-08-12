import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItems from './SideBarItems';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: '0 38px',
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
                </Toolbar>
            </AppBar>
            <Drawer
                open
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    <ListItems />
                </List>
            </Drawer>
        </>
    );
}

export default Header;
