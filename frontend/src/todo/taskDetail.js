import React, { useState } from 'react';
import Modal from 'react-modal';
import UpdateTask from './updateTask';
import DeleteTask from './deleteTask';

Modal.setAppElement("#root");

const TaskDetail = (task) => {
  return (
    <div>
        <li>
            {task.id}: {task.task_name}, {task.text}, {task.date}
        </li>
        <UpdateTask {...task}/>
        <DeleteTask {...task}/>
    </div>
  )
}

export default TaskDetail;