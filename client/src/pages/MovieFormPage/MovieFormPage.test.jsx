import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const api = vi.hoisted(() => ({
  createMovie: vi.fn(),
  getErrorMessage: vi.fn(() => 'La API rechazó los datos.'),
  getFieldErrors: vi.fn((error) => error.response?.data ?? {}),
}))
vi.mock('../../api/moviesApi.js', () => api)

import { MovieFormPage } from './MovieFormPage.jsx'

function renderForm() {
  return render(<MemoryRouter initialEntries={['/nueva']}><Routes><Route path="/nueva" element={<MovieFormPage />} /><Route path="/" element={<p>Listado</p>} /></Routes></MemoryRouter>)
}

describe('MovieFormPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('posts controlled fields then navigates to the list', async () => {
    api.createMovie.mockResolvedValue({ id: 4 })
    renderForm()
    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Nueva historia' } })
    fireEvent.change(screen.getByLabelText('Género'), { target: { value: 'Drama' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar película' }))
    await waitFor(() => expect(api.createMovie).toHaveBeenCalledWith(expect.objectContaining({ title: 'Nueva historia', genre: 'Drama', rating: 0, duration_minutes: 90 })))
    expect(await screen.findByText('Listado')).toBeInTheDocument()
  })

  it('shows the API validation text on the field and in a summary', async () => {
    api.createMovie.mockRejectedValue({ response: { status: 400, data: { title: ['Este campo es requerido.'] } } })
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'Guardar película' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('La API rechazó los datos.')
    expect(screen.getByText('Este campo es requerido.')).toHaveAttribute('id', 'title-error')
    expect(screen.getByLabelText('Título')).toHaveAttribute('aria-invalid', 'true')
  })
})
