import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Student() {
    const [student, setStudent] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/`)
        .then(res => {
      console.log("Data from backend:", res.data);  // ADD THIS
      setStudent(res.data);})
        .catch(err => console.log( err));
    }, []);

    const handleDelete = (id) => {
        try {
             axios.delete(`${process.env.REACT_APP_API_URL}/student/` +id)
            .then(res => {
                console.log("Delete response:", res.data);  // ADD THIS
                setStudent(student.filter(item => item.ID !== id));
            })
            .catch(err => console.error("Error deleting data:", err));
            window.location.reload();
        }catch (error) {
            console.error("Error in handleDelete:", error);
        }
    };
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
      <div className= 'w-50 bg-white rounded p-3'>
        <Link to = '/create' className='btn btn-success '>Add+</Link>
        <table className='table '>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {student.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to = {`update/${item.id}`} className='btn btn-primary'>Update</Link>
                        <button className='btn btn-danger ms-2' onClick={()=>handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student
