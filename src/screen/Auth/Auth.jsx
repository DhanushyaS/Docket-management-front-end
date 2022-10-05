import React,{useState} from 'react'

function Auth() {
  const [login,setlogin]=useState(true)
  return (
    <div>
            <div class="container-fluid my-0">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <img src="https://elearn.daffodilvarsity.edu.bd/pluginfile.php/1044535/mod_assign/intro/f5100f72b303d6e5be8357d02a8dbb5e.gif" class="img-fluid vh-100" alt="..." />
            </div>
            <div class="col-md-6">
              {login?
            <div class="card shadow ">
            <div class="card-body">
                <form>
                    <div class="text-primary text-center fs-3 fw-bold mb-2">LOGIN</div>
                    <div class="mb-3 pt-3">
                      <label for="user" class="form-label">USERNAME</label>
                      <input type="text" class="form-control" id="user" />
                    </div>
                    <div class="mb-3 pt-3">
                      <label for="pass" class="form-label">PASSWORD</label>
                      <input type="password" class="form-control" id="pass" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                  </form>
                  <div>Don't have an account?<span className='text-primary mx-2' onClick={()=>setlogin(!login)} style={{cursor:'pointer'}}>Sign up</span></div>
            </div>
        </div>:
        <div class="card shadow ">
        <div class="card-body">
            <form>
                <div class="text-primary text-center fs-3 fw-bold mb-2">SIGN UP</div>
                <div class="mb-3 pt-3">
                  <label for="user" class="form-label">USERNAME</label>
                  <input type="text" class="form-control" id="user" />
                </div>
                <div class="mb-3 pt-3">
                   <select className='form-select'>
                    <option>Student</option>
                    <option>Working Profession</option>
                   </select>
                </div>
                <div class="mb-3 pt-3">
                  <label for="pass" class="form-label">PASSWORD</label>
                  <input type="password" class="form-control" id="pass" />
                </div>
                <div class="mb-3 pt-3">
                  <label for="pass" class="form-label">CONFIRM PASSWORD</label>
                  <input type="password" class="form-control" id="pass" />
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Signup</button>
                </div>
              </form>
              <div>Already have an account?<span className='text-primary mx-2' onClick={()=>setlogin(!login)} style={{cursor:'pointer'}}>Login</span></div>
        </div>
    </div>
            }
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default Auth