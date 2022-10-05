import React from 'react'
import './AddDocs.css'

function AddDocs() {
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
                <label for="title" class="form-label">Document Title</label>
                <input type="text" class="form-control" id="title" name='title' aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Document Description</label>
                <input type="password" class="form-control" id="description" name='description' />
            </div>
            <div className='text-center'>
            <button type="submit" class="btn btn-success" >Create</button>
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