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

## Démarrage du projet

### 1) Localement (développement)

**Prérequis:** Node.js 20+ installé

```bash
# Cloner le repo
git clone https://github.com/jessicajnx/projet_deploiement_3.git
cd projet_deploiement_3

# Installer les dépendances
npm ci

# Lancer l'app
npm start
```

L'app est accessible localement sur `http://localhost:3000`.

Vérification:

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/api/greet?name=Jess"
```

### 2) Tests localement

```bash
# Tests unitaires uniquement
npm run test:unit

# Tests E2E uniquement
npm run test:e2e

# Tous les tests
npm test
```

### 3) Docker localement

Build l'image:

```bash
docker build -t projet_deploiement_3:local .
```

Lancer l'app en conteneur:

```bash
docker run --rm -p 3000:3000 projet_deploiement_3:local
```

Puis accéder à `http://localhost:3000/health`.

### 4) Déploiement automatique sur Azure VM

**Tu ne fais RIEN manuellement à partir d'ici.**

Flux automatique:

1. Tu pushes sur `main`:
   ```bash
   git add .
   git commit -m "Mon changement"
   git push origin main
   ```

2. GitHub Actions se déclenche automatiquement:
   - Job 1: Tests unitaires
   - Job 2: Tests E2E
   - Job 3: Build image Docker + push Docker Hub
   - Job 4: Deploy sur VM Azure via SSH + vérification

3. L'app est accessible via l'IP publique Azure:
   ```
   http://4.180.228.24/health
   http://4.180.228.24/api/greet?name=Jess
   ```

### 5) État actuel (déploiement en direct)

L'application est **actuellement déployée et fonctionnelle** sur Azure VM:

- **URL publique:** http://4.180.228.24
- **Health endpoint:** http://4.180.228.24/health
- **API endpoint:** http://4.180.228.24/api/greet?name=Jess
- **Port:** 80 (public) -> 3000 (conteneur)
- **Conteneur:** myapp (redémarrage automatique si crash)

Chaque push vers `main` redéploie automatiquement l'app sur cette VM.



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