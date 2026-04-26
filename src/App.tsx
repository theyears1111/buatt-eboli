import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Events from './pages/Events'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './admin/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — fuori dal layout del sito */}
        <Route path="/admin" element={<Admin />} />

        {/* Sito pubblico */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="events" element={<Events />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}