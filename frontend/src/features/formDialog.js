import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const FormDialog = (props) => {
    const { open, close, color, title, children, buttonText } = props;
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);
    
    return(
        <>
            <input type="hidden" ref={open} onClick={() => { openDialog() }} />
            <input type="hidden" ref={close} onClick={() => { closeDialog() }} />
            <Dialog 
                open={dialogIsOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={closeDialog}>キャンセル</Button>
                    <Button variant='contained' type="submit" form="dialogform" color={color}>{buttonText}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FormDialog;