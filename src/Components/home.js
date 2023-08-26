import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/home.css'
import logo from '../images/banner.png';
import create_new from '../images/createNew.png';
import features from '../images/features.png';
import light from '../images/brightness.png'
import dark from '../images/weather.png'
import Dashboard from "./dashboard";
import CreateNew from "./create_new";
import AddToSide from './add_to_side';
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function Home(props) {
    const panel_one = ['Dashboard', 'Notifications', 'Goals']
    const [allStates, setAllStates] = useState({
        navtext: panel_one[0],
        searchValue: '',
        expand: false,
        showCreatePanel: false,
        addToSide: false,
        displayFeat: false
    })
    const user = useLocation();
    const setShowCreatePanel = () => setAllStates({ ...allStates, showCreatePanel: !allStates.showCreatePanel})
    const setAddToSide = () => setAllStates({ ...allStates, addToSide: !allStates.addToSide})
    const setDisplayFeat = () => setAllStates({ ...allStates, displayFeat: !allStates.displayFeat})
    const panel_one_ext = ['Favorites', 'Urgent']

    const [showCalendar, setShowCalendar] = useState(false);
    const toggleCalendar = () => setShowCalendar(!showCalendar);
    const MyCalendar = () => {  
    return (
        <div className="calendar-container" style={{zIndex: '3'}}>
            Calendar
        </div>
        );
    }; 


    const [taskArray, setTaskArray] = useState([])
    const [categoryArray, setCategoryArray] = useState([])

    function checkNotfication(task){
        const startTime = new Date(`${task.start_date} ${task.start_time.replace(".", "").toUpperCase()}`)  
        const currentTime = new Date();
        const timeDifference = startTime.getTime() - currentTime.getTime();
        const minutesDifference = timeDifference / (1000 * 60);
        if (minutesDifference == 30 || minutesDifference == 10 || minutesDifference == 5) {
            toast.warning(`Reminder: Task "${task.task_name}" starts in ${minutesDifference} minutes.`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            })
        }
    }
    useEffect(() => {
        taskArray.forEach((task)=> checkNotfication(task))
            }, [taskArray])
    useEffect(()=>{
        axios.get(`http://localhost:3000/home/all_tasks?id=${user.state.id}`)
        .then((res)=> {
            setTaskArray(res.data)
        })
        .catch((err)=>{
            console.error("Error fetching tasks", err)
        })
    }, [taskArray, user.state.id]) 
    useEffect(() => {
        axios.get(`http://localhost:3000/home/all_cats?id=${user.state.id}`)
        .then((res)=>{
            setCategoryArray(res.data.map((ele)=>ele.name))
        })
        .catch((err)=>{
            console.log("Error fetching categories", err)
        })
    }, [categoryArray, user.state.id])

    const deleteSide = async (e) => {
        await axios.post(`http://localhost:3000/home/delete_cat?id=${user.state.id}`, {name: e.target.value})
        .then(console.log("Deleted"))
        .catch((err)=>{
            console.log("Error deleting category", err)
        })
    }
    
    const combinedList = [...panel_one_ext, ...categoryArray]
    return (
        <>
        <ToastContainer/>
        <div className="grid-container">
            <div className="navbar">
                <div className="left-container">
                    <h4>{allStates.navtext}</h4>
                </div>
                <div className="right-container" style={{zIndex:'3'}}>
                    <h4 onClick={toggleCalendar}>{`${showCalendar ? 'X' : 'Calendar'}`}</h4>
                    {showCalendar && <MyCalendar/>}
                </div>
            </div>
            <div className="sidebar">
                <div className="banner-container">
                    <img src={logo} className="banner" alt="zentask" />
                </div>
                <div className="search-bar">
                    <input type='search' placeholder="Search" onChange={(e)=>{ e.preventDefault();
                    setAllStates({ ...allStates, searchValue: e.target.value})}} value={allStates.searchValue}/>
                </div>
                <div className="panel-one">
                    <ul className="panel-one-list">
                        {panel_one.map((ele)=>
                        <li key={ele} className='panel_one_item' onClick={()=>setAllStates({...allStates, navtext: ele})}>{ele}</li>)}
                        { allStates.expand && combinedList.map((ele)=>
                        <><li key={ele} className='panel_extra_item' onClick={()=>setAllStates({...allStates, navtext: ele})}>{ele}</li></>)}
                    </ul>
                    <hr className="divider" onClick={()=>setAllStates({ ...allStates, expand: !allStates.expand})}/>
                </div>
                <button className="create-new-btn" onClick={setAddToSide}>+ Create New</button>
                
            </div>
            <div className="main">
                <div className="main_container">
                    <Routes>
                    <Route path='/' element={<Dashboard taskarray={taskArray} setTaskArray={setTaskArray} mode={props.mode} user_id={user.state.id}/>}/>
                    <Route path='/notifications' element={<h1>Hello</h1>}/>
                    </Routes>
                </div>
            </div>
            <div className="footer" style={{ backgroundColor: `${props.mode==='light'?'rgba(227, 227, 227, 1)':'#192734'}`, 
            borderTop:`1px solid ${props.mode==='light'?'black':'white'}`}}>
                <div className="left-footer">
                <img src={`${props.mode==='dark'?light:dark}`} onClick={props.toggleMode} alt='mode' className='home_theme'/>
                </div>
                <div className="right_footer">
                    <img src={create_new} alt="Create new task" onClick={setShowCreatePanel} title="Create new task"/>
                    <img src={features} alt="Features" onClick={setDisplayFeat} style={{height: "30px", }} title="Features"/>
                </div>
            </div>
            {allStates.showCreatePanel && (
                <CreateNew setShowCreatePanel={setShowCreatePanel} user_id={user.state.id}/>
            )}
            {allStates.addToSide && (
                <AddToSide setAddToSide={setAddToSide} user_id={user.state.id}/>
            )}
        </div>
        </>
    )
}