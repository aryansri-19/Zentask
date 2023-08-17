import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/banner.png'
import light from '../images/brightness.png'
import dark from '../images/weather.png'
import '../styles/getstarted.css'


export default function GetStarted(props){
    return (
        <div>
        <nav className="top">
            <Link to='/'><img src={Logo} alt='Logo' id='banner'/></Link>
            <div className='right-side'>
                <Link to='/register' style={{textDecoration:'none'}}><h2 className='register' style={{color: `${props.mode==='light' ? 'black' : '#faf9f9'}`}}>Sign Up / Log In</h2></Link>
                <img src={`${props.mode==='dark'?light:dark}`} onClick={props.toggleMode} alt='mode' className='theme'/>
            </div>
        </nav>
        <main className='start-main'>
            <div className='desctext'>
                <h2 style={{color: `${props.mode==='light' ? 'black' : '#faf9f9'}`}}>Schedule and manage your tasks/activities in an efficient manner.</h2>
                <p className='detail' style={{color: `${props.mode==='light' ? 'black' : '#faf9f9'}`}}>Find peace and productivity in task management. 
                    Streamline your to-do list with a serene and intuitive interface. Set priorities, track progress, and achieve your goals effortlessly. 
                    Collaborate with ease and maintain work-life balance. Embrace tranquility and efficiency with ZenTask!</p>
            </div>
            <Link to="/home"><button className='getstarted'>Get Started</button></Link>
        </main>
        </div>
    )
}