import { beforeEach, describe, expect, it, vi } from 'vitest'

const http = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn(), delete: vi.fn() }))
vi.mock('./client.js', () => ({ apiClient: http }))

import { createMovie, deleteMovie, getErrorMessage, getFieldErrors, listMovies } from './moviesApi.js'

describe('movies API client', () => {
  beforeEach(() => vi.clearAllMocks())

  it('centralizes list, create and delete requests', async () => {
    http.get.mockResolvedValue({ data: [{ id: 1 }] })
    http.post.mockResolvedValue({ data: { id: 2 } })
    http.delete.mockResolvedValue({ status: 204 })
    const controller = new AbortController()
    expect(await listMovies({ signal: controller.signal })).toEqual([{ id: 1 }])
    await createMovie({ title: 'Nueva' })
    await deleteMovie(2)
    expect(http.get).toHaveBeenCalledWith('/movies/', { signal: controller.signal })
    expect(http.post).toHaveBeenCalledWith('/movies/', { title: 'Nueva' })
    expect(http.delete).toHaveBeenCalledWith('/movies/2/')
  })

  it('normalizes offline and validation errors', () => {
    expect(getErrorMessage({ request: {} })).toMatch(/servidor/)
    expect(getErrorMessage({ response: { status: 400, data: { title: ['Este campo es requerido.'] } } })).toMatch(/rechazó/)
    expect(getFieldErrors({ response: { data: { title: ['Este campo es requerido.'] } } })).toEqual({ title: ['Este campo es requerido.'] })
  })
})
