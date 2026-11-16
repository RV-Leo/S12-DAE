import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../../components/Button/Button.jsx'
import { createMovie, getErrorMessage, getFieldErrors } from '../../api/moviesApi.js'
import './MovieFormPage.css'

const initialForm = { title: '', synopsis: '', genre: '', age_rating: 'A', rating: '0', duration_minutes: '90' }

function firstError(value) {
  if (Array.isArray(value)) return value[0]
  return value || ''
}

export function MovieFormPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      await createMovie({ ...form, rating: Number(form.rating), duration_minutes: Number(form.duration_minutes) })
      toast.success('Película agregada a la cartelera')
      navigate('/')
    } catch (error) {
      setSubmitError(getErrorMessage(error))
      setFieldErrors(getFieldErrors(error))
      toast.error(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const titleError = firstError(fieldErrors.title)

  return (
    <section className="movie-form-page" aria-labelledby="form-title">
      <p className="eyebrow">Consola de gestión</p>
      <h1 id="form-title">Agregar película</h1>
      <form className="movie-form" noValidate onSubmit={handleSubmit}>
        {submitError && <p className="movie-form__summary" role="alert">{submitError}</p>}
        <div className="movie-form__field movie-form__field--wide">
          <label htmlFor="title">Título</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} aria-invalid={Boolean(titleError)} aria-describedby={titleError ? 'title-error' : undefined} />
          {titleError && <span className="movie-form__error" id="title-error">{titleError}</span>}
        </div>
        <div className="movie-form__field movie-form__field--wide"><label htmlFor="synopsis">Sinopsis</label><textarea id="synopsis" name="synopsis" rows="3" value={form.synopsis} onChange={handleChange} /></div>
        <div className="movie-form__field"><label htmlFor="genre">Género</label><input id="genre" name="genre" value={form.genre} onChange={handleChange} aria-invalid={Boolean(firstError(fieldErrors.genre))} /></div>
        <div className="movie-form__field"><label htmlFor="age_rating">Clasificación</label><select id="age_rating" name="age_rating" value={form.age_rating} onChange={handleChange}><option value="A">A · Todo público</option><option value="7+">7+</option><option value="12+">12+</option><option value="16+">16+</option><option value="18+">18+</option></select></div>
        <div className="movie-form__field"><label htmlFor="rating">Valoración (0–10)</label><input id="rating" name="rating" type="number" min="0" max="10" step="0.1" value={form.rating} onChange={handleChange} /></div>
        <div className="movie-form__field"><label htmlFor="duration_minutes">Duración (min)</label><input id="duration_minutes" name="duration_minutes" type="number" min="1" value={form.duration_minutes} onChange={handleChange} /></div>
        <div className="movie-form__actions"><Link className="movie-form__cancel" to="/">Cancelar</Link><Button type="submit" disabled={submitting}>{submitting ? 'Guardando…' : 'Guardar película'}</Button></div>
      </form>
    </section>
  )
}
