import React, { useState, createContext } from 'react';
import Header from '../components/header';
import CreateTask from '../components/createTask';
import GetTask from '../components/getTask';

export const PostFlag = createContext(); 

const Task = () => {
    const [postFlag, setPostFlag] = useState(false);
    const value = {
        postFlag,
        setPostFlag
    }
    return (
    <div>
        <Header/>
        <PostFlag.Provider value={value}>
            <CreateTask/>
            <GetTask/>
        </PostFlag.Provider>
    </div>
    )
}

export default Task;