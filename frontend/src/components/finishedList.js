import React from 'react';
import { Container, useMediaQuery } from '@mui/material';
import DeleteTask from './deleteTask';
import FinishButton from './finishButton';
import TableField from './tableField';
import urls from '../api/urls';

const FinishedList = ({ task }) => {
    const isMediumSize = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isMobileSize = useMediaQuery('(max-width: 500px');
    const eachColumns = isMediumSize 
    ? [
        // 900px未満の列項目
        { field: 'deadline', headerName: 'Deadline', flex: 1 },
        { field: 'task_name', headerName: 'Tasks', flex: 1.5 },
    ]
    :[
        // 900px以上の列項目
        { field: 'deadline', headerName: 'Deadline', flex: 2 },
        { field: 'task_name', headerName: 'Tasks', flex: 2 },
        { field: 'comment', headerName: 'Comments', flex: 3 },
        { field: 'updated_at', headerName: 'Update', flex: 2 },
    ]
    
    const buttonColumns = isMobileSize ? []
    : [
        {
            field: 'deleteBtn',
            headerName: '削除',
            sortable: false,
            width: 70,
            disableClickEventBubbling: true,
            renderCell: (params) => <DeleteTask url={urls.FinishedList} {...params.row} />
        },
    ]

    const columns = [...eachColumns, ...buttonColumns, {
        field: 'finishBtn',
        headerName: '完了',
        sortable: false,
        width: 90,
        disableClickEventBubbling: true,
        renderCell: (params) => <FinishButton buttonText='未完了' message='未完了に変更しました。' url={urls.FinishedList} {...params.row} />
        },
    ]

    // 最終更新の降順をデフォルトにする
    const sortedRows = [...task].sort((a, b) => {
        const deadlineA = new Date(a.updated_at);
        const deadlineB = new Date(b.updated_at);
        return deadlineB - deadlineA;
    });

    return (
        <Container>
            <TableField 
                rows={sortedRows} 
                columns={columns} 
                message="完了したタスクはありません"
                url={urls.FinishedList}
            />
        </Container>
    )
}

export default FinishedList;