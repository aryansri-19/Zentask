import React, { useState } from 'react'
import cross from '../images/cross.png';
import axios from 'axios';

export default function AddToSide(props) {
  const [category, setCategory] = useState({user_id: props.user_id, name: ''})
  const handleChange = (e) => {
    setCategory({ ...category, name: e.target.value})
  }
  const handleAdding = (e)=>{
    e.preventDefault()
    if(!category.name)
      return
    try{
        axios.post('http://localhost:3000/home/add_side', category)
        .then((res)=>{
            if(res.status===200)
                console.log(res.data.message)
            else
                console.log(res.data.error)
        })
        .catch( e =>
            console.log('Could not receive response', e)
        )
        props.setAddToSide(false)
    }
    catch(e){
        console.log('Could not send task to server')    
    }
}
  return (
    <div className='floating-panel'>
        <div className="heading">
         <h2>Create New Category</h2>
         <img src={cross} alt="cross" style={{height:"30px", cursor: "pointer"}} onClick={() => props.setAddToSide(false)}/>
        </div>
        <form method="POST">
            <div className="task-name">
                <h4>Category : </h4>
                <label htmlFor='name'>
                    <input type='text' id='name' name='category_name' required placeholder="Category 1" onChange={handleChange}/>
                </label>
            </div>
            <div className="add-button">
            <button className="add-btn-side" onClick={handleAdding}>Add</button>
            </div>
          </form>
    </div>
  )
}
