import {Routes,Route} from 'react-router-dom'
import Books from './pages/Books'
import Add from './pages/Add'
import Update from './pages/Update'
import './index.css'
function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Books/>}/>
        <Route path='/add-books' element={<Add/>}/>
        <Route path='/update/:id' element={<Update/>}/>
     </Routes>
    </>
  )
}

export default App
