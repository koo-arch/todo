import React from 'react';
import UpdateTask from './updateTask';
import DeleteTask from './deleteTask';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    List, 
    ListItem, 
    ListItemText,
    Button,
    Grid
 } from '@mui/material';

const DetailDialog = (props) => {
    const { url, open, onClose, rowData } = props;
    const iconSize = {
        width: 30,
        height: 30,
    }

    return(
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>詳細データ</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="期限"
                                secondary={rowData.deadline}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="タスク名"
                                secondary={rowData.task_name}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="コメント"
                                secondary={rowData.comment}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="最終更新日時"
                                secondary={rowData.updated_at}
                                />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="作成日時"
                                secondary={rowData.created_at}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                sx={{ minWidth: 400 }}
                            />
                        </ListItem>
                    </List>
                    <Grid container justifyContent='space-evenly'>
                        { !rowData.is_finished && 
                            <Grid item>
                                <UpdateTask 
                                    url={url}
                                    iconSize={iconSize}
                                    size="large"
                                    {...rowData}
                                />
                            </Grid>
                        }
                        <Grid item>
                            <DeleteTask 
                                url={url}
                                iconSize={iconSize}
                                size="large"
                                {...rowData}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DetailDialog;