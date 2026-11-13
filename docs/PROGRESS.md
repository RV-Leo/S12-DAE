# Progreso del laboratorio 12

## Pasos

- [ ] Paso 00 — Guía de trabajo
- [ ] Base API — Django, Movie, CRUD, fixture y tests
- [ ] Base cliente — React/Vite y diseño Aurora
- [ ] Paso 01 — CORS
- [ ] Paso 02 — Rutas de API
- [ ] Paso 03 — Axios y variable de entorno
- [ ] Paso 04 — Módulo API y normalización de errores
- [ ] Paso 05 — Listado con useEffect
- [ ] Paso 06 — Estados de carga/datos/error
- [ ] Paso 07 — Confirmar y eliminar
- [ ] Paso 08 — Formulario de alta
- [ ] Paso 09 — Hallazgo CORS
- [ ] Paso 10 — Validación 400 de la API
- [ ] Paso 11 — API desconectada y reintento
- [ ] Paso 12 — Tabla de estados documentada
- [ ] Paso 13 — Cierre y publicación

Los hashes y horas se agregarán conforme se cierren los commits agrupados.

## Decisiones

- No hay fuente API del lab 8 dentro de S12; se reconstruirá un CRUD mínimo de `Movie` con DRF y SQLite. Para el cliente se conservará el sistema de diseño de Aurora del lab 11, sin reconstruir las funciones de favoritos/búsqueda/estrenos.
- El brief asume y especifica una API REST de películas; se sigue ese modelo.
- El host trae Python 3.11.9, no 3.12. Se usará Django 5.2 LTS compatible para poder probar localmente; el código seguirá apuntando a Python 3.12+.
- Se agruparán actividades relacionadas en commits locales; se hará un único push a `main` al terminar.
- No se crea el entregable ni capturas para el campus.

## Hallazgos

- Python disponible: 3.11.9. `py -0p` no encontró otro intérprete.
- Origen permitido de CORS: `http://localhost:5173`; API: `http://localhost:8000/api/movies/`.
