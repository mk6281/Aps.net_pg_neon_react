import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function UpdateStudent() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const {id} = useParams(); 
    const navigate = useNavigate();


     // ✅ Load existing student info
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/student/` +id)
      .then(res => {
        setName(res.data.Name);
        setEmail(res.data.Email);
      })
      .catch(err => console.error("Error loading student:", err));
  }, [id]);


    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/update/` +id, {name, email})
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
                <h2>Update Student</h2>
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
                <button  className='btn btn-success '>Update</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateStudent
