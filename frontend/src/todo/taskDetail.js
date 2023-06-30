import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { putTask } from '../api/requests';

Modal.setAppElement("#root");

const TaskDetail = (task) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken'])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const onSubmit = (data) => {
    putTask(data, cookies.accesstoken)
      .then(res => {
        console.log(res)
        console.log('変更完了')
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  return (
    <div>
        <li>
            {task.id}: {task.task_name}, {task.text}, {task.date}
        </li>
        <input type="button" value="変更" onClick={() => {openModal()}}/>
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" value={task.id} {...register('id')}/>
            <label>タスク名</label>
            <input type="text" defaultValue={task.task_name} {...register('task_name')}/>
            <label>コメント</label>
            <input type="text" defaultValue={task.text} {...register('text')}/>
            <input type="submit" value="更新"/>
          </form>
        </Modal>
    </div>
  )
}

export default TaskDetail;