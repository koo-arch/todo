import React from "react";
import { Link } from "react-router-dom";
import { useCustomContext } from "../components/customContexts";
import CustomSnackbar from "../components/customSnackbar";
import { Button, Box, Container, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Top = () => {
    const defaultTheme = createTheme();
    const { snackbarStatus } = useCustomContext();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component={"main"} maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component={"h1"} variant="h3" sx={{mt: 3}}>
                        ToDoリスト
                    </Typography>
                    <Button 
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/register"
                        size="large"
                        sx={{ mt: 3, mb: 2}}
                    >
                        新規登録
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to="/login"
                        size="large"
                        sx={{mb: 2 }}
                    >
                        ログイン
                    </Button>
                </Box>
            </Container>
            <CustomSnackbar {...snackbarStatus}/>
        </ThemeProvider>
    );
};

export default Top;