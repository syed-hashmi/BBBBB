import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Leaflet from './Leaflet/Leaflet.jsx'
import Crud from './Crud/Crud.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <ul>
          <Link to="/crud">Crud</Link>
          <Link to="/leaflet">Leaflet</Link>

        </ul>
        <Routes>
          <Route path='/leaflet' element={<Leaflet />} />
          <Route path='/crud' element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
