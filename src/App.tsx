import { Link, Route, Routes } from 'react-router'
import DogList from './pages/DogList'
import DogAdd from './pages/DogAdd'
import DogUpdate from './pages/DogUpdate'
import './App.css'

function App() {
  return (
    <div className="shop">
      <header className="shop-header">
        <h1>
          <Link to="/">🐶 Dog Shop</Link>
        </h1>
        <p>건강하고 사랑스러운 반려견을 만나보세요</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<DogList />} />
          <Route path="/dog/add" element={<DogAdd />} />
          <Route path="/dog/update/:id" element={<DogUpdate />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
