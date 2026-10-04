import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Leaflet from './Leaflet/Leaflet.jsx'
import Crud from './Crud/Crud.jsx';
import Pagination from './pagination/Pagination.jsx';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll.jsx';
import { ValueSupplier } from './ProgressBar/ProgressBar.jsx';
 import TabInput from './TabInput/TabInput.jsx';
 
function App() {
  return (
    <>
      <BrowserRouter>
        <ul>
          <Link to="/crud">Crud</Link>
          <Link to="/leaflet">Leaflet</Link>
          <Link to="/pagination">Pagination</Link>
          <Link to="/inifiniteScroll"> Inifinite Scroll</Link>
          <Link to="/valueSupplier"> Progress Bar</Link>
          <Link to="/tabForm">Tab Form</Link>
        </ul>
        <Routes>
          <Route path='/leaflet' element={<Leaflet />} />
          <Route path='/crud' element={<Crud />} />
          <Route path='/pagination' element={<Pagination />} />
          <Route path='/inifiniteScroll' element={<InfiniteScroll />} />
          <Route path='/valueSupplier' element={<ValueSupplier />} />
          <Route path='/tabForm' element={<TabInput />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
