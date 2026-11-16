import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { MoviesListPage } from './pages/MoviesListPage/MoviesListPage.jsx'
import { MovieFormPage } from './pages/MovieFormPage/MovieFormPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-main container">
        <Routes>
          <Route path="/" element={<MoviesListPage />} />
          <Route path="/nueva" element={<MovieFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </BrowserRouter>
  )
}
