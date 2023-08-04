import React, { useState, createContext, useRef } from 'react';
import Header from '../components/header';
import CreateTask from '../components/createTask';
import GetTask from '../components/getTask';
import { Container, Typography, Button, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const PostFlag = createContext(); 

const Task = () => {
    const [postFlag, setPostFlag] = useState(false);
    const value = {
        postFlag,
        setPostFlag
    }
    const openRef = useRef();

    const openModal = () => openRef.current.click();
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
                    <Fab color='primary' variant='extended' onClick={openModal}>
                        <AddIcon sx={{ mr: 1 }} />
                        タスク登録
                    </Fab>
                </Grid>
            </Grid>
        </Container>
        <PostFlag.Provider value={value}>
            <GetTask/>
            <CreateTask create={openRef}/>
        </PostFlag.Provider>
    </div>
    )
}

export default Task;