import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { menuList } from '../../services/LayoutService';
import { useContext } from 'react';
import { PageContext } from '../../context/PageContext';

const ListItems = () => {
    const { page, changeMenu } = useContext(PageContext);

    return (
        <div>
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
        </div>
    );
};

export default ListItems;
