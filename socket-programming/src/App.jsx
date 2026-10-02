import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Leaflet from './Leaflet/Leaflet'
function App() {

  return (
    <>

      <BrowserRouter>
        <ul>
          <Link to="/leaflet">Leaflet</Link>
        </ul>
        <Routes>
          <Route path='/leaflet' element={<Leaflet />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
