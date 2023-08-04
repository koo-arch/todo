import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container } from '@mui/material';
import UpdateTask from './updateTask';
import DeleteTask from './deleteTask';
import FinishButton from './finishButton';

const TaskDetail = ({task}) => {
  const columns = [
    { field: 'deadline', headerName: 'Deadline', width: 100 },
    { field: 'task_name', headerName: 'Tasks', width: 150 },
    { field: 'comment', headerName: 'Comments', width: 300 },
    { field: 'updated_at', headerName: 'Update', width: 100 },
    {
      field: 'editBtn',
      headerName: '編集',
      sortable: false,
      width: 70,
      disableClickEventBubbling: true,
      renderCell: (params) => <UpdateTask {...params.row}/>
    },
    {
      field: 'deleteBtn',
      headerName: '削除',
      sortable: false,
      width: 70,
      disableClickEventBubbling: true,
      renderCell: (params) => <DeleteTask {...params.row}/>
    },
    {
      field: 'finishBtn',
      headerName: '完了',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <FinishButton {...params.row}/>
    },
  ]

  // 締切日の昇順をデフォルトにする
  const sortedRows = [...task].sort((a, b) => {
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);
    return deadlineA - deadlineB;
  });
  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <DataGrid rows={sortedRows} columns={columns} disableColumnMenu/>
      </Box>
    </Container>
  )
}

export default TaskDetail;