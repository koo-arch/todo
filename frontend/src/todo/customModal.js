import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';

const CustomModal = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const customStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 24,
        p: 1,
    }

    return (
        <div>
            <input type="hidden" ref={props.open} onClick={() => { openModal() }}/>
            <input type="hidden" ref={props.close} onClick={() => { closeModal() }}/>
            <Modal
                open={modalIsOpen}
                onClose={closeModal}
            >
                <Box sx={customStyles}>
                    {props.children}
                </Box>
            </Modal>
        </div>
    )
}

export default CustomModal;