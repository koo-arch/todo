import React, { useRef } from 'react';
import Header from '../components/header';
import CreateTask from '../components/createTask';
import GetTask from '../components/getTask';
import TaskList from '../components/taskList';
import urls from '../api/urls';
import { Container, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Task = () => {
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
                <Grid>
                    <Fab color='primary' variant='extended' onClick={openCreateTask}>
                        <AddIcon sx={{ mr: 1 }} />
                        タスク登録
                    </Fab>
                </Grid>
            </Grid>
        </Container>
        <GetTask displayComponent={TaskList} url={urls.TaskList}/>
        <CreateTask create={openRef}/>
    </div>
    )
}

export default Task;