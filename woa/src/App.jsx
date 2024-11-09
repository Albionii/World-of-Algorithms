import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import SelectionSort from './array/selectionSort';
import AbduTree from './tree/AbduTree';

import CanvasComponent from './CanvasComponent';
import GenerateGraph from './graph/GenerateGraph';
import BinarySearchTree from './tree/BinarySearchTree';

function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph" element={<GenerateGraph/>} />
          <Route path="/ssort" element={<SelectionSort/>}></Route>
          <Route path="/atree" element={<AbduTree/>}></Route>
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/bst" element={<BinarySearchTree />} />
          {/* <Route path="/dijkstra" element={<GenerateTree />} /> */}
        </Routes>
      </Router>
      
    </>
  )
}

export default App
