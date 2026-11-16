import { apiClient } from './client.js'

export async function listMovies({ signal } = {}) {
  const response = await apiClient.get('/movies/', { signal })
  return response.data
}

export async function createMovie(payload) {
  const response = await apiClient.post('/movies/', payload)
  return response.data
}

export async function deleteMovie(id) {
  return apiClient.delete(`/movies/${id}/`)
}

export function getErrorMessage(error) {
  if (!error?.response) return 'No se pudo contactar con el servidor. Revisa que la API esté encendida e inténtalo de nuevo.'
  if (error.response.status === 400) return 'La API rechazó los datos. Revisa los campos señalados.'
  return error.response.data?.detail || 'Ocurrió un error al comunicarse con la API.'
}

export function getFieldErrors(error) {
  const data = error?.response?.data
  return data && typeof data === 'object' ? data : {}
}
