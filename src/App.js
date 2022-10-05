import {BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Home from './screen/Home/Home';
import Document from './screen/Document/Document';
import AllRoutes from './AllRoutes';

function App() {
  return (
    <div>
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
