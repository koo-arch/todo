import React from "react";
import { Button, Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Top = () => {
    const defaultTheme = createTheme();
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
                        ToDoアプリ
                    </Typography>
                    <Button 
                        variant="contained"
                        fullWidth
                        href="register"
                        size="large"
                        sx={{ mt: 3, mb: 2}}
                    >
                        新規登録
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        href="login"
                        size="large"
                        sx={{mb: 2 }}
                    >
                        ログイン
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Top;