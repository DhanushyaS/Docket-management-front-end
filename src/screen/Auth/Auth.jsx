import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [login,setlogin]=useState(true)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [mobile,setMobile]=useState('')
  const [type,setType]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')

  const handleLogin = async(e)=>{
    e.preventDefault()
    await axios({
      method: 'post',
      url: 'https://docket-management.herokuapp.com/user/login',
      data: {email,password}
    }).then(
      (res)=>{
        localStorage.setItem("user", JSON.stringify(res.data.result));
        navigate("/")
    }
    ).catch((err)=>{console.log(err)
    alert("Invalid Credential")})
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.get(`https://docket-management.herokuapp.com/doc/${user._id}`)  
    .then(res => {   
      console.log(res)
      localStorage.setItem("document",JSON.stringify(res.data.document))  
      navigate("/")
    }) 

  }
  const handleRegister = async(e)=>{
    e.preventDefault()
    if(password===confirmPassword){
      await axios({
        method: 'post',
        url: 'https://docket-management.herokuapp.com/user/signup',
        data: {name,email,mobile,type,password}
      }).then(
        (res)=>{console.log(res)
          localStorage.setItem("user", JSON.stringify(res.data.result));
        navigate("/")
          
      }
      ).catch((err)=>{
        console.log(err)
        alert("Invalid Credential") 
      })

    }else{
        alert('Invalid Creditials: Check Password')
    }
  }

  return (
    <div>
      <h2 className='text-center my-4 text-primary fw-bold'>Docket Management</h2>
            <div class="container my-4">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <img src="https://elearn.daffodilvarsity.edu.bd/pluginfile.php/1044535/mod_assign/intro/f5100f72b303d6e5be8357d02a8dbb5e.gif" className="img-fluid vh-100" alt="..." />
            </div>
            <div class="col-md-6">
              {login?
            <div class="card shadow container ">
            <div class="card-body">
                <form>
                    <div class="text-primary text-center fs-3 fw-bold mb-2">LOGIN</div>
                    <div class="mb-3 pt-3">
                      <label htmlFor="email" class="form-label">EMAIL</label>
                      <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" />
                    </div>
                    <div class="mb-3 pt-3">
                      <label htmlFor="pass" class="form-label">PASSWORD</label>
                      <input type="password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="pass" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                  </form>
                  <div className='mt-5 mb-2 text-center'>Don't have an account?<span className='text-primary mx-2' onClick={()=>setlogin(!login)} style={{cursor:'pointer'}}>Sign up</span></div>
            </div>
        </div>:
        <div class="card shadow container ">
        <div class="card-body">
            <form>
                <div class="text-primary text-center fs-3 fw-bold mb-2">SIGN UP</div>
                <div class="mb-3 pt-3">
                  <label htmlFor="user" class="form-label">USER NAME</label>
                  <input type="text" class="form-control" value={name} onChange={(e)=>setName(e.target.value)} id="user" />
                </div>
                <div class="mb-3 pt-3">
                  <label htmlFor="email" class="form-label">EMAIL</label>
                  <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" />
                </div>
                <div class="mb-3 pt-3">
                  <label htmlFor="mobile" class="form-label">MOBILE</label>
                  <input type="text" class="form-control" value={mobile} onChange={(e)=>setMobile(e.target.value)} id="mobile" />
                </div>
                <div class="mb-3 pt-3">
                <label htmlFor="user" class="form-label">USER TYPE</label>
                   <select className='form-select' onChange={(e)=>setType(e.target.value)}>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Working Professional</option>
                   </select>
                </div>
                <div class="mb-3 pt-3">
                  <label fhtmlForor="pass" class="form-label">PASSWORD</label>
                  <input type="password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="pass" />
                </div>
                <div class="mb-3 pt-3">
                  <label htmlFor="confirmPass" class="form-label">CONFIRM PASSWORD</label>
                  <input type="password" class="form-control" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} id="confirmPass" />
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary" onClick={handleRegister}>Signup</button>
                </div>
              </form>
              <div className='mt-5 mb-2 text-center'>Already have an account?<span className='text-primary mx-2' onClick={()=>setlogin(!login)} style={{cursor:'pointer'}}>Login</span></div>
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