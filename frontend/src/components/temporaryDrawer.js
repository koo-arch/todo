import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoneIcon from '@mui/icons-material/Done';


const TemporaryDrawer = () => {
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