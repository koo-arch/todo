import React, { useState, createContext } from 'react';
import Header from './header';
import CreateTask from './createTask';
import GetTask from './getTask';

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