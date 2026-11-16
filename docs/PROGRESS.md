# Progreso del laboratorio 12

## Estado

- [x] Paso 00 — Guía de trabajo y registro inicial (`0424d1e`).
- [x] Base API — Django REST, modelo Movie, CRUD, fixture y pruebas.
- [x] Base cliente — React/Vite y estilos Aurora reutilizados de S11.
- [x] Pasos 01–04 — CORS limitado, rutas REST, Axios/env y errores normalizados.
- [x] Pasos 05–07 — Listado, estados de pantalla, confirmación y eliminación.
- [x] Pasos 08–11 — Alta, error 400 por campo, error de red y reintento.
- [x] Pasos 12–13 — README, estados documentados y revisión final.

El código de API y cliente quedó agrupado en `95d12d0`. El cierre documental se registra en el commit de documentación que acompaña este archivo.

## Decisiones

- No hay fuente API del lab 8 dentro de S12; se reconstruirá un CRUD mínimo de `Movie` con DRF y SQLite. Para el cliente se conservará el sistema de diseño de Aurora del lab 11, sin reconstruir las funciones de favoritos/búsqueda/estrenos.
- El brief asume y especifica una API REST de películas; se sigue ese modelo.
- El host trae Python 3.11.9, no 3.12. Se usará Django 5.2 LTS compatible para poder probar localmente; el código seguirá apuntando a Python 3.12+.
- Se agruparán actividades relacionadas en commits locales; se hará un único push a `main` al terminar.
- No se crea el entregable ni capturas para el campus.

## Hallazgos

- Python disponible: 3.11.9. `py -0p` no encontró otro intérprete.
- Origen permitido de CORS: `http://localhost:5173`; API: `http://localhost:8000/api/movies/`.
- Verificación final: Django `check`, `makemigrations --check` y 4 pruebas pasaron; cliente `lint`, `build` y 7 pruebas pasaron.
- El entorno permitió comprobar Django con su cliente de pruebas. La petición manual a `localhost` desde esta sesión expiró; no se afirma una comprobación de extremo a extremo en navegador.
- La carpeta S12 comenzó sin remoto Git configurado; falta definir/verificar el destino antes de publicar.
