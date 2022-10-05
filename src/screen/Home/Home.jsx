import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
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
        <Link to="/auth/" className="link">
          LOGIN/REGISTER
        </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 p-5">
          <Link to="/docs/1" className="link">
            <div class="card shadow home-card">
              <div class="card-body">
                <h3 className="heading">Software Engineering</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, soluta in quidem error provident eius qui ducimus
                  molestias.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 p-5">
          <Link to="/docs/1" className="link">
            <div class="card shadow home-card">
              <div class="card-body">
                <h3 className="heading">Computer Networks</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, soluta in quidem error provident eius qui ducimus
                  molestias.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 p-5">
          <Link to="/docs/1" className="link">
            <div class="card shadow home-card">
              <div class="card-body p-4">
                <h3 className="heading">Energy Conservation</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, soluta in quidem error provident eius qui ducimus.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 p-5">
          <Link to="/docs/1" className="link">
            <div class="card shadow home-card">
              <div class="card-body">
                <h3 className="heading">Operating System</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, soluta in quidem error provident eius qui ducimus
                  molestias.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 p-5">
          <Link to="/docs/1" className="link">
            <div class="card shadow home-card">
              <div class="card-body">
                <h3 className="heading">User Design And Interface</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, soluta in quidem error provident eius qui.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
