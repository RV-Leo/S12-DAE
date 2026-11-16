import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../../components/Button/Button.jsx'
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog.jsx'
import { ErrorState } from '../../components/ErrorState/ErrorState.jsx'
import { Skeleton } from '../../components/Skeleton/Skeleton.jsx'
import { deleteMovie, getErrorMessage, listMovies } from '../../api/moviesApi.js'
import './MoviesListPage.css'

export function MoviesListPage() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    listMovies({ signal: controller.signal }).then((data) => {
      setMovies(data)
      setStatus('success')
      setError('')
    }).catch((requestError) => {
      if (!controller.signal.aborted) {
        setError(getErrorMessage(requestError))
        setStatus('error')
      }
    })
    return () => controller.abort()
  }, [reloadKey])

  function retry() {
    setStatus('loading')
    setReloadKey((current) => current + 1)
  }

  async function confirmDelete() {
    if (!selectedMovie) return
    setDeleting(true)
    try {
      await deleteMovie(selectedMovie.id)
      toast.success(`«${selectedMovie.title}» se eliminó de la cartelera`)
      setSelectedMovie(null)
      retry()
    } catch (requestError) {
      toast.error(getErrorMessage(requestError))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className="movies-page" aria-labelledby="movies-title">
      <div className="movies-page__heading"><div><p className="eyebrow">Consola de gestión</p><h1 id="movies-title">Cartelera</h1></div><Button onClick={() => navigate('/nueva')}>Agregar película</Button></div>
      {status === 'loading' && <div className="table-scroll" role="status" aria-label="Cargando cartelera"><table className="movies-table"><thead><tr><th>Título</th><th>Género</th><th>Clasificación</th><th>Valoración</th><th>Duración</th><th>Acciones</th></tr></thead><tbody>{[1, 2, 3, 4].map((row) => <tr key={row}><td colSpan="6"><Skeleton /></td></tr>)}</tbody></table></div>}
      {status === 'error' && <ErrorState message={error} onRetry={retry} />}
      {status === 'success' && (movies.length > 0 ? <div className="table-scroll"><table className="movies-table"><caption className="visually-hidden">Películas registradas</caption><thead><tr><th>Título</th><th>Género</th><th>Clasificación</th><th>Valoración</th><th>Duración</th><th>Acciones</th></tr></thead><tbody>{movies.map((movie) => <tr key={movie.id}><th scope="row">{movie.title}</th><td>{movie.genre}</td><td>{movie.age_rating}</td><td>{Number(movie.rating).toFixed(1)}</td><td>{movie.duration_minutes} min</td><td><Button variant="ghost" disabled={deleting} onClick={() => setSelectedMovie(movie)}>Eliminar</Button></td></tr>)}</tbody></table></div> : <p className="movies-page__empty" role="status">Aún no hay películas registradas.</p>)}
      <ConfirmDialog open={Boolean(selectedMovie)} title={selectedMovie?.title ?? ''} busy={deleting} onClose={() => setSelectedMovie(null)} onConfirm={confirmDelete} />
    </section>
  )
}
