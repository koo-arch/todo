import React, { useContext } from 'react';
import Header from '../components/header';
import GetTask from '../features/getTask';
import FinishedList from '../features/finishedList';
import urls from '../api/urls';
import CustomSnackbar from '../components/customSnackbar';
import { Container, Typography } from '@mui/material';
import { useCustomContext } from '../components/customContexts';

const Finished = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <div>
            <Header/>
            <Container sx={{ mt: 3, mb: 3 }}>
                <Typography component={"h1"} variant="h3">
                    完了したタスク
                </Typography>
            </Container>
            <GetTask displayComponent={FinishedList} url={urls.FinishedList}/>
            <CustomSnackbar {...snackbarStatus}/>
        </div>
    )
}

export default Finished;