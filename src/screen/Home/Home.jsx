import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [documents, setDocument] = useState();
  const navigate = useNavigate();
  // let documents
  useEffect(() => {
    //  documents=JSON.parse(localStorage.getItem("document"))
    setDocument(JSON.parse(localStorage.getItem("document")));
  }, [documents]);
  const user = localStorage.getItem("user");
  if(!user){
    navigate('/auth')
  }
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("document");
    navigate("/auth");
  };

  return (
    <div className="container my-5">
      <div className="mx-5 d-flex justify-content-end">
        <div className="col-8 px-3 ">
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
        <div className="col-2">
          {user ? (
            <div onClick={handleLogOut}>LOGOUT</div>
          ) : (
            <Link to="/auth/" className="link">
              LOGIN/REGISTER
            </Link>
          )}
        </div>
      </div>
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
    </div>
  );
}

export default Home;
