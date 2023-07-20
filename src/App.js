import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register';
import Dashboard from './DashBoard/DashBoard';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< Register/>} />
              <Route path="dashboard" element={< Dashboard/>} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </div>
  );
}

export default App;
