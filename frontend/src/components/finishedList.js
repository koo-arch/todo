import React from 'react';
import { Container } from '@mui/material';
import DeleteTask from './deleteTask';
import FinishButton from './finishButton';
import TableField from './tableField';
import urls from '../api/urls';

const FinishedList = ({ task }) => {
    const columns = [
        { field: 'deadline', headerName: 'Deadline', flex: 2 },
        { field: 'task_name', headerName: 'Tasks', flex: 1.5 },
        { field: 'comment', headerName: 'Comments', flex: 4 },
        { field: 'updated_at', headerName: 'Update', flex: 2 },
        {
            field: 'deleteBtn',
            headerName: '削除',
            sortable: false,
            width: 70,
            disableClickEventBubbling: true,
            renderCell: (params) => <DeleteTask url={urls.FinishedList} {...params.row} />
        },
        {
            field: 'finishBtn',
            headerName: '完了',
            sortable: false,
            width: 120,
            disableClickEventBubbling: true,
            renderCell: (params) => <FinishButton buttonText='未完了' message='未完了に変更しました。' url={urls.FinishedList} {...params.row} />
        },
    ]

    // 最終更新の降順をデフォルトにする
    const sortedRows = [...task].sort((a, b) => {
        const deadlineA = new Date(a.update_at);
        const deadlineB = new Date(b.update_at);
        return deadlineB - deadlineA;
    });

    return (
        <Container>
            <TableField rows={sortedRows} columns={columns} message="完了したタスクはありません" />
        </Container>
    )
}

export default FinishedList;