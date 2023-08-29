import { createContext, useState, useContext } from 'react';

const CustomContext = createContext();

export const useCustomContext = () => {
    return useContext(CustomContext);
}

export const ContextProvider = ({ children }) => {

    const barInitialState = {
        open: false,
        severity: "success",
        message: "成功しました。"
    }
    const [snackbarStatus, setSnackbarStatus] = useState(barInitialState);

    const userInitialState = {
        id: '',
        email: '',
    }
    const [userInfo, setUserInfo] = useState(userInitialState);
    const [postFlag, setPostFlag] = useState(false);

    const value = {
        postFlag,
        setPostFlag,
        snackbarStatus,
        setSnackbarStatus,
        userInfo,
        setUserInfo
    };
    return (
        <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
    );
}