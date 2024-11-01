import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import GenerateTree from './tree/GenerateTree';
import SelectionSort from './array/selectionSort';
import AbduTree from './tree/AbduTree';


function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tree" element={<GenerateTree />} />
          <Route path="/ssort" element={<SelectionSort/>}></Route>
          <Route path="/atree" element={<AbduTree/>}></Route>
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
      
    </>
  )
}

export default App
