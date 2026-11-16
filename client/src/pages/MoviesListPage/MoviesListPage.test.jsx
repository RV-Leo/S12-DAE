import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const api = vi.hoisted(() => ({ listMovies: vi.fn(), deleteMovie: vi.fn(), getErrorMessage: vi.fn(() => 'No se pudo contactar con el servidor.') }))
vi.mock('../../api/moviesApi.js', () => api)

import { MoviesListPage } from './MoviesListPage.jsx'

const sampleMovie = { id: 1, title: 'La hora azul', genre: 'Drama', age_rating: 'A', rating: 8.2, duration_minutes: 100 }

describe('MoviesListPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows table data and refreshes after deletion', async () => {
    api.listMovies.mockResolvedValueOnce([sampleMovie]).mockResolvedValueOnce([])
    api.deleteMovie.mockResolvedValue({ status: 204 })
    render(<MemoryRouter><MoviesListPage /></MemoryRouter>)
    expect(screen.getByRole('status', { name: 'Cargando cartelera' })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /La hora azul/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Eliminar' }))
    await waitFor(() => expect(api.deleteMovie).toHaveBeenCalledWith(1))
    await waitFor(() => expect(screen.getByText('Aún no hay películas registradas.')).toBeInTheDocument())
    expect(api.listMovies).toHaveBeenCalledTimes(2)
  })

  it('shows an offline state and retries the request', async () => {
    api.listMovies.mockRejectedValueOnce({ request: {} }).mockResolvedValueOnce([sampleMovie])
    render(<MemoryRouter><MoviesListPage /></MemoryRouter>)
    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo contactar')
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(await screen.findByText('La hora azul')).toBeInTheDocument()
  })
})
