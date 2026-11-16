# API de cartelera

Requisitos: Python 3.12 o superior. Crear/activar el entorno virtual, copiar `.env.example` a `.env`, instalar `requirements.txt`, ejecutar `python manage.py migrate` y `python manage.py loaddata movies`. Iniciar con `python manage.py runserver` en `http://localhost:8000`.

## Rutas

| Método | URL | Cuerpo | Respuesta | Códigos |
|---|---|---|---|---|
| GET | `/api/movies/` | — | Arreglo de películas | 200 |
| POST | `/api/movies/` | `title`, `synopsis`, `genre`, `age_rating`, `rating`, `duration_minutes` | Película creada | 201, 400 |
| GET | `/api/movies/{id}/` | — | Película | 200, 404 |
| DELETE | `/api/movies/{id}/` | — | Sin contenido | 204, 404 |

Los errores de validación devuelven 400 con una propiedad por campo, por ejemplo `{"title":["Este campo es requerido."]}`. CORS autoriza únicamente `http://localhost:5173` mediante `.env`.
