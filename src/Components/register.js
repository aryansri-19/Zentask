import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/register.css';
import Logo from '../images/banner.png'
import light from '../images/brightness.png'
import dark from '../images/weather.png'
import BG1 from "../images/todo1.svg"
import BG2 from "../images/todo2.svg"

export default function Signup(props) {
    const [login, setLogin] = useState(false)
    const history = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:3000/register', user)
                .then(res => {
                    if (res.data.status === 'exist')
                        history(`/home/${res.data.username}`, { state: { id: res.data.username } })
                    else {
                        alert('User does not exist. Register yourself')
                        setLogin(false)
                    }
                })
                .catch(e => {
                    alert('Wrong details')
                    console.log(e)
                })
        }
        catch (e) {
            console.log("Could not send the data")
        }
    }
    const handleSignup = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:3000/register', user)
                .then(res => {
                    if (res.data === 'exist') {
                        alert('User already exists')
                        setLogin(true)
                    }
                    else
                        history(`/home/${user.username}`, { state: { id: user.username } })
                })
                .catch(e => {
                    alert('Wrong details')
                    console.log(e)
                })
        }
        catch (e) {
            console.log("Could not send the data")
        }
    }

    return (
        <div>
            <div className="main_panel">
                <img src={Logo} alt='logo' className="logo" />
                <form method="POST">
                    <div className="fields">
                        <div className="choice"><div id='signup' style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}` }} onClick={() => setLogin(false)}>Sign Up</div><hr/><div id='login' style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}` }} onClick={() => setLogin(true)}>Login</div></div>
                        {!login && <div>
                            <div className="name_div">
                                <label htmlFor="name">
                                    <h4 style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}`}}>Username</h4><input placeholder='John Doe' type="text" name="username" id="name" required onChange={handleChange} autoComplete="off" />
                                </label>
                            </div>
                            <div className="email_div">
                                <label htmlFor="email">
                                    <h4 style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}`}}>Email</h4><input type="email" placeholder="example@xyz.com" name="email" id="email" required onChange={handleChange} autoComplete="off"/>
                                </label>
                            </div>
                            <div className="pass_div">
                                <label htmlFor="password">
                                    <h4 style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}`}}>Password</h4> <input type="password" placeholder='Atleast 8 characters' name="password" id="password" required onChange={handleChange}/>
                                </label>
                            </div>
                            <div className="signin">
                                <button className="submit" onClick={handleSignup}>Signup</button>
                                <img src={`${props.mode === 'dark' ? light : dark}`} alt='theme' className="theme" onClick={props.toggleMode} />
                            </div>
                        </div>}
                        {login && <div>
                            <div className="email_div">
                                <label htmlFor="email">
                                    <h4 style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}`}}>Email</h4><input placeholder='Your email' type="email" name="email" id="email" required onChange={handleChange} autoComplete="off" />
                                </label>
                            </div>
                            <div className="pass_div">
                                <label htmlFor="password">
                                    <h4 style={{ color: `${props.mode === 'light' ? 'black' : '#faf9f9'}`}}>Password</h4> <input type="password" placeholder="8 characters password" name="password" id="password" required onChange={handleChange}/>
                                </label>
                            </div>
                            <div className="signin">
                                <button className="submit" onClick={handleLogin}>Login</button>
                                <img src={`${props.mode === 'dark' ? light : dark}`} alt='theme' className="theme" onClick={props.toggleMode} />
                            </div>
                        </div>
                        }
                    </div>
                </form>
            </div>
            <div className="background">
                <div className="leftImage">
                    <img src={BG1} alt="BG1"/>
                </div>
                <div className="rightImage">
                    <img src={BG2} alt="BG1"/>
                </div>
            </div>
        </div>
    )
}