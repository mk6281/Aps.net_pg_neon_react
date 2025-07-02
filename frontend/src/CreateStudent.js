import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CreateStudent() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/create`, { name, email })
        .then(res => {
            console.log( res);
            navigate('/'); 
        }).catch(err => console.error("Error submitting data:", err));
    }
  return (
    <div>
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type='text' className='form-control' placeholder='Enter Name' 
                onChange={e => setName(e.target.value)}/>
                </div>
                <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type='email' className='form-control' placeholder='Enter Email'
                onChange={e => setEmail(e.target.value)} />
                </div>
                <button  className='btn btn-success '>Submit</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default CreateStudent
