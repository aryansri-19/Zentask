import React, { useState } from "react";
import '../styles/create_new.css';
import cross from '../images/cross.png';
import axios from "axios";
import { toast } from "react-toastify";
export default function CreateNew(props){
    const currTimes = new Date()
    const currDate = currTimes.toISOString().split('T')[0]
    const currTime = currTimes.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true} )
    const [task, setTask] = useState(
        {
            user_id: props.user_id,
            task_name: '',
            cat:'',
            start_date: '',
            start_time: '',
            desc: ''
        }
    )
    const handleChange = (e)=> {
        e.preventDefault()
        const {name, value} = e.target
        if(name==='start_time')
        {
            var hh, tt
            var hour = value.split(":")
            if(Number(hour[0])>=12)
            {
                hh = hour[0] === '12' ? '12' : (Number(hour[0]) - 12).toString()
                tt = 'P.M'
            }
            else
            {
                hh = hour[0] === '00' ? '12' : hour[0]
                tt = 'A.M'
            }
            setTask({
                ...task, start_time: hh+":"+hour[1]+" "+tt
            })
        }
        else
            setTask({ ...task, [name]: value})
    }
    const handleAdding = (e)=>{
        e.preventDefault()
        if(!task.task_name || !task.cat || !task.desc)
        {
            toast.warning(`Information is not complete`, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            })
            console.log(e)
            return
        }
        try{
            axios.post('http://localhost:3000/home/new_task', task)
            .then((res)=>{
                if(res.status===200)
                    console.log(res.data.message)
                else
                    console.log(res.data.error)
            })
            .catch( e =>
                console.log('Could not receive response', e)
            )
            props.setShowCreatePanel(false)
        }
        catch(e){
            console.log('Could not send task to server')    
        }
    }
    return(
        <div className="floating-panel">
         <div className="heading">
         <h2>Create New Task</h2>
         <img src={cross} alt="cross" style={{height:"30px", cursor: "pointer"}} onClick={() => props.setShowCreatePanel(false)}/>
         </div>
          <form method="POST">
            <div className="task-name">
                <h4>Task : </h4>
                <label htmlFor='name'>
                    <input type='text' id='name' name='task_name' placeholder="Unique Task 1" onChange={handleChange}/>
                </label>
            </div>
            <div className="cat-name">
                <h4>Category : </h4>
                <label htmlFor='cat'>
                <input
                type="text"
                list="cat"
                placeholder="Select" name='cat' onChange={handleChange}/>
            <datalist id="cat">
                <option value="Personal" />
                <option value="Team" />
                <option value="Office" />
            </datalist>
                </label>
            </div>
            <div className="time">
            <h4>Select Time:</h4>
            <input type="date" id="datepicker" name="start_date" min={currDate} onChange={handleChange} required/>
            <input type="time" id="timepicker" name="start_time" min={currTime} onChange={handleChange} required/>
            </div>
            <div className="task-desc">
                <h4>Description : </h4>
                <label htmlFor='desc'>
                    <textarea id='desc' placeholder="Add details" name='desc' onChange={handleChange}/>
                </label>
            </div>
            <div className="add-button">
            <button className="add-btn" onClick={handleAdding}>Add Task</button>
            </div>
          </form>
        </div>
    )
}