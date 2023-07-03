import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from './task';

Modal.setAppElement('#root');

const DeleteTask = (task) => {
    const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken'])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const {postFlag, setPostFlag} = useContext(PostFlag);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const deleteTask = (data) => {
        const requestJson = new requestData(data);
 
        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }

        const request = new requestAPI(param);
        return request.delete()
    }

    const onSubmit = (data) => {
        deleteTask(data)
            .then(res => {
                console.log(res)
                console.log('削除完了')
                setPostFlag(!postFlag);
                closeModal();
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    return (
        <div>
            <input type="button" value="削除" onClick={() => { openModal() }} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={task.id} {...register('id')} />
                    <p>この項目を削除してよろしいですか？</p>
                    <p>タスク名：{task.task_name} 日付：{task.date}</p>
                    <input type="button" value="キャンセル" onClick={() => { closeModal() }}/>
                    <input type="submit" value="削除"/>
                </form>
            </Modal>
        </div>
    )
}

export default DeleteTask;