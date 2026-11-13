# S12-DAE — Laboratorio 12: Servicios Web

Integrar una consola React con una API Django REST usando Axios y CORS.
Se evalúan listar, crear, eliminar y resolver carga, datos y error.
Rama de trabajo: `main`.

## Flujo de trabajo

```mermaid
flowchart TD
    H(["👤 Alumno inicia la sesión"]) --> O
    subgraph TEAM["Trabajo por roles, en secuencia"]
        O["Orchestrator<br/>lee guía y progreso"] --> B["Builder<br/>construye"]
        B --> D["Designer<br/>diseño y accesibilidad"]
        D --> V["Verifier<br/>lint, build y tests"]
        V -- falla --> B
        V -- pasa --> S["Scribe<br/>README y progreso"]
        S --> G["Git Steward<br/>commits agrupados"]
    end
    G --> R[("GitHub · S12-DAE")]
```

```text
PLAN → BUILD → DESIGN → VERIFY → NOTES → COMMIT LOCAL → PUSH ÚNICO
  ↑                       │                         │
  └────────── si falla ───┘             estado breve al alumno
```

## Arquitectura objetivo

```mermaid
flowchart LR
    subgraph CLIENT["client · React + Vite · localhost:5173"]
        App["App · Router"] --> List["MoviesListPage · loading/data/error"]
        App --> Form["MovieFormPage · formulario"]
        List --> API
        Form --> API
        API["moviesApi · GET/POST/DELETE"] --> Axios["axios client · baseURL único"]
    end
    subgraph SERVER["api · Django REST · localhost:8000"]
        CORS["CORS · localhost:5173"] --> View["MovieViewSet · /api/movies/"]
        View --> DB[("SQLite")]
    end
    Axios -->|"JSON"| CORS
```

## Árbol real esperado

```text
S12-DAE/
├── AGENTS.md · README.md · docs/PROGRESS.md
├── api/ (Django)
│   ├── manage.py · requirements.txt · .env.example
│   ├── config/ (settings, urls)
│   └── movies/ (Movie, serializer, viewset, tests, fixture)
└── client/ (React + Vite)
    ├── .env.example
    └── src/
        ├── api/ (client.js · moviesApi.js)
        ├── pages/ (MoviesListPage · MovieFormPage)
        ├── components/ (Header · Button · Skeleton · ErrorState · ConfirmDialog)
        └── styles/
```

## Comandos y reglas

API en `api/`: activar `.venv`, `python manage.py migrate`, `python manage.py loaddata movies`, `python manage.py test`, `python manage.py runserver`.
Cliente en `client/`: `npm install`, `npm run dev`, `npm run lint`, `npm run build`, `npm test`.
Python PEP 8; settings y secretos se leen de `.env`, nunca se sube `.env`; CORS autoriza solo `http://localhost:5173`. CSS oscuro de Aurora; React usa componentes por carpeta. Los cambios se agrupan en commits locales y se suben en un push al cierre.

## Terminado

La API ofrece CRUD con CORS estricto, y el cliente usa Axios para listar, crear y eliminar con estados de carga/datos/error. README, tests y progreso están actualizados.
