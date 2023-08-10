import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const TableField = ({ rows, columns, title, message = "" }) => {
    if (rows.length === 0 && message !== "") {
        return(
            <Typography component={"h2"} variant='h5' textAlign="center" sx={{ mt : 6, mb: 6 }}>
                {message}
            </Typography>
        )
    } else if (rows.length === 0) {
        return null;
    }
    return(
        <Box width="100%" sx={{ mb: 2 }}>
            <Typography component={"h2"} variant='h5' sx={{ mb: 1 }}>
                {title}
            </Typography>
            <DataGrid rows={rows} columns={columns} disableColumnMenu/>
        </Box>
    )
}

export default TableField;