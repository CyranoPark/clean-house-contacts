import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { menuList } from '../../services/LayoutService';
import { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import List from '@material-ui/core/List';

const ListItems = () => {
    const { page, changeMenu } = useContext(PageContext);

    return (
        <List>
            {menuList.map(({ Icon, text, name }) => (
                <ListItem
                    button
                    key={name}
                    selected={name === page.currentMenu}
                    onClick={() => changeMenu(name)}
                >
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );
};

export default ListItems;
