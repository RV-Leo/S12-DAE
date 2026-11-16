# Cliente de cartelera

Cliente React con Vite y Axios. Instala con `npm install`; ejecuta con `npm run dev -- --host localhost --port 5173 --strictPort`. La URL de la API se configura en `.env` usando la plantilla `.env.example`.

## Estados de pantalla

| Petición al entrar | Qué aparece |
|---|---|
| Cargando | Tabla esqueleto con texto accesible «Cargando cartelera». |
| Responde con películas | Tabla con título, género, clasificación, valoración, duración y acciones. |
| Responde sin filas | Mensaje indicando que aún no hay películas registradas. |
| Error de API, CORS o servidor apagado | Mensaje de error con botón «Reintentar»; no queda la página en blanco. |

Alta y eliminación usan los endpoints de Django. La eliminación requiere confirmar en un diálogo; la validación de alta muestra los mensajes que devuelve la API junto al campo.

Los estilos globales se importan como tokens, base, layout, forms y utilities; los componentes tienen CSS junto al JSX. Comandos: `npm run lint`, `npm run build`, `npm test`.
