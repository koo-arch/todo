import React from 'react';
import { Box, Container } from '@mui/material';
import UpdateTask from './updateTask';
import DeleteTask from './deleteTask';
import FinishButton from './finishButton';
import TableField from './tableField';
import urls from '../api/urls';

const TaskList = ({task}) => {
  const columns = [
    { field: 'deadline', headerName: 'Deadline', flex: 2 },
    { field: 'task_name', headerName: 'Tasks', flex: 1.5 },
    { field: 'comment', headerName: 'Comments', flex: 4 },
    { field: 'updated_at', headerName: 'Update', flex: 2 },
    {
      field: 'editBtn',
      headerName: '編集',
      sortable: false,
      width: 70,
      disableClickEventBubbling: true,
      renderCell: (params) => <UpdateTask url={urls.TaskList} {...params.row}/>
    },
    {
      field: 'deleteBtn',
      headerName: '削除',
      sortable: false,
      width: 70,
      disableClickEventBubbling: true,
      renderCell: (params) => <DeleteTask url={urls.TaskList} {...params.row}/>
    },
    {
      field: 'finishBtn',
      headerName: '完了',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <FinishButton buttonText='完了' message='タスク完了' url={urls.TaskList} {...params.row}/>
    },
  ]

  // 締切日の昇順をデフォルトにする
  const sortedRows = [...task].sort((a, b) => {
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);
    return deadlineA - deadlineB;
  });

  // タスクをグループ分けする関数
  const groupTasksByDeadline = (tasks) => {
    const nowTime = new Date();
    const oneDateLater = new Date(nowTime.getTime() + 24 * 60 * 60 * 1000 );
    const oneWeekLater = new Date(nowTime.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthLater = new Date(nowTime.getTime() + 30 * 24 * 60 * 60 * 1000);

    const expiredTasks = tasks.filter(task => new Date(task.deadline) < nowTime);
    const todayTasks = tasks.filter(task => new Date(task.deadline) >= nowTime && new Date(task.deadline) < oneDateLater);
    const oneWeekTasks = tasks.filter(task => new Date(task.deadline) > oneDateLater && new Date(task.deadline) <= oneWeekLater);
    const oneMonthTasks = tasks.filter(task => new Date(task.deadline) > oneWeekLater && new Date(task.deadline) <= oneMonthLater);
    const laterTasks = tasks.filter(task => new Date(task.deadline) > oneMonthLater);
  
    return {
      expired : expiredTasks,
      today: todayTasks,
      oneWeek: oneWeekTasks,
      oneMonth: oneMonthTasks,
      later: laterTasks,
    };
  };

  const groupedTasks = groupTasksByDeadline(sortedRows);

  return (
    <Container>
      <TableField rows={groupedTasks.expired} columns={columns} title="期限切れのタスク"/>
      <TableField rows={groupedTasks.today} columns={columns} title="1日以内のタスク" message="1日以内のタスクはありません"/>
      <TableField rows={groupedTasks.oneWeek} columns={columns} title="1週間以内のタスク"/>
      <TableField rows={groupedTasks.oneMonth} columns={columns} title="1ヶ月以内のタスク"/>
      <TableField rows={groupedTasks.later} columns={columns} title="1ヶ月以降のタスク"/>
    </Container>
  )
}

export default TaskList;