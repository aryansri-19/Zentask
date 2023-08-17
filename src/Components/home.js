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
import Calendar from "react-calendar";
import cross from '../images/cross.png'
import 'react-calendar/dist/Calendar.css';
import { Routes, Route, } from "react-router-dom";
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
    const setShowCreatePanel = () => setAllStates({ ...allStates, showCreatePanel: !allStates.showCreatePanel})
    const setAddToSide = () => setAllStates({ ...allStates, addToSide: !allStates.addToSide})
    const setDisplayFeat = () => setAllStates({ ...allStates, displayFeat: !allStates.displayFeat})
    const panel_one_ext = ['Favorites', 'Urgent']

    const [showCalendar, setShowCalendar] = useState({
        value: false,
        add: false
    });
    const toggleCalendar = () => setShowCalendar({ ...showCalendar, value: !showCalendar.value});
    const MyCalendar = () => {
    const handleDay = (date, e) => {
        if(date>=new Date());
        }
    return (
        <div className="calendar-container" style={{zIndex: '99'}}>
            <Calendar onClickDay={handleDay}/>
        </div>
        );
    }; 
    
    const changePath = (e) => {
        console.log(e)
        setAllStates({...allStates, navtext: e.target.value});
    }

    const [taskArray, setTaskArray] = useState([])
    const [categoryArray, setCategoryArray] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/home/all_tasks')
        .then((res)=> setTaskArray(res.data))
        .catch((err)=>{
            console.error("Error fetching tasks", err)
        })
    }, [taskArray]) 
    useEffect(() => {
        axios.get('http://localhost:3000/home/all_cats')
        .then((res)=>setCategoryArray(res.data.map((ele)=>ele.name)))
        .catch((err)=>{
            console.log("Error fetching categories", err)
        })
    }, [categoryArray])

    const deleteSide = async (e) => {
        await axios.post('http://localhost:3000/home/delete_cat', {name: e.target.value})
        .then(console.log("Deleted"))
        .catch((err)=>{
            console.log("Error deleting category", err)
        })
    }
    
    const combinedList = [...panel_one_ext, ...categoryArray]
    return (
        <div className="grid-container">
            <div className="navbar">
                <div className="left-container">
                    <h4>{allStates.navtext}</h4>
                </div>
                <div className="right-container">
                    <h4 onClick={toggleCalendar}>{`${showCalendar.value ? 'X' : 'Calendar'}`}</h4>
                    {showCalendar.value && <MyCalendar/>}
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
                        <><li key={ele} className='panel_extra_item' onClick={changePath}>{ele}</li></>)}
                    </ul>
                    <hr className="divider" onClick={()=>setAllStates({ ...allStates, expand: !allStates.expand})}/>
                </div>
                <button className="create-new-btn" onClick={setAddToSide}>+ Create New</button>
                
            </div>
            <div className="main">
                <div className="main_container">
                    <Routes>
                    <Route path='/' element={<Dashboard taskarray={taskArray} setTaskArray={setTaskArray} mode={props.mode}/>}/>
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
                <CreateNew setShowCreatePanel={setShowCreatePanel}/>
            )}
            {allStates.addToSide && (
                <AddToSide setAddToSide={setAddToSide}/>
            )}
        </div>
    )
}