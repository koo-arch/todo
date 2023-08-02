import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from '../pages/task';
import useCustomAxios from '../hooks/useCustomAxios';

Modal.setAppElement("#root");

const UpdateTask = (task) => {
    const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken'])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const {postFlag, setPostFlag} = useContext(PostFlag);


    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const putTask = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }

        const request = new requestAPI(param);
        return request.put();
    }

    const onSubmit = (data) => {
        putTask(data)
            .then(res => {
                console.log(res)
                console.log('変更完了')
                setPostFlag(!postFlag);
                closeModal();
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    return(
        <div>
            <input type="button" value="変更" onClick={() => { openModal() }} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={task.id} {...register('id')} />
                    <label>タスク名</label>
                    <input type="text" defaultValue={task.task_name} {...register('task_name')} />
                    <label>コメント</label>
                    <input type="text" defaultValue={task.comment} {...register('comment')} />
                    <label>期限</label>
                    <input type="datetime-local" defaultValue={task.deadline} {...register('deadline')} />
                    <input type="submit" value="更新" />
                </form>
            </Modal>
        </div>
    )
}

export default UpdateTask;