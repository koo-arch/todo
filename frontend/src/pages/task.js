import React, { useRef } from 'react';
import Header from '../components/header';
import CreateTask from '../features/createTask';
import GetTask from '../features/getTask';
import TaskList from '../features/taskList';
import urls from '../api/urls';
import CustomSnackbar from '../components/customSnackbar';
import { Container, useMediaQuery, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCustomContext } from '../components/customContexts';

const Task = () => {
    const { snackbarStatus } = useCustomContext();
    const isMobileSize = useMediaQuery('(max-width: 500px');
    const openRef = useRef();

    const openCreateTask = () => openRef.current.click();
    return (
    <div>
        <Header/>
        <Container>
            <Grid container sx={{ mt: 3, mb: 3 }}>
                <Grid item xs>
                    <Typography component={"h1"} variant="h3">
                        タスク一覧
                    </Typography>
                </Grid>
                {!isMobileSize &&
                    <Grid>
                        <Fab color='primary' variant='extended' onClick={openCreateTask}>
                            <AddIcon sx={{ mr: 1 }} />
                            タスク登録
                        </Fab>
                    </Grid>
                }
            </Grid>
        </Container>
        <GetTask displayComponent={TaskList} url={urls.TaskList}/>
        <CreateTask create={openRef}/>
        <CustomSnackbar {...snackbarStatus}/>
    </div>
    )
}

export default Task;