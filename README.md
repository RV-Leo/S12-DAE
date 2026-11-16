# Laboratorio 12 — Servicios web

Consola Aurora Cinemas con un cliente React/Vite y una API Django REST. El cliente consume `GET`, `POST` y `DELETE` con Axios; Django usa SQLite y permite CORS solo desde `http://localhost:5173`.

## Requisitos

- Python 3.12 o superior para el curso; Node.js 20 o superior.
- Este entorno de trabajo solo tenía Python 3.11.9, así que se probó con Django 5.2.19, compatible con él. En el equipo del curso usa Python 3.12+.

## Levantar la API

En PowerShell, desde `api/`:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
Copy-Item .env.example .env
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata movies
python manage.py runserver localhost:8000
```

API de películas: `http://localhost:8000/api/movies/`. Rutas y cuerpos están en [api/README.md](api/README.md).

## Levantar el cliente

En otra terminal, desde `client/`:

```powershell
npm install
Copy-Item .env.example .env
npm run dev -- --host localhost --port 5173 --strictPort
```

Vite entrega la aplicación en `http://localhost:5173`. Ese origen debe coincidir con `CORS_ALLOWED_ORIGINS` en `api/.env`; no uses `127.0.0.1` en lugar de `localhost` para el cliente.

## Verificación

- API: `api\.venv\Scripts\python.exe manage.py test`
- Cliente: `npm run lint`, `npm run build`, `npm test`

Versiones probadas: Django 5.2.19, Django REST Framework 3.18.3, django-cors-headers 4.9.0, python-decouple 3.8; React 19.3.1, Vite 8.3.8, Axios 1.21.1, React Router 7.18.5, Vitest 5.1.0; Node 24.19.0 y npm 11.17.0.

Los archivos `.env` y la base SQLite local no se publican. No se generó el entregable ni capturas del campus.
