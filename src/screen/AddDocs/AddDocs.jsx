import React, {useState} from 'react'
import './AddDocs.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AddDocs() {
  const navigate = useNavigate();
  const [name,setName]=useState('');
  const [description, setDescription]=useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await axios({
      method: 'post',
      url: `https://docket-management.herokuapp.com/doc/${user._id}/adddocs`,
      data: {name,description}
    }).then((res)=>{
      console.log(res);
      localStorage.setItem("document",JSON.stringify(res.data.document))
      navigate("/")
    }).catch((err)=>{
      console.log(err);
    })
  }
  

  return (
    <div className='container my-5'>
              <div className='row d-flex align-items-center'>
              <div className='col-md-6'>
                <img src="https://cdn.dribbble.com/users/644659/screenshots/2396791/icon-1.gif" style={{width:'90%'}} />
              </div>
              <div className='col-md-6'>
              <div class="card shadow">
            <div class="card-body p-5">
        <form>
            <div class="mb-3">
                <label HtmlFor="title" class="form-label">Document Title</label>
                <input type="text" class="form-control" id="title" name='title' value={name} onChange={(e)=>setName(e.target.value)} aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label HtmlFor="description" class="form-label">Document Description</label>
                <input type="text" class="form-control" id="description" name='description' value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className='text-center'>
            <button type="submit" class="btn btn-success" onClick={handleSubmit} >Create</button>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default AddDocs