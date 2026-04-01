# projet_deploiement_3

Application API Node.js/Express avec pipeline CI/CD complete:

1. Unit tests
2. E2E tests
3. Build + Push Docker Hub
4. Deploy Azure VM (SSH) + verification HTTP

## Application

- Port local et conteneur: `3000`
- Endpoint de verification: `GET /health`
- Endpoint fonctionnel supplementaire: `GET /api/greet?name=Jess`

Reponses attendues:

- `GET /health` -> `200` + JSON `{ status: "ok", ... }`
- `GET /api/greet?name=Jess` -> `200` + JSON `{ message: "Bonjour Jess" }`

## Lancement local

```bash
npm ci
npm start
```

Verification:

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/api/greet?name=Jess"
```

## Tests

Commandes CI (une commande par type):

- Unit tests: `npm run test:unit`
- E2E tests: `npm run test:e2e`

Les tests E2E verifient:

- disponibilite de l'application (`/health`)
- fonctionnalite supplementaire (`/api/greet`)

## Docker

Build et run local:

```bash
docker build -t projet_deploiement_3:local .
docker run --rm -p 3000:3000 projet_deploiement_3:local
```

Le `Dockerfile`:

- utilise `node:20-alpine`
- expose le port `3000`
- lance l'app avec `npm start`

## Pipeline GitHub Actions

Workflow: `.github/workflows/ci-cd.yml`

Declenchement:

- push sur `main`
- execution manuelle (`workflow_dispatch`)

Ordre des jobs:

1. `unit-tests`
2. `e2e-tests`
3. `docker-build-push` (uniquement si 1 et 2 OK)
4. `deploy-azure-vm` (deploiement idempotent + verification)

## Deploiement idempotent

Le deploiement SSH utilise un nom de conteneur fixe: `myapp`.

Strategie:

- pull de l'image cible
- suppression de l'ancien conteneur `myapp` s'il existe
- redemarrage d'un seul conteneur `myapp`
- verification locale VM sur `/health`
- verification publique depuis GitHub Actions via `HEALTHCHECK_URL`

Relancer le workflow ne cree pas de doublons et redeploie proprement.


## Tags Docker utilises

- `${GITHUB_SHA}`
- `${GITHUB_REF_NAME}` (ex: `main`)
- `latest`