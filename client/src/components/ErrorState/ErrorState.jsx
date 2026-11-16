import { Button } from '../Button/Button.jsx'
import './ErrorState.css'

export function ErrorState({ message, onRetry }) {
  return <section className="error-state" role="alert"><h2>No se pudo cargar la cartelera</h2><p>{message}</p><Button variant="secondary" onClick={onRetry}>Reintentar</Button></section>
}
