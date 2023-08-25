import React from 'react';
import { Container, useMediaQuery } from '@mui/material';
import TableField from './tableField';
import urls from '../api/urls';

const FinishedList = ({ task }) => {
    const isMediumSize = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isMobileSize = useMediaQuery('(max-width: 500px');
    const columns = isMobileSize 
    ? [
        // 500px未満の列項目
        { field: 'deadline', headerName: 'Deadline', flex: 1 },
        { field: 'task_name', headerName: 'Tasks', flex: 1.5 },
    ]
    : isMediumSize 
    ?[
        // 500px以上900px未満の列項目
        { field: 'deadline', headerName: 'Deadline', flex: 1 },
        { field: 'task_name', headerName: 'Tasks', flex: 1.5 },
        { field: 'updated_at', headerName: 'Update', flex: 1 },
    ]:
    
    [
        // 900px以上の列項目
        { field: 'deadline', headerName: 'Deadline', flex: 2 },
        { field: 'task_name', headerName: 'Tasks', flex: 2 },
        { field: 'comment', headerName: 'Comments', flex: 3 },
        { field: 'updated_at', headerName: 'Update', flex: 2 },
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