import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [documents, setDocument] = useState();
  const [select, setSelect] = useState('my');
  const navigate = useNavigate();
  // let documents
  useEffect(() => {
    //  documents=JSON.parse(localStorage.getItem("document"))
    setDocument(JSON.parse(localStorage.getItem("document")));
  }, [documents]);
  const user = JSON.parse(localStorage.getItem("user"));
  const received = JSON.parse(localStorage.getItem("received"));
  console.log(received);

  if(!user){
    navigate('/auth')
  }
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("document");
    localStorage.removeItem("received");
    navigate("/auth");
  };

  const handleCheck = async()=>{
    await axios.get(`https://docket-management.herokuapp.com/doc/share/${user._id}`)  
    .then(res => {   
      localStorage.setItem("received",JSON.stringify(res.data.received))  
      
      navigate("/")
    }) 
  }

  return (
    <div className="container my-5">
      <div className="row mx-5 d-flex justify-content-end">
        <div className="col-6 px-3 ">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search Docs"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-2">
          <Link to="/adddocs/" className="link">
            <button className="btn btn-success">Add Docs</button>
          </Link>
        </div>
        <div className="col-2 ms-0 ">
          <select className="form-select" value={select} onChange={(e)=>setSelect(e.target.value)} >
            <option value="my">My Document</option>
            <option value="received">Received Document</option>
          </select>
        </div>
        <div className="col-2 mt-2">
          {user ? (
            <div onClick={handleLogOut}>LOGOUT</div>
          ) : (
            <Link to="/auth/" className="link">
              LOGIN/REGISTER
            </Link>
          )}
        </div>
      </div>
            {
              select=='my'?
      <div>
      {documents ? (
        <div className="row">
          {documents.map((ele, index) => {
            const link=`/docs/${ele._id}`
            return (
              <div className="col-md-4 p-5 " key={index}>
                <Link to={link} className="link">
                  <div class="card shadow home-card">
                    <div class="card-body">
                      <h3 className="heading">{ele.name}</h3>
                      <p>{ele.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </div>
      )}
      </div>:
      <div>
        <button className="btn btn-secondary m-5 mb-0" onClick={handleCheck}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
        </button>
        {received ? (
        <div className="row">
          {received.map((ele, index) => {
            const link=`/docs/${ele._id}`
            return (
              <div className="col-md-4 p-5 " key={index}>
                <Link to={link} className="link">
                  <div class="card shadow home-card">
                    <div class="card-body">
                      <h3 className="heading">{ele.name}</h3>
                      <p>{ele.description}</p>
                      <p><em>shared by</em><i> {ele.owner}</i></p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </div>
      )}
      </div>
            }
    </div>
  );
}

export default Home;
