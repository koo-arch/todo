import React, {useState, createContext} from 'react';
import CreateTask from './createTask';

export const PostFlag = createContext(); 

const Task = () => {
    const [postFlag, setPostFlag] = useState(false);
    const value = {
        postFlag,
        setPostFlag
    }
    return (
    <div>
        <PostFlag.Provider value={value}>
            <CreateTask/>
        </PostFlag.Provider>
    </div>
    )
}

export default Task;