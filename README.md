# projet_deploiement_3

Pipeline CI/CD GitHub Actions deja configuree avec l'ordre suivant:

1. Unit tests
2. E2E tests
3. Build Docker image
4. Push image Docker Hub
5. Deploy sur Azure VM en SSH
6. Verification par requete HTTP healthcheck

## Fichier workflow

Le workflow est dans `.github/workflows/ci-cd.yml` et se lance sur chaque push vers `main`.

## Secrets GitHub a ajouter

Dans GitHub: `Settings > Secrets and variables > Actions > New repository secret`

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `DOCKER_IMAGE_NAME` (ex: `projet_deploiement_3`)
- `AZURE_VM_HOST` (IP ou DNS de la VM)
- `AZURE_VM_USER` (ex: `azureuser`)
- `AZURE_VM_SSH_KEY` (cle privee SSH complete)
- `CONTAINER_NAME` (ex: `projet_deploiement_3_app`)
- `HOST_PORT` (ex: `80`)
- `CONTAINER_PORT` (ex: `3000`)
- `HEALTHCHECK_URL` (ex: `http://<ip-vm>/health`)

## Notes importantes

- Le job Docker echoue volontairement si `Dockerfile` est absent a la racine.
- Les jobs E2E et Unit attendent un projet Node (`package.json`) ou Python (`requirements.txt` ou `pyproject.toml`).
- Pense a adapter les commandes de tests (`npm run test:unit`, `npm run test:e2e`, `pytest`) selon ton projet reel.
