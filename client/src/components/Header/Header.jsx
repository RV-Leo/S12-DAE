import { Clapperboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header className="admin-header">
      <div className="admin-header__inner container">
        <NavLink className="admin-header__brand" to="/" aria-label="Aurora Cinemas, inicio"><Clapperboard aria-hidden="true" /><span>Aurora <em>Cinemas</em></span></NavLink>
        <nav className="admin-header__nav" aria-label="Navegación principal"><NavLink to="/">Cartelera</NavLink><NavLink to="/nueva">Agregar película</NavLink></nav>
      </div>
    </header>
  )
}
