import React from 'react';
import Header from '../components/header';
import GetTask from '../components/getTask';
import FinishedList from '../components/finishedList';
import urls from '../api/urls';
import { Container, Typography } from '@mui/material';

const Finished = () => {
    return (
        <div>
            <Header/>
            <Container sx={{ mt: 3, mb: 3 }}>
                <Typography component={"h1"} variant="h3">
                    完了したタスク
                </Typography>
            </Container>
            <GetTask displayComponent={FinishedList} url={urls.FinishedList}/>
        </div>
    )
}

export default Finished;