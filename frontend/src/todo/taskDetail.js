import React from 'react';

const taskDetail = (task) => {
  return (
    <div>
        <li>
            {task.id}: {task.task_name}, {task.text}, {task.date}
        </li>
    </div>
  )
}

export default taskDetail;