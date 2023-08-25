import React, { useState } from 'react';
import { 
    Drawer,
    Divider,
    IconButton, 
    List,
    ListItem,
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoneIcon from '@mui/icons-material/Done';


const TemporaryDrawer = (props) => {
    const { user } = props;
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => setOpen(!open);
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <List>
                    <ListItem>
                        <ListItemText primary="ToDoリスト"/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={user}/>
                    </ListItem>
                    <Divider/>
                    <ListItemButton href='task'>
                        <ListItemIcon>
                            <FormatListBulletedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="タスク一覧" />
                    </ListItemButton>
                    <ListItemButton href='finished'>
                        <ListItemIcon>
                            <DoneIcon/>
                        </ListItemIcon>
                        <ListItemText primary="完了したタスク" />
                    </ListItemButton>
                </List>
            </Drawer>
        </div>
    )
    }

export default TemporaryDrawer;