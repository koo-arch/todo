import React, { useContext } from 'react';
import Header from '../components/header';
import GetTask from '../components/getTask';
import FinishedList from '../components/finishedList';
import urls from '../api/urls';
import CustomSnackbar from '../components/customSnackbar';
import { Container, Typography } from '@mui/material';
import { Contexts } from '../App';

const Finished = () => {
    const { snackbarStatus } = useContext(Contexts);
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