import React, { useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import bin from '../images/dustbin.png';
import check from '../images/check.png';
import '../styles/dashboard.css';
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard(props) {
    var showNothing = false
    if (props.taskarray.filter((prev) => prev.done === 0).length === 0)
        showNothing = true

    const taskDone = (taskName, value) => {
        setTimeout(async () => {
            try {
                if (value) {
                    await axios.post('http://localhost:3000/home/update-task', { user_id: props.user_id, task_name: taskName, done: value })
                        .then(toast.success('Task updated', {
                            position: "top-right",
                            autoClose: 500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: `${props.mode === 'light' ? 'colored' : 'dark'}`,
                            }))
                }
                else {
                    await axios.post('http://localhost:3000/home/delete-task', { user_id: props.user_id, task_name: taskName })
                        .then(toast.info('Task deleted', {
                            position: "top-right",
                            autoClose: 500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: `${props.mode === 'light' ? 'colored': 'dark'}`,
                            }))
                }
                const updatedTasks = props.taskarray.filter((task) => task.task_name !== taskName);
                props.setTaskArray(updatedTasks);
            }
            catch (err) {
                console.log('Error deleting/updating task')
            }
        }, 500);
    }

    return (
        <div className="tasks">
            {!showNothing && props.taskarray.map((ele) => {
                return (ele.done !== 1 &&
                    <div>
                        <ul className="tasklist">
                            <li key={ele.task_name}>
                                <div className="task-entry">
                                    <h3>{ele.task_name}</h3>
                                    <div className="cat_time">
                                        <h4>{ele.cat}</h4>
                                        <h4>{ele.start_date}</h4>
                                        <h4>{ele.start_time}</h4>
                                    </div>
                                    <h4>{ele.desc}</h4>
                                </div>
                                <div className="ok-or-cancel">
                                    <button className="check" onClick={() => taskDone(ele.task_name, 1)} title='Done'><img src={check} alt="Check" /></button>
                                    <hr />
                                    <button className="bin" onClick={() => taskDone(ele.task_name, 0)} title='Remove'><img src={bin} alt="Bin" /></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            })}
            {showNothing && <div className="nothing" style={{color: `${props.mode==='light'?'black':'white'}`}}>
                Nothing to show
            </div>}
            <ToastContainer/>
        </div>
    )
}